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

const TableUser = (props) => {
  const { users, handleOnClickDeleteUser, handleOnClickUpdateUser } = props;

  return (
    <div>
      <Table>
        <TableCaption>Bảng quản lý người dung.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">STT</TableHead>
            <TableHead className="">ID</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>PassWord</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users ? (
            users?.map((item, index) => {
              return (
                <TableRow key={index} className=" ">
                  <TableCell className="font-medium ">{index + 1}</TableCell>
                  <TableCell className="font-medium ">{item.id}</TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.password}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.role}</TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-2">
                      <button
                        className="text-blue-500 hover:text-blue-700 text-xl"
                        onClick={() => {
                          handleOnClickUpdateUser(item);
                        }}
                      >
                        <FaPen />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 text-xl"
                        onClick={() => {
                          handleOnClickDeleteUser(item);
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

export default TableUser;
