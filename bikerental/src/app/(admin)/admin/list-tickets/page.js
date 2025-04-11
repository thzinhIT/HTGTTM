"use client";
import React, { useEffect } from "react";
import TableTicket from "./table-ticket";
import { useState } from "react";
import useFetchGetData from "@/hooks/useFecthGetData";
import { set } from "react-hook-form";
import { ModalCreateTicket } from "./modal-create-ticket";
import { IoAddCircleSharp } from "react-icons/io5";
import { ModalDeleteTicket } from "./modal-delete-ticket";
import { ModalUpdateTicket } from "./modal-update-ticket";
const ListTickets = () => {
  const [bike, setBike] = useState();
  const [tram, setTram] = useState();
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [dataDelete, setDataDelete] = useState();
  const [dataUpdate, setDataUpdate] = useState();
  const { data, loading, error, refetch } = useFetchGetData(
    "http://localhost:3000/api/auth/tickets/getTickets?page=1"
  );
  const handleOnClickCreateTicket = () => {
    setIsOpenModalCreate(true);
  };
  useEffect(() => {
    if (data) {
      setBike(data.veXeDap);
      setTram(data.veXeDien);
    }
    console.log(data);
  }, [data]);
  const handleOnClickDeleteTicket = (item) => {
    setDataDelete(item);
    setIsOpenModalDelete(true);
  };
  const handleOnClickUpdateTicket = (item) => {
    setDataUpdate(item);
    setIsOpenModalUpdate(true);
  };
  return (
    <>
      <div className="text-center text-2xl font-bold">Quản lý vé thuê xe</div>
      <button
        className=" ml-auto mr-2 cursor-pointer bg-blue-600 block flex items-center justify-between gap-2 mb-4 py-3 px-2 rounded-md text-white hover:bg-blue-700 transition duration-200 ease-in-out"
        onClick={() => handleOnClickCreateTicket()}
      >
        <IoAddCircleSharp className="text-green-500 text-xl" />
        <h4>Thêm thẻ mới</h4>
      </button>
      <TableTicket
        bike={bike}
        tram={tram}
        handleOnClickDeleteTicket={handleOnClickDeleteTicket}
        handleOnClickUpdateTicket={handleOnClickUpdateTicket}
      />
      <ModalCreateTicket
        open={isOpenModalCreate}
        setIsOpenModalCreate={setIsOpenModalCreate}
        refetch={refetch}
      />
      {isOpenModalDelete && (
        <ModalDeleteTicket
          open={isOpenModalDelete}
          setIsOpenModalDelete={setIsOpenModalDelete}
          dataDelete={dataDelete}
          refetch={refetch}
        />
      )}
      {isOpenModalUpdate && (
        <ModalUpdateTicket
          open={isOpenModalUpdate}
          setIsOpenModalUpdate={setIsOpenModalUpdate}
          dataUpdate={dataUpdate}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default ListTickets;
