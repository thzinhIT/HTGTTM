"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useEffect } from "react";
import useFetchWithToken from "@/hooks/useFetchWithToken";
const page = () => {
  const [user, setUser] = useState();
  const [card, setCard] = useState();
  const urlCard = "http://localhost:3000/api/auth/getAllUsersInfo/UsersCard";
  const urlUser = "http://localhost:3000/api/auth/getUserById";
  const { data: cards, loading, error } = useFetchWithToken(urlCard);
  const { data: users } = useFetchWithToken(urlUser);
  console.log("check card", cards);
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
  return (
    <>
      <div
        className="w-[1320px] mx-auto px-6 py-12 mb-24 bg-white rounded-sm"
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
                <div className="border px-4 py-2 rounded text-gray-800 bg-gray-50">
                  {user.email}
                </div>
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Tên người dùng
                </label>
                <div className="border px-4 py-2 rounded text-gray-800 bg-gray-50">
                  {user.username}
                </div>
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Số điện thoại
                </label>
                <div className="border px-4 py-2 rounded text-gray-800 bg-gray-50">
                  {user.phone}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>loading...</div>
        )}

        <div className="mt-10">
          <h2 className="text-3xl font-semibold text-blue-500 text-center mb-10">
            Thẻ Xe Của Tôi
          </h2>
          {card ? (
            <div className="bg-gray-100 rounded-lg p-6 shadow-sm mb-8">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-xl font-semibold text-gray-700">
                    Thẻ xe: <span className="font-bold">{card.loai_the}</span>
                  </p>
                  <p className="text-gray-600">Ngày tạo: {card.ngay_mua}</p>
                </div>

                {/* Số dư */}
                <div className="bg-blue-100 text-blue-600 px-5 py-3 rounded-lg font-bold shadow">
                  Số dư hiện tại:{" "}
                  <span className="text-xl">{card.so_du_diem}</span>
                </div>
                <div className="bg-red-100 text-red-600 px-5 py-3 rounded-lg font-bold shadow">
                  Điểm đã sử dụng:{" "}
                  <span className="text-xl">{card.diem_da_su_dung}</span>
                </div>
              </div>

              {/* Danh sách vé đã mua */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Vé đã mua
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Vé 1 */}
                  <div className="border rounded-lg p-4 bg-white shadow-sm">
                    <p className="font-semibold">Vé lượt</p>
                    <p className="text-sm text-gray-600">Số lượng: 2</p>
                    <p className="text-sm text-gray-600">
                      Hạn sử dụng: 12/04/2025
                    </p>
                  </div>

                  {/* Vé 2 */}
                  <div className="border rounded-lg p-4 bg-white shadow-sm">
                    <p className="font-semibold">Vé tháng</p>
                    <p className="text-sm text-gray-600">Số lượng: 1</p>
                    <p className="text-sm text-gray-600">
                      Hạn sử dụng: 30/04/2025
                    </p>
                  </div>

                  {/* Thêm các vé khác nếu có */}
                </div>
              </div>
            </div>
          ) : (
            <div>loading...</div>
          )}
          {/* Khối thông tin thẻ */}
        </div>
      </div>

      <div className="h-[500px]"></div>
    </>
  );
};

export default page;
