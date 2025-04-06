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
import { ModalDeleteUser } from "./modal-delete-user";
const TableUser = (props) => {
  const { users, handleOnClickDeleteUser, handleOnClickUpdateUser } = props;

  return (
    <div>
      <Table>
        <TableCaption>Bảng quản lý người dùng.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">STT</TableHead>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-right">Role</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users ? (
            users.map((user, index) => (
              <TableRow key={index} className=" ">
                <TableCell className="font-medium ">{index + 1}</TableCell>
                <TableCell className="font-medium ">{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell className="text-right">{user.role}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    <button
                      className="text-blue-500 hover:text-blue-700  text-xl"
                      onClick={() => handleOnClickUpdateUser(user)}
                    >
                      <FaPen />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 text-xl"
                      onClick={() => handleOnClickDeleteUser(user)}
                    >
                      <IoIosCloseCircle />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
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
