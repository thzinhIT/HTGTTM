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

import Image from "next/image";

const TableCard = (props) => {
  const { cards, handleOnClickDeleteCard, handleOnClickUpdateCard } = props;

  return (
    <div>
      <Table>
        <TableCaption>Bảng quản lý thẻ xe.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">STT</TableHead>
            <TableHead className="">ID</TableHead>
            <TableHead>Loại thẻ</TableHead>
            <TableHead>Phí mở thẻ</TableHead>
            <TableHead>Điểm tối thiểu</TableHead>
            <TableHead>Điểm tặng</TableHead>
            <TableHead> Số xe tối đa mở</TableHead>
            <TableHead> Hình thẻ</TableHead>

            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cards ? (
            cards.map((item, index) => {
              return (
                <TableRow key={index} className=" ">
                  <TableCell className="font-medium ">{index + 1}</TableCell>
                  <TableCell className="font-medium ">{item.the_id}</TableCell>
                  <TableCell>{item.loai_the}</TableCell>
                  <TableCell>{item.phi_kich_hoat}</TableCell>
                  <TableCell>{item.so_du_toi_thieu}</TableCell>
                  <TableCell>{item.diem_thuong}</TableCell>
                  <TableCell>{item.so_xe_toi_da}</TableCell>
                  <TableCell className="relative h-[120px] w-[180px]  ">
                    <Image
                      src={item.img}
                      alt="ảnh thẻ"
                      fill
                      objectFit="cover"
                      className="object-top"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-2">
                      <button
                        className="text-blue-500 hover:text-blue-700 text-xl"
                        onClick={() => {
                          handleOnClickUpdateCard(item);
                        }}
                      >
                        <FaPen />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 text-xl"
                        onClick={() => {
                          handleOnClickDeleteCard(item);
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

export default TableCard;
