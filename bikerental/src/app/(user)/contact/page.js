import React from "react";
import Image from "next/image";
import avatar from "../../../../public/assets/img/banner-contact.jpg";
import FormContact from "./form-contact";
import Link from "next/link";
const Contact = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 2s delay
  return (
    <>
      <div>
        <div className="">
          {" "}
          <div className="min-h-[400px] relative  bg-black">
            <Image
              src={avatar}
              alt="ảnh"
              fill
              objectFit="cover"
              className="opacity-50"
            />
            <div className="absolute top-1/2 left-1/2 text-center -translate-x-1/2 -translate-y-1/2">
              <h2 className="text-4xl text-white font-bold  ">Liên hệ</h2>
            </div>
          </div>
          <div className=" w-[1320px] mx-auto mt-14">
            <div className=" flex gap-5 justify-between mb-16">
              <div className="w-[60%] flex-shrink-0">
                <FormContact />
              </div>
              <div className="bg-blue-300 rounded-xl w[30%] flex-1">
                <div className="p-12 text-[16px] flex flex-col gap-4 mb-2 text-justify">
                  <h3 className="text-center text-2xl font-semibold">
                    Thông tin chung TNGo
                  </h3>
                  <p>
                    Mọi thắc mắc về dịch vụ, hợp tác kinh doanh, truyền thông
                    xin vui lòng liên hệ theo thông tin dưới đây:
                  </p>
                  <p>
                    <b>Hotline hỗ trợ 24/7: </b>
                    <Link
                      href="tel:+84377590393"
                      target="_blank"
                      className="text-blue-700 cursor-pointer"
                    >
                      0377590393
                    </Link>
                  </p>
                  <p>
                    <b>Email:</b>{" "}
                    <Link
                      href={"https://mail.google.com/"}
                      target="_blank"
                      className="text-blue-700 cursor-pointer"
                    >
                      lebinh5112004@gmail.com
                    </Link>
                  </p>
                  <p>
                    <b> Website:</b>{" "}
                    <Link
                      href={"/"}
                      target="_blank"
                      className="text-blue-700 cursor-pointer"
                    >
                      www.tngo.vn
                    </Link>
                  </p>
                  <p>
                    <b>Facebook:</b>{" "}
                    <Link
                      href={"https://www.facebook.com/tngo.vn"}
                      target="_blank"
                      className="text-blue-700 cursor-pointer"
                    >
                      tngo.vn
                    </Link>{" "}
                  </p>
                  <p>
                    <b> Liên hệ quảng cáo : </b>
                    0974 222 790 - Alice Nguyễn (khu vực TP. Hồ Chí Minh, TP.
                    Vũng Tàu, TP. Đà Nẵng)
                  </p>
                  <p className="">
                    Dịch vụ xe đạp công cộng TNGo - Một sản phẩm của Tập đoàn
                    Nhóm 4
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Contact;
