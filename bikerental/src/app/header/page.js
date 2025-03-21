import React from "react";
import Image from "next/image";
import logo from "../../../public/assets/img/logo-vn.jpg";
import icon from "../../../public/assets/img/vi.png";
import Link from "next/link";
const Header = () => {
  return (
    <>
      <div className=" ">
        <div className="flex justify-between items-center py-5 gap-2 fixed  left-0 top-0 z-50 bg-white w-full shadow-[0px_2px_4px_0px_#b6b6b680] ">
          <div className="flex-shirk-0 pl-5">
            <Image src={logo} alt="logo" width={152} height={70} />
          </div>
          <div className="flex justify-end flex-wrap pl-5">
            <ul className="flex  items-center flex-wrap justify-end ">
              <li className="px-8 py-4 text-lg font-medium hover:bg-blue-300 duration-300">
                <div>
                  <Link href="#"> Hướng dẫn sử dụng</Link>
                </div>
              </li>
              <li className="px-8 py-4 text-lg font-medium hover:bg-blue-300 duration-300">
                <div>
                  <Link href="#"> Bảng giá</Link>
                </div>
              </li>
              <li className="px-8 py-4 text-lg font-medium hover:bg-blue-300 duration-300">
                <div>
                  <Link href="#">Dịch vụ</Link>
                </div>
              </li>
              <li className="px-8 py-4 text-lg font-medium hover:bg-blue-300 duration-300">
                <div>
                  <Link href="#">Danh sách trạm</Link>
                </div>
              </li>
              <li className="px-8 py-4 text-lg font-medium hover:bg-blue-300 duration-300">
                <div>
                  <Link href="#">Tin tức </Link>
                </div>
              </li>
              <li className="px-8 py-4 text-lg font-medium hover:bg-blue-300 duration-300">
                <div>
                  <Link href="#">Liên hệ</Link>
                </div>
              </li>
              <li className="px-8 py-4 text-lg font-medium hover:bg-blue-300 duration-300">
                <div>
                  <Link href="#">Chính sách bảo mật</Link>
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
                width={35}
                height={35}
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
