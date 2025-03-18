import React from "react";
import Image from "next/image";
import logo from "../../../public/assets/img/logoft.png";
import icon from "../../../public/assets/img/logoSaleNoti.png";
import { FaPhoneAlt } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { FaFacebook } from "react-icons/fa6";
import ios from "../../../public/assets/img/app-ios.png";
import android from "../../../public/assets/img/app-android.png";
const Footer = () => {
  const bgImage = "/assets/img/bgft.jpg";
  return (
    <footer>
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="w-full h-96 bg-cover bg-bottom pt-5 pb-10 mx-auto"
      >
        <div className="w-[1320px] mx-auto px-3 ">
          {" "}
          <div className="flex justify-center items-center mb-10">
            <p className="text-white text-sm">
              © 2024 Xe đạp công cộng TNGo - Một sản phẩm của{" "}
              <span className="underline cursor-pointer">
                {" "}
                Công ty cổ phần dịch vụ vận tải sốNhóm 4
              </span>
              .
            </p>
          </div>
          <div className="">
            <ul className="flex gap-7 ">
              <li className="flex flex-col w-[33%]">
                <Image src={logo} alt="logo" width={192} height={88} />
                <div className="text-white mt-2 mb-4 leading-6 w-[75%]">
                  Xe đạp công cộng - Một loại hình giao thông đô thị mới văn
                  minh, tiện lợi, tốt cho sức khỏe và thân thiện với môi trường.
                </div>
                <Image src={icon} alt="icon" width={160} height={60} />
              </li>

              <li className="flex flex-col w-[17%%] text-white gap-6">
                <h2 className="text-lg">Liên hệ</h2>
                <div className="flex items-center gap-2">
                  {" "}
                  <FaPhoneAlt />
                  <p className="text-sm">1900 633 548</p>
                </div>
                <div className="flex items-center gap-2">
                  {" "}
                  <CgMail className="text-xl " />
                  <p className="text-sm">info@vantaiso.com.vn</p>
                </div>
                <div className="flex items-center gap-2">
                  {" "}
                  <FaFacebook />
                  <p className="text-sm">tngo.vn</p>
                </div>
              </li>
              <li className="flex flex-col  text-white gap-5 ml-4">
                <h2 className="text-xl ">Liên kết nhanh</h2>
                <div className="">
                  {" "}
                  <p className="text-sm">Hướng dẫn sử dung</p>
                </div>
                <div className="">
                  {" "}
                  <p className="text-sm ">Danh sách trạm</p>
                </div>
                <div className="">
                  {" "}
                  <p className="text-sm ">Tin tức</p>
                </div>
                <div className="">
                  {" "}
                  <p className="text-sm ">Liên hê</p>
                </div>
              </li>
              <li className="flex flex-col  text-white gap-6 ml-4 justify-center">
                <div className="">
                  {" "}
                  <p className="text-sm">Hướng dẫn sử dung</p>
                </div>
                <div className="">
                  {" "}
                  <p className="text-sm ">Danh sách trạm</p>
                </div>
                <div className="">
                  {" "}
                  <p className="text-sm ">Tin tức</p>
                </div>
                <div className="">
                  {" "}
                  <p className="text-sm ">Liên hê</p>
                </div>
              </li>
              <li className="flex flex-col  text-white gap-6 ml-4">
                <h2 className="text-xl ">Tải ứng dụng</h2>
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
