"use client";
import React from "react";
import { useState, useEffect } from "react";
import useFetchGetData from "@/hooks/useFecthGetData";
import TablePrice from "./table-price";
import { IoAddCircleSharp } from "react-icons/io5";
import { ModalCreatePrice } from "./modal-create-price";
import { ModalDeletePrice } from "./modal-delete-price";
import { ModalUpdatePrice } from "./modal-update-price";
const ListPrice = () => {
  const [prices, setPrices] = useState();
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [dataDelete, setDataDelete] = useState(); // State to store the user to be deleted
  const [dataUpdate, setDataUpdate] = useState(); // State to store the user to be updated
  const url = "http://localhost:3000/api/auth/price/getPrice";
  const { data, error, isLoading, refetch } = useFetchGetData(url);
  useEffect(() => {
    if (data) setPrices(data.price);
    console.log(prices);
  }, [data]);
  const handleOnClickCreatePrice = () => {
    setIsOpenModalCreate(true);
    console.log("abc");
  };
  const handleOnClickDeletePrice = (item) => {
    setDataDelete(item);
    setIsOpenModalDelete(true);
  };
  const handleOnClickUpdatePrice = (item) => {
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
        onClick={() => handleOnClickCreatePrice()}
      >
        <IoAddCircleSharp className="text-green-500 text-xl" />
        <h4>Thêm bảng giá</h4>
      </button>
      <TablePrice
        prices={prices}
        handleOnClickDeletePrice={handleOnClickDeletePrice}
        handleOnClickUpdatePrice={handleOnClickUpdatePrice}
      />
      <ModalCreatePrice
        open={isOpenModalCreate}
        setIsOpenModalCreate={setIsOpenModalCreate}
        refetch={refetch}
      />
      <ModalDeletePrice
        open={isOpenModalDelete}
        setIsOpenModalDelete={setIsOpenModalDelete}
        refetch={refetch}
        dataDelete={dataDelete}
      />
      {isOpenModalUpdate && (
        <ModalUpdatePrice
          open={isOpenModalUpdate}
          setIsOpenModalUpdate={setIsOpenModalUpdate}
          dataUpdate={dataUpdate}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default ListPrice;
