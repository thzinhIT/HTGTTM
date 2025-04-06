// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export function LoginForm({ className, ...props }) {
//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Card>
//         <CardHeader>
//           <CardTitle>Login to your account</CardTitle>
//           <CardDescription>
//             Enter your email below to login to your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form>
//             <div className="flex flex-col gap-6">
//               <div className="grid gap-3">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="m@example.com"
//                   required
//                 />
//               </div>
//               <div className="grid gap-3">
//                 <div className="flex items-center">
//                   <Label htmlFor="password">Password</Label>
//                   {/* <a
//                     href="#"
//                     className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
//                   >
//                     Forgot your password?
//                   </a> */}
//                 </div>
//                 <Input id="password" type="password" required />
//               </div>
//               <div className="flex flex-col gap-3">
//                 <Button type="submit" className="w-full">
//                   Login
//                 </Button>
//               </div>
//             </div>
//             <div className="mt-4 text-center text-sm">
//               Don&apos;t have an account?{" "}
//               <a href="#" className="underline underline-offset-4">
//                 Sign up
//               </a>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

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
import RegisterModal from "../app/(user)/register/RegisterModal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});
export default function LoginModal({ open, onClose }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    const req = await res.json();
    console.log("checktokent", req);
    const token = req.token;
    localStorage.setItem("token", token);
    if (res.ok) {
      toast.success(req.message);
      window.location.reload();
    } else toast.error(req.message);
    onClose();
  };

  return (
    <>
      {" "}
      {/* <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Đăng nhập</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              placeholder="Mật khẩu"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={"mb-2"}
            />
            <div className="flex justify-center mt-4">
              <Button type="submit" className="w-[70%] mx-auto">
                Đăng nhập
              </Button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm">
            Nếu bạn chưa có tài khoản,{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => {
                setIsRegisterOpen(true);
                onClose(); // Đóng modal đăng nhập
              }}
            >
              đăng ký ngay
            </button>
          </p>
        </DialogContent>
      </Dialog> */}
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Đăng nhập</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* ✅ Email Input */}
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            {/* ✅ Password Input */}
            <Input
              type="password"
              placeholder="Mật khẩu"
              {...register("password")}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <div className="flex justify-center mt-4">
              <Button type="submit" className="w-[70%] mx-auto cursor-pointer">
                Đăng nhập
              </Button>
            </div>
          </form>

          {/* Đăng ký */}
          <p className="mt-4 text-center text-sm">
            Nếu bạn chưa có tài khoản,{" "}
            <button
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => {
                setIsRegisterOpen(true);
                onClose();
              }}
            >
              đăng ký ngay
            </button>
          </p>
        </DialogContent>
      </Dialog>
      <RegisterModal
        open={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </>
  );
}
