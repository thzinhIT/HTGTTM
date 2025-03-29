"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";

const registerSchema = z.object({
  email: z
    .string()
    .min(5, "Email phải có ít nhất 5 ký tự")
    .max(30, "Email không được quá 50 ký tự")
    .email("Email không hợp lệ")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Email phải có định dạng hợp lệ (ví dụ: example@gmail.com)"
    ),
  username: z.string().min(6, "Tên người dùng ít nhất 3 ký tự"),
  password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
  phone: z
    .string()
    .regex(/^0\d{9}$/, "Số điện thoại phải có 10 số và bắt đầu bằng 0"),
});

export default function RegisterModal({ open, onClose }) {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      registerSchema.parse(formData);
      console.log("Register data:", formData);
      onClose(); // Đóng modal sau khi đăng ký thành công
    } catch (error) {
      const fieldErrors = {};
      error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Đăng ký</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <Input
              type="password"
              placeholder="Mật khẩu"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div>
            <Input
              type="text"
              placeholder="Tên người dùng"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          <div>
            <Input
              type="text"
              placeholder="Số điện thoại"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
          <div className="flex justify-center">
            <Button type="submit" className="w-[70%] cursor-pointer">
              Đăng ký
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
