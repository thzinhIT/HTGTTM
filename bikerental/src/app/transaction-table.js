import React from "react";

const TransactionTable = () => {
  return (
    <>
      <div className="mt-20 p-10 ">
        <div className="w-[1320px] mx-auto text-center">
          <h2 className="   text-blue-500 text-5xl my-9 ">Bảng giá dịch vụ</h2>
          <div className=" flex gap-4 items-center justify-center">
            <button className=" text-blue-500 w-36 bg-gray-200 h-14 flex justify-center hover:bg-gray-300 items-center rounded-4xl border-2 border-blue-500 focus:bg-blue-500 focus:text-white">
              Xe đạp điện
            </button>
            <button className=" text-blue-500 w-36 bg-gray-200 h-14 flex justify-center hover:bg-gray-300 items-center rounded-4xl border-2 border-blue-500  focus:bg-blue-500 focus:text-white">
              Xe đạp cơ
            </button>
          </div>
        </div>
        <div></div>
      </div>

      <div></div>
    </>
  );
};

export default TransactionTable;
