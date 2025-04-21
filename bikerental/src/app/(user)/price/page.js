import React from "react";
import TransactionTable from "../transaction-table";
const Price = async () => {
  return (
    <div className="dark:bg-black bg-[rgb(244,244,250)] ">
      <div className=" pb-16 px-10 ">
        <TransactionTable />
      </div>
    </div>
  );
};

export default Price;
