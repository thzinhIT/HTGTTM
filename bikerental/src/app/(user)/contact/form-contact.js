"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { headers } from "../../../../next.config";
import { useState } from "react";
import Loadingform from "@/components/loading-form";

const formSchema = z.object({
  username: z.string().min(8, {
    message: "Họ tên phải nhiều hơn 10 chữ.",
  }),
  email: z.string().min(10, {
    message: "Email phải nhiều hơn 10 chữ.",
  }),
  phone: z
    .string()
    .min(9, "Số điện thoại phải ít nhất 9 chữ số")
    .regex(/^\d+$/, "Số điện thoại chỉ được chứa chữ số"),
  title: z.string().min(15, {
    message: "Tiêu đề phải nhiều hơn 15 chữ.",
  }),
  content: z.string().min(30, {
    message: "Nội dung phải nhiều hơn 30 chữ.",
  }),
});

export default function FormContact() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      title: "",
      content: "",
    },
  });

  // ✅ Xử lý submit form
  const onSubmit = (data) => {
    const FetchPostData = async () => {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/auth/contract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ho_va_ten: data.username,
          email: data.email,
          sdt: data.phone,
          tieu_de: data.title,
          noi_dung: data.content,
        }),
      });

      const req = await res.json();
      if (res.ok) {
        setLoading(false);
        toast.success(req.message);
        form.reset();
      } else toast.error(req.message);
    };
    FetchPostData();
  };

  return (
    <Form {...form} className="w-[55%]">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* ✅ Mỗi FormField chỉ nên chứa một input */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[17px]">Email</FormLabel>
              <FormControl>
                <Input placeholder="Nhập email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-5 justify-between">
          <div className="w-[50%]">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[17px]">Họ và tên</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-[50%]">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[17px]">Số điện thoại</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập số điện thoại" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[17px]">Tiêu đề</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tiêu đề" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[17px]">Nội dung</FormLabel>
              <FormControl>
                <Textarea placeholder="Nhập nội dung" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={`w-full bg-blue-600 text-xl font-semibold  disabled:${loading}`}
        >
          {loading ? <Loadingform /> : "Gửi"}
        </Button>
      </form>
    </Form>
  );
}
