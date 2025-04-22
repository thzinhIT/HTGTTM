import React from "react";
import Image from "next/image";
import Link from "next/link";
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
    <footer className="w-full bg-[rgb(0,93,194)]">
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="w-[1420px] mx-auto min-h-96 bg-bottom bg-no-repeat bg-cover py-5 pb-15"
      >
        <div className="w-[1320px] mx-auto px-3">
          {/* Copyright */}
          <div className="flex justify-center items-center mb-10">
            <p className="text-white text-sm text-center">
              © 2024 Xe đạp công cộng TNGo - Một sản phẩm của{" "}
              <Link href="/about">
                <span className="underline cursor-pointer">
                  Công ty cổ phần dịch vụ vận tải số Nhóm 4
                </span>
              </Link>
              .
            </p>
          </div>

          {/* Footer Content */}
          <div>
            <ul className="flex gap-7">
              {/* Cột 1: Giới thiệu */}
              <li className="flex flex-col w-[33%]">
                <Link href="/">
                  <Image src={logo} alt="logo" width={192} height={88} />
                </Link>
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
                  <a href="tel:1900633548" className="text-sm">
                    1900 633 548
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <CgMail className="text-xl" />
                  <a href="mailto:info@vantaiso.com.vn" className="text-sm">
                    info@vantaiso.com.vn
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <FaFacebook />
                  <Link href="https://facebook.com/tngo.vn">
                    <p className="text-sm">tngo.vn</p>
                  </Link>
                </div>
              </li>

              {/* Cột 3: Liên kết nhanh */}
              <li className="flex flex-col w-[17%] text-white gap-5">
                <h2 className="text-lg font-semibold">Liên kết nhanh</h2>
                <Link href="/usermanual">
                  <p className="text-sm cursor-pointer">Hướng dẫn sử dụng</p>
                </Link>
                <Link href="/station-list">
                  <p className="text-sm cursor-pointer">Danh sách trạm</p>
                </Link>
                <Link href="/newspaper">
                  <p className="text-sm cursor-pointer">Tin tức</p>
                </Link>
                <Link href="/contact">
                  <p className="text-sm cursor-pointer">Liên hệ</p>
                </Link>
              </li>

              {/* Cột 4: Khác */}
              <li className="flex flex-col w-[17%] text-white gap-5">
                <h2 className="text-lg font-semibold">Khác</h2>
                <Link href="/price">
                  <p className="text-sm cursor-pointer">Bảng giá</p>
                </Link>
                <Link href="/trip-care">
                  <p className="text-sm cursor-pointer">Bảo hiểm Tripcare</p>
                </Link>
                <Link href="/rentbike">
                  <p className="text-sm cursor-pointer">Dịch vụ và sự kiện</p>
                </Link>
                <Link href="/rifd">
                  <p className="text-sm cursor-pointer">Thẻ RIFD</p>
                </Link>
              </li>

              {/* Cột 5: Tải ứng dụng */}
              <li className="flex flex-col w-[17%] text-white gap-6">
                <h2 className="text-lg font-semibold">Tải ứng dụng</h2>
                <Link href="https://www.apple.com/app-store/">
                  <Image src={ios} alt="ios" width={128} height={38} />
                </Link>
                <Link href="https://play.google.com/store">
                  <Image src={android} alt="android" width={128} height={38} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
