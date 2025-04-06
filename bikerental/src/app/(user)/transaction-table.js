"use client";
import React, { useState } from "react";
import { FaRegClock } from "react-icons/fa6";
import { CiWarning } from "react-icons/ci";
import { CiMoneyCheck1 } from "react-icons/ci";
import { usePathname } from "next/navigation";

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
  const [activeButton, setActiveButton] = useState("mechanic"); // Mặc định là xe đạp điện
  const [data, setdata] = useState([
    {
      model: "lượt",
      point: "10.000",
      duration: "60 phút",
      time: "60 phút",
      money: "3.000 điểm/15 phút",
      warm: "Bạn phải có số dư tối thiểu 20.000 điểm TNGo",
    },
    {
      model: "ngày",
      point: "50.000",
      duration: "450 phút",
      time: "24h ngày đăng kí",
      money: "3.000 điểm/15 phút",
    },
    {
      model: "tháng",
      point: "79.000",
      duration: "Miễn phí tất cả chuyến đi dưới 45 phút",
      time: "30 ngày kể từ ngày đăng kí",
      money: "3.000 điểm/15 phút",
    },
    {
      model: "tháng",
      point: "300.000",
      duration:
        "Miễn phí các chuyến đi trong tháng, mỗi chuyến không quá 720 phút trong ngày",
      time: "30 ngày kể từ ngày đăng kí",
      money: "3.000 điểm/15 phút",
    },
    {
      model: "tháng",
      point: "500.000",
      duration:
        " Không giới hạn số chuyến đi trong tháng, thời gian đi không vượt quá 00h00 cùng ngày.",
      time: "30 ngày kể từ ngày đăng kí",
    },
  ]);
  const pathName = usePathname();
  const checkPathName = pathName === "/price";
  const [tram, setTram] = useState([
    {
      model: "lượt",
      point: "20.000",
      duration: "60 phút",
      time: "60 phút",
      money: "6.000 điểm/15 phút",
      warm: "Lưu ý: Bạn phải có số dư tối thiểu 40.000 điểm TNGo",
    },
    {
      model: "ngày",
      point: "100.000",
      duration: "450 phút",
      time: "24h ngày đăng kí",
      money: "6.000 điểm/15 phút",
    },
  ]);
  const [currentData, setCurrentData] = useState(data);

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
                setCurrentData(data);
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

        <div className=" flex justify-between px-10 ">
          {currentData.length !== 0 &&
            currentData.slice(0, 2).map((item, index) => {
              return (
                <div
                  className="shadow-[0px_5px_15px_0px_rgba(0,0,0,0.35)] flex flex-col justify-between w-[30%] min-h-[430px]    "
                  key={index + "vinh"}
                >
                  <div className="px-3 py-3  flex flex-col ">
                    <h3 className="mt-10 mb-2 text-center text-4xl font-semibold text-blue-700">
                      Vé {item.model}
                    </h3>
                    <div className="my-10  text-center">
                      <span className="text-blue-700 text-4xl font-semibold">
                        {item.point}
                      </span>{" "}
                      điểm TNGo/lượt
                    </div>
                    <div className="flex flex-col gap-2 justify-between">
                      {" "}
                      <div className="flex items-center gap-1">
                        {" "}
                        <FaRegClock className="text-blue-700 flex-shrink-0" />
                        <p>Thời lượng: {item.duration}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaRegClock className="text-blue-700 flex-shrink-0" />
                        <p>Thời hạn: {item.time}</p>
                      </div>
                      {item.money && (
                        <div className="flex items-center gap-1">
                          {" "}
                          <CiMoneyCheck1 className="text-blue-700 text-2xl flex-shrink-0" />{" "}
                          <p>Cước phi quá thời lượng: {item.money} </p>
                        </div>
                      )}
                      {item.warm && (
                        <div className="flex items-start gap-1 flex-1 ">
                          {" "}
                          <CiWarning className="text-yellow-500 text-xl flex-shrink-0" />
                          <p> Lưu ý: {item.warm}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {checkPathName && (
                    <div className="mb-3 w-full">
                      <button className="bg-blue-600 text-white py-2 px-4 mx-auto block w-[70%] rounded-lg ">
                        {" "}
                        Đăng nhập để mua
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          <div
            className="shadow-[0px_5px_15px_0px_rgba(0,0,0,0.35)] flex flex-col justify-between w-[30%] min-h-[430px]    "
            key={currentIndex + "vinh"}
          >
            <div className="px-3 py-3 flex flex-col">
              <h3 className="mt-10 mb-2 text-center text-4xl font-semibold text-blue-700">
                Vé Tháng
              </h3>
              {currentData.length > 2 ? (
                <>
                  <div className="my-10 text-center   ">
                    <span className="text-blue-700 text-4xl font-semibold">
                      {currentData[currentIndex].point}
                    </span>{" "}
                    điểm TNGo/{currentData[currentIndex].model}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <FaRegClock className="text-blue-700 flex-shrink-0" />
                      <p>Thời lượng: {currentData[currentIndex].duration}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaRegClock className="text-blue-700 flex-shrink-0" />
                      <p>Thời hạn: {currentData[currentIndex].time}</p>
                    </div>
                    {currentData[currentIndex].money && (
                      <div className="flex items-center gap-1">
                        <CiMoneyCheck1 className="text-blue-700 text-2xl flex-shrink-0" />
                        {currentData[currentIndex].money}
                      </div>
                    )}
                    {currentData[currentIndex].warm && (
                      <div className="flex items-center gap-1 mb-16">
                        <CiWarning className="text-yellow-500 text-xl flex-shrink-0" />
                        <p>{currentData[currentIndex].warm}</p>
                      </div>
                    )}
                  </div>

                  {/* Nút Next & Prev */}
                  <div className="flex justify-center gap-0 mt-4">
                    <button
                      className={`px-4 py-2 text-3xl rounded-lg ${
                        currentIndex === 2
                          ? " text-gray-300 cursor-not-allowed"
                          : "text-black cursor-pointer "
                      }`}
                      onClick={prevSlide}
                      disabled={currentIndex === 2}
                    >
                      ←
                    </button>
                    <button
                      className={`px-4 py-2 text-3xl rounded-lg ${
                        currentIndex === data.length - 1
                          ? " text-gray-300 cursor-not-allowed"
                          : "text-black cursor-pointer"
                      }`}
                      onClick={nextSlide}
                      disabled={currentIndex === data.length - 1}
                    >
                      →
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-red-500  flex items-center justify-center h-[100%] text-xl ">
                  {" "}
                  ! chưa có áp dụng
                </div>
              )}
            </div>
            {checkPathName && (
              <div className="mb-3 w-full">
                <button className="bg-blue-600 text-white py-2 px-4 mx-auto block w-[70%] rounded-lg ">
                  {" "}
                  Đăng nhập để mua
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div></div>
    </>
  );
};

export default TransactionTable;
