"use client";
import React from "react";

import { useState, useEffect } from "react";

import { IoAddCircleSharp } from "react-icons/io5";

import TableUser from "./table-user";
import { Table } from "@/components/ui/table";
import { ModalCreateUser } from "./modal-create-user";
import { ModalDeleteUser } from "./modal-delete-user";
import { ModalUpdateUser } from "./modal-update-user";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const ListUser = () => {
  const [users, setUsers] = useState();
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [id, setId] = useState(); // State to store the user ID to be deleted
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1"); // Lấy page từ URL
  const [dataDelete, setDataDelete] = useState(); // State to store the user to be deleted
  const [dataUpdate, setDataUpdate] = useState(); // State to store the user to be updated
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPage) return;
    router.push(`/admin/list-users?page=${newPage}`); // Cập nhật URL
  };
  const fecthdata = async () => {
    const res = await fetch(
      `http://localhost:3000/api/auth/users/getUser?page=${currentPage}`
    );
    const data = await res.json();
    setUsers(data.users);
    setTotalPage(data.totalPages);
  };
  useEffect(() => {
    fecthdata();
  }, [currentPage]);
  useEffect(() => {
    // Cập nhật URL khi đổi trang mà không reload
    router.push(`?page=${currentPage}`, { scroll: false });
  }, [currentPage]);
  const handleOnCickCreateUser = () => {
    setIsOpenModalCreate(true);
  };

  const handleOnClickDeleteUser = (item) => {
    setDataDelete(item); // Set the user to be deleted
    setIsOpenModalDelete(true);

    console.log("item", dataDelete);
  };
  const handleOnClickUpdateUser = (item) => {
    setDataUpdate(item); // Set the user to be updated
    console.log("dataUpdate", item);
  };
  useEffect(() => {
    if (dataUpdate) {
      setIsOpenModalUpdate(true);
      console.log("đã mở cổng");
      console.log("dataUpdate", dataUpdate);
    }
  }, [dataUpdate]);

  return (
    <>
      <div className="text-center text-2xl">Quản lý người dùng</div>

      <button
        className=" ml-auto mr-2 cursor-pointer bg-blue-600 block flex items-center justify-between gap-2 mb-4 py-3 px-2 rounded-md text-white hover:bg-blue-700 transition duration-200 ease-in-out"
        onClick={() => handleOnCickCreateUser()}
      >
        <IoAddCircleSharp className="text-green-500 text-xl" />
        <h4>Thêm người dùng</h4>
      </button>
      <TableUser
        users={users}
        handleOnClickDeleteUser={handleOnClickDeleteUser}
        handleOnClickUpdateUser={handleOnClickUpdateUser}
      />
      <ModalCreateUser
        open={isOpenModalCreate}
        setIsOpenModalCreate={setIsOpenModalCreate}
        fecthdata={fecthdata}
      />
      <ModalDeleteUser
        open={isOpenModalDelete}
        setIsOpenModalDelete={setIsOpenModalDelete}
        dataDelete={dataDelete}
        fecthdata={fecthdata}
      />
      {isOpenModalUpdate && (
        <ModalUpdateUser
          open={isOpenModalUpdate}
          setIsOpenModalUpdate={setIsOpenModalUpdate}
          dataUpdate={dataUpdate}
          fecthdata={fecthdata}
        />
      )}
      <Pagination className="mt-5 flex justify-center gap-2 ">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              className={
                currentPage === 1
                  ? "disabled cursor-not-allowed"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
          {totalPage !== 0 && (
            <>
              {Array.from({ length: totalPage }, (_, index) => (
                <PaginationItem key={index + 1}>
                  <PaginationLink onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </>
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className={
                currentPage === totalPage
                  ? "disabled cursor-not-allowed"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default ListUser;
