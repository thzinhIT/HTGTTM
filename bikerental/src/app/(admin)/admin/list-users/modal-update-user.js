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

// Define Zod validation schema
const userSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  username: z.string().min(3, "Username should be at least 3 characters"),
  phone: z
    .string()
    .regex(/^\d+$/, "Phone number should only contain numbers") // Regex to only allow numbers
    .min(10, "Phone number should be at least 10 digits"), // Ensures at least 10 digits
  password: z
    .string()
    .min(6, "Password should be at least 6 characters")
    .nonempty("Password is required"),
});

export function ModalUpdateUser(props) {
  const { open, setIsOpenModalUpdate, dataUpdate, fecthdata } = props; // Destructure props to get open and onOpenChange
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Reset form after submission
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: dataUpdate?.email || "",
      password: dataUpdate?.password || "",
      phone: dataUpdate?.phone || "",
      username: dataUpdate?.username || "",
      // ...
    }, // Apply Zod resolver for validation
  });

  const handleClose = () => {
    setIsOpenModalUpdate(false); // Close the modal
  };
  const onSubmit = (data) => {
    const fecthUpdateUser = async () => {
      const res = await fetch(
        `http://localhost:3000/api/auth/users/updateUser?id=${dataUpdate.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            username: data.username,
            phone: data.phone,
            password: data.password,
          }),
        }
      );
      const req = await res.json();
      if (res.ok) {
        toast.success(req.message);
        fecthdata();
        handleClose(); // Close modal after successful submission
        reset(); // Reset form fields after successful submission
      } else {
        toast.error(req.error);
      }
    };
    fecthUpdateUser();
  };

  return (
    <>
      {dataUpdate && (
        <Dialog open={open} onOpenChange={setIsOpenModalUpdate}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Thêm người dùng</DialogTitle>
              <DialogDescription>
                Bạn nuốn thêm người dùng mới vào hệ thống?
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="col-span-3"
                />
                {errors.email && (
                  <span className="col-span-4 text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="col-span-3"
                />
                {errors.password && (
                  <span className="col-span-4 text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  {...register("username")}
                  className="col-span-3"
                />
                {errors.username && (
                  <span className="col-span-4 text-red-500 text-sm">
                    {errors.username.message}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="text"
                  {...register("phone")}
                  className="col-span-3"
                />
                {errors.phone && (
                  <span className="col-span-4 text-red-500 text-sm">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              <DialogFooter>
                <Button type="submit" className={"bg-blue-600"}>
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}{" "}
    </>
  );
}
