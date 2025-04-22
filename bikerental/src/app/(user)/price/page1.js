// app/price/page.js
import React from "react";
import TransactionTable from "../components/transaction-table";

const Price = async () => {
  // Giả sử lấy dữ liệu từ API
  const response = await fetch("/api/prices");
  const data = await response.json();

  return (
    <div className="bg-[rgb(244,244,250)]">
      <div className="pb-16 px-10">
        <TransactionTable data={data} />
      </div>
    </div>
  );
};

export default Price;
