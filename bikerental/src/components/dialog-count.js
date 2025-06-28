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
import { FaHandPointDown, FaMoneyBillWave, FaWallet } from "react-icons/fa";

import { zodResolver } from "@hookform/resolvers/zod";
import usePostData from "@/hooks/useFetchPostData";
import { use, useState } from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import formatMoney from "./format-money";

<<<<<<< HEAD
// Schema validate với Zod
const formSchema = z.object({
  soLuong: z
    .number({ invalid_type_error: "Vui lòng nhập số hợp lệ" })
    .min(1, { message: "Số lượng phải lớn hơn 0" }),
});

// export default function DialogCount(props) {
//   let data = {}; // object rỗng
//   const [count, setCount] = useState(1);
//   const { open, setOpen, name, postUrl, price, point } = props; // lấy props từ cha
//   const { postData } = usePostData(); // custom hook để gửi dữ liệu
//   const [total, setTotal] = useState(0);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       soLuong: 1,
//     },
//   });
//   const onClose = () => {
//     setOpen(false); // đóng modal
//     reset(); // reset form
//   };

//   const onSubmit = (formData) => {
//     data = { ...data, soLuong: formData.soLuong }; // thêm trường mới

//     postData(postUrl, data);

//     onClose(); // đóng modal sau khi gửi dữ liệu
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Xác Nhận Mua</DialogTitle>
//           <DialogDescription>
//             Bạn muốn mua <strong>{name}</strong> với số lượng bao nhiêu?
//           </DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="soLuong" className="text-right">
//               Số lượng
//             </Label>
//             <Input
//               type="number"
//               placeholder="Nhập số lượng"
//               min={1}
//               id="soLuong"
//               {...register("soLuong", { valueAsNumber: true })}
//               className="col-span-3"
//               onChange={(e) => {
//                 const value = parseInt(e.target.value || "0");
//                 setValue("soLuong", value); // nếu bạn đang dùng react-hook-form

//                 setCount(value);
//                 console.log(count);
//                 setTotal(value * price); // tự tính tổng tiền
//               }}
//             />
//           </div>
//           {errors.soLuong && (
//             <p className="text-red-500 text-sm col-span-4 text-center">
//               {errors.soLuong.message}
//             </p>
//           )}
//           {/* Hiển thị tổng tiền và điểm */}
//           {point && (
//             <FaHandPointDown className="mx-auto text-xl animate-bounce" />
//           )}

//           <div className="flex text-center items-center justify-center text-sm text-gray-600">
//             {count > 0 && point && (
//               <>
//                 <div className="w-1/2">
//                   <span>Số điểm: </span>
//                   <strong>{formatMoney(point * count)}</strong>
//                 </div>

//                 <div className="w-1/2">
//                   <span>Tổng tiền: </span>
//                   <strong>{(count * price).toLocaleString()} VNĐ</strong>
//                 </div>
//               </>
//             )}
//           </div>

//           <DialogFooter>
//             <Button type="submit" className={"bg-blue-500 cursor-pointer"}>
//               Xác nhận mua
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

=======
>>>>>>> 0dda2e5a54d5d30143e6f3013027b113930fe19c
export default function DialogCount(props) {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const { open, setOpen, name, postUrl, price, point } = props; // lấy props từ cha

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      soLuong: 1,
      paymentMethod: "cash",
    },
  });
  const { postData, loading } = usePostData();
  const onClose = () => {
    setOpen(false); // đóng modal
    reset(); // reset form
  };

  const onSubmit = (data) => {
    if (paymentMethod === "momo") {
      console.log("Thanh toán MoMo");
    } else {
      let body = { soLuong: data?.soLuong };
      postData(postUrl, body);
    }
  };

<<<<<<< HEAD
  // const handleSubmitPayment = (paymentMethod, e) => {
  //   e.preventDefault(); // Ngăn chặn hành động mặc định của form
  //   if (paymentMethod === "momo") {
  //     console.log("Thanh toán MoMo");
  //   } else {
  //     postData(postUrl, data);
  //   }
  // };
