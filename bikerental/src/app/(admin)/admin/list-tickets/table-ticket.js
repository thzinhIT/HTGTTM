"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { IoAddCircleSharp } from "react-icons/io5";
import { ModalDeleteUser } from "../list-users/modal-delete-user";
const TableTicket = (props) => {
  const [activeButton, setActiveButton] = useState("mechanic"); // Mặc định là xe đạp cơ
  const [currentData, setCurrentData] = useState();
  const { bike, tram, handleOnClickDeleteTicket, handleOnClickUpdateTicket } =
    props;
  useEffect(() => {
    if (bike) {
      setCurrentData(bike);
    }
  }, [bike]);
  return (
    <div>
      <div className="flex gap-4 items-center justify-center mt-16">
        <button
          className={`text-blue-700 w-36 h-14 flex justify-center items-center rounded-4xl border-2 border-blue-500
          ${
            activeButton === "mechanic"
              ? "bg-[rgb(37,99,235)] text-white"
              : " bg-gray-200  hover:bg-gray-300"
          }`}
          onClick={() => {
            setActiveButton("mechanic");
            setCurrentData(bike);
          }}
        >
          Xe đạp cơ
        </button>

        <button
          className={`text-blue-700 w-36 h-14 flex justify-center items-center rounded-4xl border-2 border-blue-500
          ${
            activeButton === "electric"
              ? "bg-[rgb(37,99,235)] text-white"
              : " bg-gray-200  hover:bg-gray-300"
          }`}
          onClick={() => {
            setActiveButton("electric");
            setCurrentData(tram);
          }}
        >
          Xe đạp điện
        </button>
      </div>
      <Table>
        <TableCaption>Bảng quản lý người dùng.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">STT</TableHead>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Tên vé</TableHead>
            <TableHead>Điểm thưởng</TableHead>
            <TableHead>Thời lượng </TableHead>
            <TableHead>Thời Hạn </TableHead>
            <TableHead>Phí phát sinh </TableHead>
            <TableHead>Lưu ý </TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData?.map((item, index) => (
            <TableRow key={item?.ve_id || index} className=" ">
              <TableCell className="font-medium ">{index + 1}</TableCell>
              <TableCell className="font-medium ">{item?.ve_id}</TableCell>
              <TableCell>{item?.ten_ve}</TableCell>
              <TableCell>{item?.diem_tngo}</TableCell>
              <TableCell>{item?.thoi_luong}</TableCell>
              <TableCell>{item?.thoi_han}</TableCell>
              <TableCell>{item?.phi_phat_sinh}</TableCell>
              <TableCell>{item?.ghi_chu}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end items-center gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-700  text-xl"
                    onClick={() => handleOnClickUpdateTicket(item)}
                  >
                    <FaPen />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 text-xl"
                    onClick={() => {
                      handleOnClickDeleteTicket(item);
                    }}
                  >
                    <IoIosCloseCircle />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableTicket;
