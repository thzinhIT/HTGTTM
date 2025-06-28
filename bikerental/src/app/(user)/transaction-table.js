"use client";
import React, { use, useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa6";
import { CiWarning } from "react-icons/ci";
import { CiMoneyCheck1 } from "react-icons/ci";
import { usePathname } from "next/navigation";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import useFetchGetData from "@/hooks/useFecthGetData";
import LoginModal from "@/components/login-form";
import DialogCount from "@/components/dialog-count";
import MoneyTable from "./money-table";
import formatMoney from "@/components/format-money";
import { TableSkeleton, ButtonLoader } from "@/components/skeleton-loader";

const TransactionTable = () => {
  const [currentIndex, setCurrentIndex] = useState(2); // Bắt đầu từ index 2

  const nextSlide = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 2) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const searchParams = useSearchParams();
  const loginSuccess = searchParams.get("loginSuccess");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (loginSuccess) {
      const storeToken = localStorage.getItem("token");
      setToken(storeToken);
    }
  }, [loginSuccess]);
  const [activeButton, setActiveButton] = useState("mechanic"); // Mặc định là xe đạp điện

  const pathName = usePathname();
  const checkPathName = pathName === "/price";
  const [token, setToken] = useState();
  const [bike, setBike] = useState();
  const [tram, setTram] = useState();
  const [currentData, setCurrentData] = useState();
  const [open, setOpen] = useState(false);
  const [postUrl, setPostUrl] = useState(``);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [price, setPrice] = useState();

  const [point, setPoint] = useState();
  const handleOnClickId = (item) => {
    setName(item.ten_ve);
    setOpen(true);
    setId(item.ve_id);
  };
  useEffect(() => {
    if (id) {
      setPostUrl(`http://localhost:3000/api/auth/payment-ticket?ve_id=${id}`);
    }
  }, [id]);

  const {
    data,
    loading,
    error: ticketError,
  } = useFetchGetData(
    "http://localhost:3000/api/auth/tickets/getTickets?page=1"
  );

  useEffect(() => {
    if (data) {
      setBike(data?.veXeDap);
      setTram(data?.veXeDien);
    }
  }, [data]);
  useEffect(() => {
    if (bike) {
      setCurrentData(bike);
    }
  }, [bike]);

  return (
    <>
      <div className=" p-10 ">
        <div className="w-[1320px] mx-auto text-center">
          <h2 className="   text-blue-700 text-5xl my-9 font-bold ">
            Bảng giá dịch vụ
          </h2>
          <div className="flex gap-4 items-center justify-center my-16">
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
        </div>

        {loading ? (
          <TableSkeleton />
        ) : (
          <div className=" flex flex-wrap justify-between px-10 ">
            {currentData && currentData?.length > 0 ? (
              currentData.map((item, index) => {
                return (
                  <div
                    className="shadow-[0px_5px_15px_0px_rgba(0,0,0,0.35)] dark:border-1 dark:border-white flex flex-col justify-between w-[30%] min-h-[430px] mb-5    "
                    key={index + "vinh"}
                  >
                    <div className="px-3 py-3  flex flex-col ">
                      <h3 className="mt-10 mb-2 text-center text-4xl font-semibold text-blue-700">
                        {item.ten_ve}
                      </h3>
                      {item.diem_tngo ? (
                        <>
                          {" "}
                          <div className="my-10  text-center">
                            <span className="text-blue-700 text-4xl font-semibold">
                              {formatMoney(item.diem_tngo)}
                            </span>{" "}
                            điểm TNGo/lượt
                          </div>
                          <div className="flex flex-col gap-2 justify-between">
                            {" "}
                            <div className="flex items-center gap-1">
                              {" "}
                              <FaRegClock className="text-blue-700 flex-shrink-0" />
                              <p>Thời lượng: {item.thoi_luong}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaRegClock className="text-blue-700 flex-shrink-0" />
                              <p>Thời hạn: {item.thoi_han}</p>
                            </div>
                            {item.phi_phat_sinh && (
                              <div className="flex items-center gap-1">
                                {" "}
                                <CiMoneyCheck1 className="text-blue-700 text-2xl flex-shrink-0" />{" "}
                                <p>
                                  Cước phi quá thời lượng: {item.phi_phat_sinh}{" "}
                                </p>
                              </div>
                            )}
                            {item.ghi_chu && (
                              <div className="flex items-start gap-1 flex-1 ">
                                {" "}
                                <CiWarning className="text-yellow-500 text-xl flex-shrink-0" />
                                <p> Lưu ý: {item.ghi_chu}</p>
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <p className="text-center text-xl text-red-500 mt-10">
                          ! chưa được áp dụng
                        </p>
                      )}
                    </div>

                    <div className={`${checkPathName ? "" : "hidden"}`}>
                      {item.diem_tngo && !token ? (
                        <div className="mb-3 w-full mt-3">
                          <button className="bg-blue-600 text-white mx-auto block  py-2 px-4 rounded-lg text-xl cursor-pointer w-2/3 hover:bg-blue-900 ">
                            {" "}
                            Đăng nhập để mua
                          </button>
                        </div>
                      ) : (
                        <div className="mb-3 w-full mt-3">
                          <button
                            className="bg-blue-600 text-white  mx-auto block py-2 px-4 rounded-lg text-xl cursor-pointer w-2/3 hover:bg-blue-900"
                            onClick={() => handleOnClickId(item)}
                          >
                            {" "}
                            Mua đi bạn ơi
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="w-full text-center py-10">
                <p className="text-xl text-gray-500">Không có dữ liệu</p>
              </div>
            )}
          </div>
        )}
      </div>

      {checkPathName && (
        <>
          <MoneyTable token={token} />
          <div></div>
        </>
      )}
      <DialogCount
        open={open}
        setOpen={setOpen}
        name={name}
        postUrl={postUrl}
      />
      <div></div>
    </>
  );
};

export default TransactionTable;
