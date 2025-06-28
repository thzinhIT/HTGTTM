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

// Define Zod validation schema
const cardSchema = z.object({
  loai_the: z
    .string()
    .min(2, "Loại thẻ không được để trống")
    .max(100, "Loại thẻ không được dài quá 100 ký tự"),

  img: z.string().url("Ảnh phải là một đường link hợp lệ"),

  phi_kich_hoat: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Phí kích hoạt phải là số hợp lệ (VD: 20000.00)"
    )
    .refine(
      (value) => parseFloat(value) >= 0,
      "Số dư tối thiểu phải là số không âm"
    ),
  so_du_toi_thieu: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Số dư tối thiểu phải là số hợp lệ (VD: 100000.00)"
    ) // Kiểm tra chuỗi là số hợp lệ
    .refine(
      (value) => parseFloat(value) >= 0,
      "Số dư tối thiểu phải là số không âm"
    ), // Đảm bảo số không âm
  diem_thuong: z
    .number()
    .min(1, "Số xe tối đa phải lớn hơn 0")
    .max(100000000000, "Số xe tối đa không vượt quá 100"),
  so_xe_toi_da: z
    .number()
    .min(1, "Số xe tối đa phải lớn hơn 0")
    .max(100, "Số xe tối đa không vượt quá 100"),
});

export function ModalUpdateCard(props) {
  const { open, setIsOpenModalUpdate, dataUpdate, fecthCard } = props; // Destructure props to get open and onOpenChange
  const [previewUrl, setPreviewUrl] = useState("");
  const {
    register,
    handleSubmit,

    watch,
    formState: { errors },
    reset, // Reset form after submission
  } = useForm({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      loai_the: dataUpdate?.loai_the, // Sử dụng dữ liệu từ dataUpdate
      phi_kich_hoat: dataUpdate?.phi_kich_hoat,
      so_du_toi_thieu: dataUpdate?.so_du_toi_thieu,
      diem_thuong: dataUpdate?.diem_thuong,
      so_xe_toi_da: dataUpdate?.so_xe_toi_da,
      img: dataUpdate?.img,
    },
  });

  const handleClose = () => {
    setIsOpenModalUpdate(false); // Close the modal
  };
  const onSubmit = (data) => {
    const fecthCreatecard = async () => {
      const res = await fetch(
        `http://localhost:3000/api/auth/card/updateCard?the_id=${dataUpdate.the_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loai_the: data.loai_the,
            img: data.img,
            phi_kich_hoat: data.phi_kich_hoat,
            so_du_toi_thieu: data.so_du_toi_thieu,
            diem_thuong: data.diem_thuong,
            so_xe_toi_da: data.so_xe_toi_da,
          }),
        }
      );
      const req = await res.json();
      if (res.ok) {
        toast.success(req.message);
        fecthCard();
        handleClose(); // Close modal after successful submission
        reset(); // Reset form fields after successful submission
      } else {
        toast.error(req.message);
      }
    };
    fecthCreatecard();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setIsOpenModalUpdate}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto rounded-xl p-4">
          <DialogHeader>
            <DialogTitle>Update Card</DialogTitle>
            <DialogDescription>
              Thay đổi thông tin mà bạn muốn
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
            {/* Loại thẻ */}
            <div>
              <Label className={"mb-2"} htmlFor="loai_the">
                Loại thẻ
              </Label>
              <Input id="loai_the" {...register("loai_the")} />
              {errors.loai_the && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.loai_the.message}
                </p>
              )}
            </div>

            {/* Hình ảnh */}
            <div>
              <Label className="mb-2" htmlFor="img">
                Ảnh
              </Label>
              <div className="flex gap-2">
                <Input id="img" {...register("img")} className="flex-1" />
                <Button
                  type="button"
                  onClick={() =>
                    setPreviewUrl((prev) => (prev ? "" : watch("img")))
                  }
                  className="bg-gray-500 text-white"
                >
                  {previewUrl ? "Đóng ảnh" : "Xem trước"}
                </Button>
              </div>
              {errors.img && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.img.message}
                </p>
              )}

              {previewUrl && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Xem trước hình ảnh:
                  </p>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-40 rounded border"
                    onError={() => setPreviewUrl("")}
                  />
                </div>
              )}
            </div>

            {/* Phí kích hoạt */}
            <div>
              <Label className={"mb-2"} htmlFor="phi_kich_hoat">
                Phí kích hoạt
              </Label>
              <Input id="phi_kich_hoat" {...register("phi_kich_hoat")} />
              {errors.phi_kich_hoat && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.phi_kich_hoat.message}
                </p>
              )}
            </div>

            {/* Số dư tối thiểu */}
            <div>
              <Label className={"mb-2"} htmlFor="so_du_toi_thieu">
                Số dư tối thiểu
              </Label>
              <Input id="so_du_toi_thieu" {...register("so_du_toi_thieu")} />
              {errors.so_du_toi_thieu && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.so_du_toi_thieu.message}
                </p>
              )}
            </div>

            {/* Điểm thưởng */}
            <div>
              <Label className={"mb-2"} htmlFor="diem_thuong">
                Điểm thưởng
              </Label>
              <Input
                id="diem_thuong"
                type="number"
                {...register("diem_thuong", { valueAsNumber: true })}
              />
              {errors.diem_thuong && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.diem_thuong.message}
                </p>
              )}
            </div>

            {/* Số xe tối đa */}
            <div>
              <Label className={"mb-2"} htmlFor="so_xe_toi_da">
                Số xe tối đa
              </Label>
              <Input
                id="so_xe_toi_da"
                type="number"
                {...register("so_xe_toi_da", { valueAsNumber: true })}
              />
              {errors.so_xe_toi_da && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.so_xe_toi_da.message}
                </p>
              )}
            </div>

            <DialogFooter>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Update Card
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <div></div>
    </>
  );
}
