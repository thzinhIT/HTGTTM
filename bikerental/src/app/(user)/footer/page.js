import React from "react";
import Image from "next/image";
import logo from "../../../../public/assets/img/logoft.png";
import icon from "../../../../public/assets/img/logoSaleNoti.png";
import { FaPhoneAlt } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { FaFacebook } from "react-icons/fa6";
import ios from "../../../../public/assets/img/app-ios.png";
import android from "../../../../public/assets/img/app-android.png";

const Footer = () => {
  const bgImage = "/assets/img/bgft.jpg";

  return (
    <footer className="w-full  bg-[rgb(0,93,194)]">
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="w-[1420px]  mx-auto min-h-96 bg-bottom bg-no-repeat bg-cover py-5 pb-15"
      >
        <div className="w-[1320px] mx-auto px-3">
          {/* Copyright */}
          <div className="flex justify-center items-center mb-10">
            <p className="text-white text-sm text-center">
              © 2024 Xe đạp công cộng TNGo - Một sản phẩm của{" "}
              <span className="underline cursor-pointer">
                Công ty cổ phần dịch vụ vận tải số Nhóm 4
              </span>
              .
            </p>
          </div>

          {/* Footer Content */}
          <div>
            <ul className="flex  gap-7">
              {/* Cột 1: Giới thiệu */}
              <li className="flex flex-col w-[33%]">
                <Image src={logo} alt="logo" width={192} height={88} />
                <p className="text-white mt-2 mb-4 leading-6 w-[75%]">
                  Xe đạp công cộng - Một loại hình giao thông đô thị mới văn
                  minh, tiện lợi, tốt cho sức khỏe và thân thiện với môi trường.
                </p>
                <Image src={icon} alt="icon" width={160} height={60} />
              </li>

              {/* Cột 2: Liên hệ */}
              <li className="flex flex-col w-[17%] text-white gap-5">
                <h2 className="text-lg font-semibold">Liên hệ</h2>
                <div className="flex items-center gap-2">
                  <FaPhoneAlt />
                  <p className="text-sm">1900 633 548</p>
                </div>
                <div className="flex items-center gap-2">
                  <CgMail className="text-xl" />
                  <p className="text-sm">info@vantaiso.com.vn</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaFacebook />
                  <p className="text-sm">tngo.vn</p>
                </div>
              </li>

              {/* Cột 3: Liên kết nhanh */}
              <li className="flex flex-col w-[17%] text-white gap-5">
                <h2 className="text-lg font-semibold">Liên kết nhanh</h2>
                <p className="text-sm cursor-pointer">Hướng dẫn sử dụng</p>
                <p className="text-sm cursor-pointer">Danh sách trạm</p>
                <p className="text-sm cursor-pointer">Tin tức</p>
                <p className="text-sm cursor-pointer">Liên hệ</p>
              </li>

              {/* Cột 4: Lặp nội dung (có thể xóa hoặc chỉnh sửa) */}
              <li className="flex flex-col w-[17%] text-white gap-5">
                <h2 className="text-lg font-semibold">Khác</h2>
                <p className="text-sm cursor-pointer">Bảng giá</p>
                <p className="text-sm cursor-pointer">Bảng xếp hạng</p>
                <p className="text-sm cursor-pointer">Thẻ RIFD</p>
              </li>

              {/* Cột 5: Tải ứng dụng */}
              <li className="flex flex-col w-[17%] text-white gap-6">
                <h2 className="text-lg font-semibold">Tải ứng dụng</h2>
                <Image src={ios} alt="ios" width={128} height={38} />
                <Image src={android} alt="android" width={128} height={38} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
