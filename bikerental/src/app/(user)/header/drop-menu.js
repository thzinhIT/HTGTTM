// app/components/AvatarDropdownMenu.js (giả định)
"use client";
import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoPersonOutline } from "react-icons/io5"; // Icon cho Profile
import { IoMdSettings } from "react-icons/io"; // Icon cho Settings
import { CiLogout } from "react-icons/ci"; // Icon cho Log out

export function AvatarDropdownMenu(props) {
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
    if (!event.target.closest(".avatar-dropdown-menu")) {
      setIsMenuOpen(false);
    }
  };

  // Gắn sự kiện click khi component mount và hủy bỏ khi unmount
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
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
        <ul className="absolute -left-[108px] mt-4 w-48 bg-white shadow-md rounded-md z-50">
          <li className="flex items-center gap-3 px-4 py-2 hover:bg-blue-100 cursor-pointer">
            <IoPersonOutline className="text-gray-500 text-lg" />
            <Link href="/profile" className="font-semibold">
              Profile
            </Link>
          </li>
          <li className="flex items-center gap-3 px-4 py-2 hover:bg-blue-100 cursor-pointer">
            <IoMdSettings className="text-gray-500 text-lg" />
            <Link href="/settings" className="font-semibold">
              Settings
            </Link>
          </li>
          <li
            className="flex items-center gap-3 px-4 py-2 hover:bg-blue-100 cursor-pointer"
            onClick={() => {
              handleLogout();
              router.push("/");
            }}
          >
            <CiLogout className="text-gray-500 text-lg" />
            <span className="font-semibold">Log out</span>
          </li>
        </ul>
      )}
    </div>
  );
}
