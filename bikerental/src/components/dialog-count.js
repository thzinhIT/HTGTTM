"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import usePostData from "@/hooks/useFetchPostData";

// Schema validate với Zod
const formSchema = z.object({
  soLuong: z
    .number({ invalid_type_error: "Vui lòng nhập số hợp lệ" })
    .min(1, { message: "Số lượng phải lớn hơn 0" }),
});

export default function DialogCount(props) {
  let data = {}; // object rỗng
  const { open, setOpen, name, postUrl } = props; // lấy props từ cha
  const { postData } = usePostData(); // custom hook để gửi dữ liệu
  console.log("postUrl", postUrl); // log url
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      soLuong: 1,
    },
  });
  const onClose = () => {
    setOpen(false); // đóng modal
    reset(); // reset form
  };

  const onSubmit = (formData) => {
    data = { ...data, soLuong: formData.soLuong }; // thêm trường mới

    console.log("formData", formData); // log dữ liệu
    console.log("data", data); // log dữ liệu
    postData(postUrl, data);

    onClose(); // đóng modal sau khi gửi dữ liệu
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xác Nhận Mua</DialogTitle>
          <DialogDescription>
            Bạn muốn mua <strong>{name}</strong> với số lượng bao nhiêu?
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="soLuong" className="text-right">
              Số lượng
            </Label>
            <Input
              type="number"
              placeholder="Nhập số lượng"
              min={1}
              id="soLuong"
              {...register("soLuong", { valueAsNumber: true })}
              className="col-span-3"
            />
          </div>
          {errors.soLuong && (
            <p className="text-red-500 text-sm col-span-4 text-center">
              {errors.soLuong.message}
            </p>
          )}

          <DialogFooter>
            <Button type="submit" className={"bg-blue-500 cursor-pointer"}>
              Xác nhận mua
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
