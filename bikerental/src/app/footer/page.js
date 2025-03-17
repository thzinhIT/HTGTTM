import React from "react";
import Image from "next/image";
import logo from "../../../public/assets/img/logoft.png";
import icon from "../../../public/assets/img/logoSaleNoti.png";
import { FaPhoneAlt } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { FaFacebook } from "react-icons/fa6";

const Footer = () => {
  const bgImage = "/assets/img/bgft.jpg";
  return (
    <>
      <footer>
        <div
          style={{ backgroundImage: `url(${bgImage})` }}
          className="w-full h-96 bg-cover bg-bottom pt-5 pb-10 mx-auto"
        >
          <div className="w-[1320px] mx-auto px-3">
            {" "}
            <div className="flex justify-center items-center mb-5">
              <p className="text-white text-lg">
                © 2023 TNGo public bicycle - A product of{" "}
                <span className="underline cursor-pointer">4 Group</span>.
              </p>
            </div>
            <div className="">
              <ul className="flex">
                <li className="flex flex-col w-[33%]">
                  <Image src={logo} alt="logo" width={192} height={88} />
                  <div className="text-white mt-2 mb-4 leading-6">
                    Public bicycle - A new type of urban transport that is
                    civilized, convenient, healthy and environmentally friendly.
                  </div>
                  <Image src={icon} alt="icon" width={160} height={60} />
                </li>

                <li className="flex flex-col w-[17%%] text-white gap-6">
                  <h2 className="text-xl">Contact</h2>
                  <div className="flex items-center gap-2">
                    {" "}
                    <FaPhoneAlt />
                    <p className="text-sm">1900 633 548</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {" "}
                    <CgMail className="text-lg " />
                    <p className="text-sm">info@vantaiso.com.vn</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {" "}
                    <FaFacebook />
                    <p className="text-sm">tngo.vn</p>
                  </div>
                </li>
                <li>a</li>
                <li>a</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div></div>
    </>
  );
};

export default Footer;
