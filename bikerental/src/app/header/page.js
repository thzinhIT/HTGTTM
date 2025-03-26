"use client";
import React from "react";
import Image from "next/image";
import logo from "../../../public/assets/img/logo-vn.jpg";
import icon from "../../../public/assets/img/vi.png";
import Link from "next/link";
import { useState } from "react";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className=" ">
        <div className="flex justify-between items-center py-5 gap-2 fixed  left-0 top-0 z-50 bg-white w-full shadow-[0px_2px_4px_0px_#b6b6b680] pr-5 ">
          <div className="flex-shirk-0 pl-7">
            <Link href={"/"}>
              <Image src={logo} alt="logo" width={152} height={70} />
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
                  <ul className="absolute left-0 mt-4 w-56 bg-white  rounded-md z-50 ">
                    <li className="px-4 py-2 hover:bg-blue-200">
                      <Link href="rank">Bảng xếp hạng</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-blue-200">
                      <Link href="#">Thẻ trả trước TapGo</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-blue-200">
                      <Link href="#">Thẻ RFID</Link>
                    </li>
                    <li className="px-4 py-2  hover:bg-blue-200">
                      <Link href="#">Dịch vụ - sự kiện</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-blue-200">
                      <Link href="#">Bảo hiểm Trip Care</Link>
                    </li>
                  </ul>
                )}
              </li>

              <li className="px-8 py-4 text-lg font-medium hover:bg-blue-300 duration-300">
                <div>
                  <Link href="#">Danh sách trạm</Link>
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
            <div className="flex  gap-2">
              {" "}
              <button
                className="text-blue-400 py-2 px-2
             border-blue-400 border-solid border-1
              rounded-2xl text-center box-border 
              self-center cursor-pointer hover:bg-blue-500 hover:text-white duration-300"
              >
                Đăng nhập
              </button>
              <Image
                src={icon}
                alt="icon"
                width={25}
                height={25}
                className="self-center cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <div></div>
    </>
  );
};

export default Header;
