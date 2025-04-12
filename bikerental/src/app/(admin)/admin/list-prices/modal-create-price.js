import React from "react";
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
import { FaArrowCircleDown } from "react-icons/fa";

// Define Zod validation schema
const userSchema = z.object({
  diem_tngo: z.string().regex(/^\d+$/, "Điểm thanh toán ngoài phải là số"),
  phi_nap: z.string().regex(/^\d+$/, "Phí nạp phải là số"),
});
export function ModalCreatePrice(props) {
  const { open, setIsOpenModalCreate, refetch } = props; // Destructure props to get open and onOpenChange
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Reset form after submission
  } = useForm({
    resolver: zodResolver(userSchema), // Apply Zod resolver for validation
  });

  const handleClose = () => {
    setIsOpenModalCreate(false); // Close the modal
  };
  const onSubmit = (data) => {
    const fecCreateUser = async () => {
      const res = await fetch("http://localhost:3000/api/auth/price/addPrice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phi_nap: data.phi_nap,
          diem_tngo: data.diem_tngo,
        }),
      });
      const req = await res.json();
      if (res.ok) {
        toast.success(req.message);
        refetch();
        handleClose(); // Close modal after successful submission
        reset(); // Reset form fields after successful submission
      } else {
        toast.error(req.error);
      }
    };
    fecCreateUser();
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpenModalCreate}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm bảng</DialogTitle>
          <DialogDescription>
            Bạn nuốn thêm bảng giá mới vào hệ thống?
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phi_nap" className="text-right">
              Số tiền
            </Label>
            <Input
              id="phi_nap"
              type="number"
              {...register("phi_nap")}
              className="col-span-3"
            />
            {errors.phi_nap && (
              <span className="col-span-4 text-red-500 text-sm">
                {errors.phi_nap.message}
              </span>
            )}
          </div>
          <div className="mx-auto ">
            <FaArrowCircleDown className="text-xl text-blue-500" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="diem_tngo" className="text-right">
              Điểm
            </Label>
            <Input
              id="diem_tngo"
              type="number"
              {...register("diem_tngo")}
              className="col-span-3"
            />
            {errors.diem_tngo && (
              <span className="col-span-4 text-red-500 text-sm">
                {errors.diem_tngo.message}
              </span>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" className={"bg-blue-600"}>
              Add Price
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
