"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useEffect } from "react";
import dayjs from "dayjs";
import useFetchWithToken from "@/hooks/useFetchWithToken";
import LoadingPage from "@/components/loading-page";
import formatMoney from "@/components/format-money";
const page = () => {
  const [user, setUser] = useState();
  const [card, setCard] = useState();
  const [ticket, setTicket] = useState();
  const urlCard = "http://localhost:3000/api/auth/getAllUsersInfo/UsersCard";
  const urlUser = "http://localhost:3000/api/auth/getUserById";
  const urlTicket =
    "http://localhost:3000/api/auth/getAllUsersInfo/UsersTicket";
  const { data: cards, loading, error } = useFetchWithToken(urlCard);
  const { data: users } = useFetchWithToken(urlUser);
  const { data: tickets } = useFetchWithToken(urlTicket);

  useEffect(() => {
    if (users) {
      setUser(users.user);
    }
  }, [users]);
  useEffect(() => {
    if (cards) {
      setCard(cards.user);
    }
  }, [cards]);
  useEffect(() => {
    if (tickets) {
      setTicket(tickets.orders);
    }
  }, [tickets]);
  return (
    <>
      <div
        className="w-[1320px] mx-auto px-6 py-12 mb-24 dark:bg-[rgb(10,10,10)] bg-white rounded-sm"
        style={{ boxShadow: "#0003 0px 3px 5px -1px" }}
      >
        <div className="text-3xl font-semibold text-blue-500 text-center mb-10">
          Thông Tin Cá Nhân
        </div>

        {user ? (
          <div className="flex items-start gap-10  pb-3 border-b bg-border-black ">
            {/* Avatar */}
            <div>
              <Avatar className="w-32 h-32">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>

            {/* Thông tin cá nhân */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Email
                </label>
                <div className="border px-4 py-2 rounded text-gray-800 dark:bg-black dark:text-white bg-gray-50">
                  {user.email}
                </div>
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Tên người dùng
                </label>
                <div className="border px-4 py-2 rounded text-gray-800 bg-gray-50  dark:bg-black dark:text-white ">
                  {user.username}
                </div>
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Số điện thoại
                </label>
                <div className="border px-4 py-2 rounded  dark:bg-black dark:text-white  text-gray-800 bg-gray-50">
                  {user.phone}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>loading...</div>
        )}

        <div className="mt-10 ">
          <h2 className="text-3xl font-semibold text-blue-500 text-center mb-10">
            Thẻ Xe Của Tôi
          </h2>
          {card ? (
            <div className="bg-gray-100 dark:bg-[rgb(10,10,10)] rounded-lg p-6 shadow-sm mb-8">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-xl font-semibold text-gray-700 dark:text-white">
                    Thẻ xe: <span className="font-bold">{card.loai_the}</span>
                  </p>
                  <p className="text-gray-600">
                    Ngày tạo: {dayjs(card.ngay_mua).format("DD/MM/YYYY")}
                  </p>
                </div>

                {/* Số dư */}
                <div className="bg-blue-100 text-blue-600 px-5 py-3 rounded-lg font-bold shadow">
                  Số dư hiện tại:{" "}
                  <span className="text-xl">
                    {formatMoney(card?.so_du_diem)}
                  </span>
                </div>
                <div className="bg-red-100 text-red-600 px-5 py-3 rounded-lg font-bold shadow">
                  Điểm đã sử dụng:{" "}
                  <span className="text-xl">
                    {formatMoney(card?.diem_da_su_dung)}
                  </span>
                </div>
              </div>

              {/* Danh sách vé đã mua */}
              <h3 className="text-lg font-semibold dark:text-white text-gray-700 mb-4">
                Tên vé
              </h3>
              {ticket?.length > 0 ? (
                <div className="grid grid-cols-4 gap-4">
                  {ticket?.map((item, index) => (
                    <div className=" col-span-2" key={index}>
                      {/* Vé 1 */}
                      <div className="border rounded-lg p-4 dark:bg-[rgb(10,10,10)] bg-white shadow-sm">
                        <p className="font-semibold">{item.ten_ve}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-200 ">
                          Số lượng: {item.so_luong}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-200 ">
                          Loai Xe: {item.loai_xe}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-200">
                          Ngày mua: {dayjs(item.ngay_mua).format("DD/MM/YYYY")}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-200">
                          Hạn sử dụng: {item.thoi_han}
                        </p>
                      </div>

                      {/* Thêm các vé khác nếu có */}
                    </div>
                  ))}
                </div>
              ) : (
                <div>loading...</div>
              )}
            </div>
          ) : (
            <div> Hiện ko thấy dữ liệu </div>
          )}
          {/* Khối thông tin thẻ */}
        </div>
      </div>
      <div className="h-[200px]"></div>
    </>
  );
};

export default page;
