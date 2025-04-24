"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { CgLogOut } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import Link from "next/link";
export function AvatarDropdownMenu(props) {
  const { setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState(null);
  const { removeToken } = props;
  const router = useRouter();
  const handleLogout = () => {
    removeToken();
  };

  useEffect(() => {
    // Kiểm tra và lấy token từ localStorage khi component được mount
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []); // Chỉ chạy khi component mount

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Hàm kiểm tra click ngoài để đóng menu
  const handleClickOutside = (event) => {
    // Kiểm tra nếu click ngoài avatar và menu thì đóng menu
    if (!event.target.closest(".avatar-dropdown-menu")) {
      setIsMenuOpen(false);
    }
  };

  // Gắn sự kiện click khi component mount và hủy bỏ khi unmount
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    // Hủy bỏ sự kiện khi component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative avatar-dropdown-menu">
      {/* Avatar */}
      <Avatar className="w-10 h-10 cursor-pointer" onClick={toggleMenu}>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      {/* Menu khi avatar được click */}
      {isMenuOpen && (
        <ul className="absolute -left-[108px] mt-4 w-42 dark:bg-black bg-gray-50 rounded-md z-50">
          <li className="px-4 py-2  dark:hover:bg-blue-950  hover:bg-blue-200 cursor-pointer  flex items-center gap-4">
            <CgProfile />

            <Link href={"/profile"}>Profile</Link>
          </li>
          <li className=" flex items-center gap-4 px-4 py-2 dark:hover:bg-blue-950 hover:bg-blue-200 cursor-pointer">
            <CiSettings className="text-xl" />
            <Link href={"/settings"}>Settings</Link>
          </li>
          <li
            className=" flex items-center gap-4 px-4 py-2 dark:hover:bg-blue-950 hover:bg-blue-200 cursor-pointer"
            type="button"
            onClick={() => handleLogout()}
          >
            <CgLogOut className="text-xl" />
            <span>Log out</span>
          </li>
        </ul>
      )}
    </div>
  );
}
