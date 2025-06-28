"use client";

import React, { useEffect } from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bike,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-toastify";
export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSelect, setIsSelect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const registerData = {
      username: formData.get("username"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
    };
    const res = await fetch(`http://localhost:3000/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });
    const data = await res.json();
    if (res.ok) {
      setIsLoading(false);
      toast.success(data.message);
      router.push("/login");
    } else {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    console.log("isSelect", isSelect);
  }, [isSelect]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Register Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md mx-auto"
        >
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-4 pb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex items-center justify-center"
              >
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-full">
                  <Bike className="h-8 w-8 text-white" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center space-y-2"
              >
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Tạo tài khoản mới
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Đăng ký để bắt đầu hành trình khám phá thành phố
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="username"
                    className="text-sm font-medium text-gray-700"
                  >
                    Tên người dùng
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="username123"
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                      name="username"
                    />
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                      name="email"
                    />
                  </div>
                </motion.div>

                {/* Số điện thoại */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Số điện thoại
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0123456789"
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                      name="phone"
                    />
                  </div>
                </motion.div>

                {/* Mật khẩu */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Mật khẩu
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                      name="password"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </motion.button>
                  </div>
                </motion.div>

                {/* Điều khoản */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-start space-x-2"
                >
                  <Checkbox
                    onClick={() => {
                      setIsSelect((prev) => !prev);
                    }}
                    className="mt-1"
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm text-gray-600 leading-relaxed"
                  >
                    <p>
                      {" "}
                      Tôi đồng ý với{" "}
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Điều khoản dịch vụ
                      </a>{" "}
                      và{" "}
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Chính sách bảo mật
                      </a>{" "}
                      của BikeRental
                    </p>
                  </Label>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading && isSelect}
                    className={`
                    w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${
                      isSelect ? "cursor-pointer" : "cursor-not-allowed"
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Đang tạo tài khoản...</span>
                      </div>
                    ) : (
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center space-x-2"
                      >
                        <span>Tạo tài khoản</span>
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              </form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center"
              >
                <p className="text-sm text-gray-600">
                  Đã có tài khoản?{" "}
                  <a
                    href="/login"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Đăng nhập ngay
                  </a>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right side - Illustration với animation floating */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{
            opacity: 1,
            x: 0,
            y: [0, -15, 0], // Animation lên xuống mạnh hơn một chút
          }}
          transition={{
            opacity: { duration: 0.6, ease: "easeOut", delay: 0.2 },
            x: { duration: 0.6, ease: "easeOut", delay: 0.2 },
            y: {
              duration: 4, // Chậm hơn một chút
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            },
          }}
          className="hidden lg:block"
        >
          <div className="relative">
            {/* Background decoration với animation */}
            <motion.div
              animate={{ rotate: [3, 6, 3] }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-700/20 rounded-3xl transform"
            />

            {/* Main illustration container */}
            <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 text-white overflow-hidden">
              {/* Decorative elements với animation */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"
              />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"
              />

              <div className="relative z-10 space-y-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 6,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 3,
                    }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6"
                  >
                    <Bike className="h-10 w-10 text-white" />
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-4">
                    Tham gia cộng đồng BikeRental
                  </h2>
                  <p className="text-blue-100 text-lg leading-relaxed">
                    Hàng ngàn người dùng đã tin tưởng và lựa chọn dịch vụ thuê
                    xe đạp của chúng tôi. Bạn sẽ là người tiếp theo?
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="grid grid-cols-2 gap-4 text-center"
                >
                  {[
                    { number: "10K+", label: "Người dùng" },
                    { number: "99%", label: "Hài lòng" },
                    { number: "5 phút", label: "Đăng ký" },
                    { number: "Miễn phí", label: "Tạo tài khoản" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/10 rounded-xl p-4 cursor-pointer"
                    >
                      <div className="text-2xl font-bold">{stat.number}</div>
                      <div className="text-blue-100 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 rounded-xl p-6 text-center cursor-pointer"
                >
                  <motion.h3
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="font-semibold mb-2"
                  >
                    🎉 Ưu đãi đặc biệt
                  </motion.h3>
                  <p className="text-blue-100 text-sm">
                    Giảm 50% cho chuyến đi đầu tiên khi đăng ký tài khoản mới!
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