=======
  const handlePaymentMomo = async (data) => {
    const dataMM = data;
    try {
      const res = await fetch("http://localhost:3000/api/auth/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          soLuong: dataMM?.soLuong,
          id: id,
          userId: getUserId(),
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const text = await res.text();

      if (!text) {
        throw new Error("Empty response from server.");
      }

      let data;

      try {
        data = JSON.parse(text);
      } catch (error) {
        console.error("Lỗi parse JSON:", error);
        throw new Error("Response is not valid JSON.");
      }

      if (data.payUrl) {
        window.location.href = data.payUrl;
      } else {
        toast.error("Có lỗi khi tạo thanh toán.");
      }
    } catch (error) {
      console.error("Lỗi gọi API:", error);
      alert("Lỗi hệ thống.");
    } finally {
      onClose(); // Đóng modal sau khi xử lý thanh toán
    }
  };
>>>>>>> 0dda2e5a54d5d30143e6f3013027b113930fe19c

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Xác Nhận Mua</DialogTitle>
          <DialogDescription>
            Bạn muốn mua <strong>{name}</strong> với số lượng bao nhiêu?
          </DialogDescription>
        </DialogHeader>
        {/* handleSubmit(onSubmit) */}
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 py-4">
          {/* Số lượng */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="soLuong" className="text-right">
              Số lượng
            </Label>
            <Input
              type="number"
              placeholder="Nhập số lượng"
              min={1}
              id="soLuong"
              {...register("soLuong", {
                required: "Vui lòng nhập số lượng",
                min: { value: 1, message: "Số lượng phải lớn hơn 0" },
                valueAsNumber: true,
              })}
              className="col-span-3"
              onChange={(e) => {
                const value = Number.parseInt(e.target.value || "0");
                setValue("soLuong", value);
                setCount(value);
                setTotal(value * price);
              }}
            />
          </div>
          {errors.soLuong && (
            <p className="text-red-500 text-sm col-span-4 text-center">
              {errors.soLuong.message}
            </p>
          )}

          {/* Phương thức thanh toán */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Phương thức thanh toán
            </Label>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(value) => {
                setPaymentMethod(value);
                setValue("paymentMethod", value);
              }}
              className="grid grid-cols-1 gap-3"
            >
              {/* Thanh toán tiền mặt */}
              <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="cash" id="cash" />
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <FaMoneyBillWave className="text-green-600 text-sm" />
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor="cash"
                      className="font-medium cursor-pointer"
                    >
                      Thanh toán tiền mặt
                    </Label>
                    <p className="text-sm text-gray-500">
                      Thanh toán trực tiếp tại trạm
                    </p>
                  </div>
                </div>
              </div>

              {/* Thanh toán MoMo */}
              <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="momo" id="momo" />
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                    <FaWallet className="text-pink-600 text-sm" />
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor="momo"
                      className="font-medium cursor-pointer"
                    >
                      Thanh toán MoMo
                    </Label>
                    <p className="text-sm text-gray-500">
                      Thanh toán qua ví điện tử MoMo
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Hiển thị tổng tiền và điểm */}
          {point && count > 0 && (
            <div className="space-y-3">
              <FaHandPointDown className="mx-auto text-xl animate-bounce text-blue-500" />

              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Số điểm nhận được:
                  </span>
                  <strong className="text-blue-600">
                    {formatMoney(point * count)} điểm
                  </strong>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tổng tiền:</span>
                  <strong className="text-lg text-green-600">
                    {(count * price).toLocaleString()} VNĐ
                  </strong>
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-sm text-gray-600">Phương thức:</span>
                  <div className="flex items-center space-x-2">
                    {paymentMethod === "momo" ? (
                      <>
                        <FaWallet className="text-pink-600 text-sm" />
                        <span className="text-sm font-medium">MoMo</span>
                      </>
                    ) : (
                      <>
                        <FaMoneyBillWave className="text-green-600 text-sm" />
                        <span className="text-sm font-medium">Tiền mặt</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="mr-2"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white"
              disabled={loading}
              // onClick={(e) => {
              //   handleSubmitPayment(paymentMethod, e);
              // }}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Vui lòng chờ ...</span>
                </div>
              ) : paymentMethod === "momo" ? (
                "Thanh toán MoMo"
              ) : (
                "Xác nhận mua"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
