"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LuBike } from "react-icons/lu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectPortal,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
const formSchema = z.object({
  fullName: z.string().min(5, "Họ và tên không được để trống"),
  phone: z
    .string()
    .min(8, "Số điện thoại phải có ít nhất 8 chữ số")
    .regex(/^\d+$/, "Số điện thoại chỉ được chứa chữ số"),
  city: z.string().min(4, "Vui lòng chọn thành phố"),
  vehicleCount: z
    .string()
    .min(1, "Số lượng xe không được để trống")
    .regex(/^\d+$/, "Số lượng xe phải là số tự nhiên")
    .transform((val) => Number(val))
    .refine((val) => val > 0, "Số lượng xe phải lớn hơn 0"),
  pickupAddress: z.string().min(5, "Địa chỉ nhận xe không được để trống"),
  dropoffAddress: z.string().min(5, "Địa chỉ trả xe không được để trống"),
  pickupDate: z.string().min(6, "Thời điểm nhận xe không được để trống"),
  dropoffDate: z.string().min(6, "Thời điểm trả xe không được để trống"),
});
const FormRegister = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <>
      <div className="mt-8">
        <h2 className="text-3xl font-semibold">
          Để đăng ký thuê xe sự kiện, quý khách vui lòng điền một số thông tin
          sau
        </h2>
      </div>
      <div className="mt-8 flex">
        <div className=" flex-shrink-0 w-[50%] px-3 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" space-y-4 flex-col flex justify-between"
          >
            <div className="flex gap-5">
              <div className="w-1/2">
                <label>Họ và tên *</label>
                <Input {...register("fullName")} placeholder="Nhập họ tên" />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label>Số điện thoại liên hệ *</label>
                <Input
                  {...register("phone")}
                  placeholder="Nhập số điện thoại"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-1/2">
                <label>Thành phố/Dự án *</label>
                <Select
                  onValueChange={(value) => setValue("city", value)} // Cập nhật giá trị vào react-hook-form
                >
                  <SelectTrigger className="border rounded p-2 w-full">
                    <SelectValue placeholder="Chọn thành phố" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    <SelectItem value="Hồ Chí Minh">TP Hồ Chí Minh</SelectItem>
                    <SelectItem value="Vũng Tàu">Vũng Tàu</SelectItem>
                    <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                    <SelectItem value="Quy Nhơn">Quy Nhơn</SelectItem>
                    <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
                    <SelectItem value="Hải Phòng">Hải Phòng</SelectItem>
                  </SelectContent>
                </Select>
                {errors.city && (
                  <p className="text-red-500">{errors.city.message}</p>
                )}
              </div>
              <div className="w-1/2">
                <label>Số lượng xe *</label>
                <Input
                  type="number"
                  {...register("vehicleCount")}
                  placeholder="Nhập số lượng xe"
                  min={1} // Chỉ nhận số >= 1
                />
                {errors.vehicleCount && (
                  <p className="text-red-500 text-sm">
                    {errors.vehicleCount.message}
                  </p>
                )}
              </div>
            </div>

            <label>Địa chỉ nhận giao xe *</label>
            <Input {...register("pickupAddress")} placeholder="Nhập địa chỉ" />
            {errors.pickupAddress && (
              <p className="text-red-500 text-sm">
                {errors.pickupAddress.message}
              </p>
            )}

            <label>Địa chỉ trả xe</label>
            <Input {...register("dropoffAddress")} placeholder="Nhập địa chỉ" />
            {errors.dropoffAddress && (
              <p className="text-red-500 text-sm">
                {errors.dropoffAddress.message}
              </p>
            )}
            <div className="flex gap-5">
              <div className="w-1/2">
                <label>Thời điểm nhận xe *</label>
                <Input
                  {...register("pickupDate")}
                  placeholder="dd/mm/yyyy"
                  type="date"
                />
                {errors.pickupDate && (
                  <p className="text-red-500 text-sm">
                    {errors.pickupDate.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label>Thời điểm trả xe *</label>
                <Input
                  {...register("dropoffDate")}
                  placeholder="dd/mm/yyyy"
                  type="date"
                />
                {errors.dropoffDate && (
                  <p className="text-red-500 text-sm">
                    {errors.dropoffDate.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 text-lg font-semibold"
            >
              <LuBike className="text-3xl" />
              <p>Đặt xe</p>
            </Button>
          </form>
        </div>
        <div className="">
          <div className="bg-blue-300 rounded-xl w[50%] flex-1 flex-shrink-0 ml-12">
            <div className="p-12 text-[16px] flex flex-col gap-4 mb-2 text-justify">
              <h3 className="text-center text-2xl font-semibold">
                Thông tin chung TNGo
              </h3>
              <p>
                Mọi thắc mắc về dịch vụ, hợp tác kinh doanh, truyền thông xin
                vui lòng liên hệ theo thông tin dưới đây:
              </p>
              <p>
                <b>Hotline hỗ trợ 24/7: </b>
                <Link
                  href="tel:+84377590393"
                  target="_blank"
                  className="text-blue-700 cursor-pointer"
                >
                  0377590393
                </Link>
              </p>
              <p>
                <b>Email:</b>{" "}
                <Link
                  href={"https://mail.google.com/"}
                  target="_blank"
                  className="text-blue-700 cursor-pointer"
                >
                  lebinh5112004@gmail.com
                </Link>
              </p>
              <p>
                <b> Website:</b>{" "}
                <Link
                  href={"/"}
                  target="_blank"
                  className="text-blue-700 cursor-pointer"
                >
                  www.tngo.vn
                </Link>
              </p>
              <p>
                <b>Facebook:</b>{" "}
                <Link
                  href={"https://www.facebook.com/tngo.vn"}
                  target="_blank"
                  className="text-blue-700 cursor-pointer"
                >
                  tngo.vn
                </Link>{" "}
              </p>
              <p>
                <b> Liên hệ quảng cáo : </b>
                0974 222 790 - Alice Nguyễn (khu vực TP. Hồ Chí Minh, TP. Vũng
                Tàu, TP. Đà Nẵng)
              </p>
              <p className="">
                Dịch vụ xe đạp công cộng TNGo - Một sản phẩm của Tập đoàn Nhóm 4
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormRegister;
