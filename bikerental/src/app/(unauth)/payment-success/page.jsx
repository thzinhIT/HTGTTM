"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Home,
  Receipt,
  Clock,
  CreditCard,
  User,
  Phone,
  Calendar,
  Award,
} from "lucide-react";
import { FaWallet } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import jwt from "jsonwebtoken";
import formatMoney from "@/components/format-money";
export default function PaymentSuccessPage() {
  const [showContent, setShowContent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mock transaction data

  useEffect(() => {
    // Trigger animations
    const timer1 = setTimeout(() => setShowContent(true), 300);
    const timer2 = setTimeout(() => setShowConfetti(true), 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);
  let extraData;
  if (searchParams.get("extraData")) {
    extraData = JSON.parse(
      Buffer.from(searchParams.get("extraData"), "base64").toString()
    );
    console.log("Extra Data:", extraData);
  }

  const getDataUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt.decode(token);
      return {
        id: decoded.id,
        email: decoded.email,
        Phone: decoded.phone,
      };
    }
  };
  const transaction = {
    transactionId: searchParams.get("transId") || "XXXXXXXXXXXX",
    amount: searchParams.get("amount") || "XXXXXX",
    productName: "Bánh mì thịt nướng",
    quantity: extraData?.soLuong ?? 1,
    pointsEarned: searchParams.get("payType").toUpperCase() ?? "",
    paymentMethod: "MoMo Wallet",
    timestamp: new Date(
      searchParams.get("responseTime") || Date.now()
    ).toLocaleString(),
    customerName: "Nguyễn Văn A",
    customerPhone: "0901234567",
  };
  const datauUser = getDataUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating circles */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-white/10 rounded-full animate-bounce delay-3000"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/10 rounded-full animate-bounce delay-500"></div>

        {/* Confetti Animation */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-yellow-300 animate-ping`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`,
                }}
              ></div>
            ))}
          </div>
        )}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div
          className={`w-full max-w-2xl transition-all duration-1000 ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full mb-6 animate-pulse">
              <CheckCircle className="w-12 h-12 text-white animate-bounce" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">
              Thanh toán thành công!
            </h1>
            <p className="text-blue-100 text-lg animate-fade-in delay-300">
              Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi
            </p>
          </div>

          {/* Transaction Details Card */}
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 mb-6 animate-slide-up">
            <CardContent className="p-8">
              {/* MoMo Header */}
              <div className="flex items-center justify-center mb-6 pb-6 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <FaWallet className="text-pink-600 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      MoMo Payment
                    </h2>
                    <p className="text-sm text-gray-500">Ví điện tử MoMo</p>
                  </div>
                </div>
                <Badge className="ml-auto bg-green-100 text-green-700 hover:bg-green-100">
                  Thành công
                </Badge>
              </div>

              {/* Transaction Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Receipt className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Mã giao dịch</p>
                      <p className="font-semibold text-gray-800">
                        {transaction.transactionId}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500"> Email khách hàng</p>
                      <p className="font-semibold text-gray-800">
                        {datauUser?.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Số điện thoại</p>
                      <p className="font-semibold text-gray-800">
                        {datauUser?.Phone}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Thời gian</p>
                      <p className="font-semibold text-gray-800">
                        {transaction.timestamp}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Phương thức</p>
                      <p className="font-semibold text-gray-800">
                        {transaction.paymentMethod}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Kiểu loại</p>
                      <p className="font-semibold text-green-600">
                        +{transaction.pointsEarned} điểm
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purchase Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Chi tiết đơn hàng
                </h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">
                    Số giá tiền bạn nạp x {transaction.quantity}
                  </span>
                  <span className="font-semibold">
                    {formatMoney(transaction.amount.toLocaleString())}₫
                  </span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Tổng cộng</span>
                    <span className="font-bold text-xl text-green-600">
                      {formatMoney(transaction.amount.toLocaleString())}₫
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white group"
                  onClick={() => router.push("/")}
                >
                  <Home className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                  Về trang chủ
                </Button>

                <Button
                  variant="outline"
                  className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50 group"
                  onClick={() => (window.location.href = "/receipt")}
                >
                  <Receipt className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                  Xem hóa đơn
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-blue-100 text-sm bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
              <Clock className="w-4 h-4" />
              <span>Giao dịch sẽ được xử lý trong vòng 5-10 phút</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out 0.5s forwards;
          opacity: 0;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
}
