"use client";
import LoginModal from "@/components/login-form";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import logo from "../../../../public/assets/img/logo-vn.jpg";
import { AvatarDropdownMenu } from "./drop-menu";
import logoDark from "../../../../public/assets/img/logoft.png";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [theme, setTheme] = useState(null);
  const pathName = usePathname();
  const router = useRouter();

  console.log(token);
  useEffect(() => {
    // ✅ Khi component được render bên client, lấy token từ localStorage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);
  const removeToken = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem("token");
    router.replace(`/`);

    // Cập nhật lại state token (để điều hướng lại UI)
    setToken(null);
  };

  const addToken = () => {
    router.replace(`${pathName}?loginSuccess=true`);
    setToken(localStorage.getItem("token"));
  };

  return (
    <>
      <div className=" ">
        <div className="flex justify-between items-center py-5 gap-2 fixed  left-0 top-0 z-50 dark:bg-[rgb(9,9,9)] bg-white w-full shadow-[0px_2px_4px_0px_#b6b6b680] pr-5 ">
          <div className="flex-shirk-0 pl-7 dark:bg-[rgb(9,9,9)]">
            <Link href={"/"}>
              <Image
                src={logo}
                alt="logo"
                width={152}
                height={70}
                className={`dark:hidden block`}
              />
              <Image
                src={logoDark}
                alt="logo"
                width={152}
                height={70}
                className={`hidden dark:block`}
              />
            </Link>
          </div>
          <div className="flex justify-end flex-wrap pl-5">
            <ul className="flex  items-center flex-wrap justify-end ">
              <li className="px-8 py-4 text-lg font-medium hover:bg-blue-300 duration-300">
                <div>
                  <Link href="/usermanual"> Hướng dẫn sử dụng</Link>
                </div>
              </li>
              <li className="px-8 py-4 text-lg font-medium hover:bg-blue-300 duration-300">
                <div>
                  <Link href="price"> Bảng giá</Link>
                </div>
              </li>
              {/* <li className="px-8 py-4 text-lg font-medium hover:bg-blue-300 duration-300 relative">
                <div>
                  <Link href="#">dịch vụ</Link>
                </div>
              </li> */}

              {/* Dịch vụ */}
              <li
                className="px-8 py-4 text-lg font-medium hover:bg-blue-300 duration-300 relative"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                <div>
                  <Link href="#">Dịch vụ</Link>
                </div>

                {/* Menu con */}
                {isOpen && (
                  <ul className="absolute left-0 mt-4 w-56 dark:bg-black bg-gray-50  rounded-md z-50 ">
                    <li className="px-4 py-2 dark:hover:bg-blue-950 hover:bg-blue-200">
                      <Link href="/rifd">Thẻ RFID</Link>
                    </li>
                    <li className="px-4 py-2 dark:hover:bg-blue-950  hover:bg-blue-200">
                      <Link href="/rentbike">Dịch vụ - sự kiện</Link>
                    </li>
                    <li className="px-4 py-2 dark:hover:bg-blue-950  hover:bg-blue-200">
                      <Link href="/trip-care">Bảo hiểm Trip Care</Link>
                    </li>
                    <li className="px-4 py-2 dark:hover:bg-blue-950  hover:bg-blue-200">
                      <Link href="/gps">Đường đi đến trạm</Link>
                    </li>
                  </ul>
                )}
              </li>

              <li className="px-8 py-4 text-lg font-medium hover:bg-blue-300 duration-300">
                <div>
                  <Link href="/station-list">Danh sách trạm</Link>
                </div>
              </li>
              <li className="px-8 py-4 text-lg font-medium hover:bg-blue-300 duration-300">
                <div>
                  <Link href="/newspaper">Tin tức </Link>
                </div>
              </li>
              <li className="px-8 py-4 text-lg font-medium hover:bg-blue-300 duration-300">
                <div>
                  <Link href="/contact">Liên hệ</Link>
                </div>
              </li>
              <li className="px-8 py-4 text-lg font-medium hover:bg-blue-300 duration-300">
                <div>
                  <Link href="/primary-security">Chính sách bảo mật</Link>
                </div>
              </li>
            </ul>{" "}
            <div className="flex  gap-2 items-center">
              {" "}
              {token ? (
                <AvatarDropdownMenu removeToken={removeToken} />
              ) : (
                <button
                  className="text-blue-400 py-2 px-2
               border-blue-400 border-solid border-1
                rounded-2xl text-center box-border 
                self-center cursor-pointer hover:bg-blue-500 hover:text-white duration-300"
                  onClick={() => setIsLoginOpen(true)}
                >
                  Đăng nhập
                </button>
              )}
            </div>
            <LoginModal
              open={isLoginOpen}
              onClose={() => setIsLoginOpen(false)}
              addToken={addToken}
            />
          </div>
        </div>
      </div>

      <div></div>
    </>
  );
};

export default Header;
