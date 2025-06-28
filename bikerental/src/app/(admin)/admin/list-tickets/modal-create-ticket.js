"use client";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Define Zod validation schema
const ticketSchema = z.object({
  ten_ve: z.enum(["Vé lượt", "Vé ngày", "Vé tháng"], {
    errorMap: () => ({ message: "Chọn loại vé hợp lệ" }),
  }),
  loai_xe: z.enum(["Xe đạp cơ", "Xe đạp điện"], {
    errorMap: () => ({ message: "Chọn loại xe hợp lệ" }),
  }),
  diem_tngo: z.string().min(1, "Điểm trung chuyển không được để trống"),
  thoi_luong: z.string().min(1, "Thời gian hiệu lực không được để trống"),
  thoi_han: z.string().min(1, "Hiệu lực không được để trống"),
  phi_phat_sinh: z.string().min(1, "Phí phát sinh không được để trống"),
  ghi_chu: z.string().optional(),
});

export function ModalCreateTicket(props) {
  const { open, setIsOpenModalCreate, refetch } = props; // Destructure props to get open and onOpenChange
  const [previewUrl, setPreviewUrl] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset, // Reset form after submission
  } = useForm({
    resolver: zodResolver(ticketSchema),
  });

  const handleClose = () => {
    setIsOpenModalCreate(false); // Close the modal
  };
  const onSubmit = (data) => {
    const fecthCreateTicket = async () => {
      const res = await fetch(
        `http://localhost:3000/api/auth/tickets/addTickets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ten_ve: data.ten_ve,
            loai_xe: data.loai_xe,
            diem_tngo: data.diem_tngo,
            thoi_luong: data.thoi_luong,
            thoi_han: data.thoi_han,
            phi_phat_sinh: data.phi_phat_sinh,
            ghi_chu: data.ghi_chu || "", // trường này không bắt buộc, nhưng vẫn gửi nếu có
          }),
        }
      );
      const req = await res.json();
      if (res.ok) {
        toast.success(req.message);
        refetch();
        handleClose(); // Close modal after successful submission
        reset(); // Reset form fields after successful submission
      } else {
        toast.error(req.message);
      }
    };
    fecthCreateTicket();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setIsOpenModalCreate}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto rounded-xl p-4">
          <DialogHeader>
            <DialogTitle>Thêm vé mới</DialogTitle>
            <DialogDescription>
              Nhập thông tin để thêm vé vào hệ thống.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
            {/* Tên vé */}
            <div>
              <Label className={"mb-1"} htmlFor="ten_ve">
                Tên vé
              </Label>
              <Select onValueChange={(value) => setValue("ten_ve", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn tên vé" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vé lượt">Vé lượt</SelectItem>
                  <SelectItem value="Vé ngày">Vé ngày</SelectItem>
                  <SelectItem value="Vé tháng">Vé tháng</SelectItem>
                </SelectContent>
              </Select>
              {errors.ten_ve && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.ten_ve.message}
                </p>
              )}
            </div>

            {/* Loại xe */}
            <div>
              <Label className={"mb-1"} htmlFor="loai_xe">
                Loại xe
              </Label>
              <Select onValueChange={(value) => setValue("loai_xe", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn loại xe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Xe đạp cơ">Xe đạp cơ</SelectItem>
                  <SelectItem value="Xe đạp điện">Xe đạp điện</SelectItem>
                </SelectContent>
              </Select>
              {errors.loai_xe && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.loai_xe.message}
                </p>
              )}
            </div>

            {/* Điểm trung chuyển */}
            <div>
              <Label className={"mb-1"} htmlFor="diem_tngo">
                Điểm thưởng
              </Label>
              <Input id="diem_tngo" {...register("diem_tngo")} />
              {errors.diem_tngo && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.diem_tngo.message}
                </p>
              )}
            </div>

            {/* Thời lượng */}
            <div>
              <Label className={"mb-1"} htmlFor="thoi_luong">
                Thời lượng
              </Label>
              <Input id="thoi_luong" {...register("thoi_luong")} />
              {errors.thoi_luong && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.thoi_luong.message}
                </p>
              )}
            </div>

            {/* Thời hạn */}
            <div>
              <Label className={"mb-1"} htmlFor="thoi_han">
                Thời hạn
              </Label>
              <Input id="thoi_han" {...register("thoi_han")} />
              {errors.thoi_han && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.thoi_han.message}
                </p>
              )}
            </div>

            {/* Phí phát sinh */}
            <div>
              <Label className={"mb-1"} htmlFor="phi_phat_sinh">
                Phí phát sinh
              </Label>
              <Input id="phi_phat_sinh" {...register("phi_phat_sinh")} />
              {errors.phi_phat_sinh && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.phi_phat_sinh.message}
                </p>
              )}
            </div>

            {/* Ghi chú */}
            <div>
              <Label className={"mb-1"} htmlFor="ghi_chu">
                Ghi chú
              </Label>
              <Input id="ghi_chu" {...register("ghi_chu")} />
            </div>

            <DialogFooter>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              >
                Thêm vé
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <div></div>
    </>
  );
}
