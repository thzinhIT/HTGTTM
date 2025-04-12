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

import { FaPen } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
const TablePrice = (props) => {
  const { prices, handleOnClickDeletePrice, handleOnClickUpdatePrice } = props;
  console.log(prices);

  return (
    <div>
      <Table>
        <TableCaption>Bảng quản lý giá nạp điểm.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">STT</TableHead>
            <TableHead className="">ID</TableHead>
            <TableHead>Money</TableHead>
            <TableHead>Point</TableHead>

            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prices && prices?.length > 0 ? (
            prices?.map((item, index) => {
              return (
                <TableRow key={index} className=" ">
                  <TableCell className="font-medium ">{index + 1}</TableCell>
                  <TableCell className="font-medium ">{item.id}</TableCell>
                  <TableCell>{item.phi_nap}</TableCell>
                  <TableCell>{item.diem_tngo}</TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-2">
                      <button
                        className="text-blue-500 hover:text-blue-700 text-xl"
                        onClick={() => {
                          handleOnClickUpdatePrice(item);
                        }}
                      >
                        <FaPen />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 text-xl"
                        onClick={() => {
                          handleOnClickDeletePrice(item);
                        }}
                      >
                        <IoIosCloseCircle />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TablePrice;
