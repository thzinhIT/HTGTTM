// app/components/transaction-table.js
"use client";
import React from "react";
import { useFormattedNumber } from "@/hooks/useFormattedNumber";

const TransactionTable = () => {
  const tickets = [
    { type: "Vé lượt", price: 100000, duration: "60 phút" },
    { type: "Vé ngày", price: 500000, duration: "450 phút" },
    {
      type: "Vé tháng",
      price: 890000,
      duration: "Miễn phí tất cả chuyến đi dưới 60 phút",
    },
  ];

  const formattedTickets = useFormattedNumber(tickets, "price");

  return (
    <div className="flex justify-center gap-4">
      {formattedTickets.map((ticket, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md w-1/3 text-center"
        >
          <h2 className="text-blue-600 text-xl font-semibold mb-4">
            {ticket.type}
          </h2>
          <p className="text-2xl font-bold mb-2">
            {ticket.price} đồng TNGO/lượt
          </p>
          <p className="text-sm text-gray-600">Thời lượng: {ticket.duration}</p>
        </div>
      ))}
    </div>
  );
};

export default TransactionTable;
