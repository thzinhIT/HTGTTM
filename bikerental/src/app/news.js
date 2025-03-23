"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const News = () => {
  const [data, setData] = useState([
    {
      logo: "https://tngo.vn/Data/Logo-NhanDan%20(3).png",
      img: "https://tngo.vn/Data/edit-16-16941651063501736088332.png",
      title: "Sớm nhân rộng mô hình xe đạp công cộng  ",
    },
    {
      logo: "https://tngo.vn/Data/Vietnam_Television_logo_from_2013.svg.png",
      img: "https://tngo.vn/Data/edit-dsc9573-16941650235121652833945.png",
      title: "Dịch vụ xe đạp công cộng bắt đầu được triển khai tại Hà Nội",
    },
    {
      logo: "https://tngo.vn/Data/quoc-huy2.png",
      img: "https://tngo.vn/Data/img5981-16989010362041891008993.jpg",
      title:
        "Thủ tướng Phạm Minh Chính và Thủ tướng Hà Lan cùng đạp xe TNGo dạo phố Hà Nội",
    },
    {
      logo: "https://tngo.vn/Data/Logo-bao-tuoi-tre.png",
      img: "https://tngo.vn/Data/Gioi%20tre%20.jpg",
      title: "Giới trẻ háo hức trải nghiệm dịch vụ đạp xe công cộng",
    },
    {
      logo: "https://tngo.vn/Data/15.png",
      img: "https://tngo.vn/Data/w-xe-dap1-1-1081.jpg",
      title: "Chiếc xe đạp Thủ tướng Hà Lan đi trên phố Hà Nội có gì đặc biệt",
    },
    {
      logo: "https://tngo.vn/Data/Logoantv.png",
      img: "https://tngo.vn/Data/anh-bai-nho-trang-7-xe-dap-dien.jpeg",
      title: "Xe đạp công cộng tăng khả năng kết nối phụ trợ cho giao thông",
    },
    {
      logo: "https://tngo.vn/Data/Logo_VOV.png",
      img: "https://tngo.vn/Data/Anh%20VOV.png",
      title: "Dịch vụ cho thuê xe đạp được giới trẻ Hà Nội yêu thích",
    },
    {
      logo: "https://tngo.vn/Data/logo%20cong%20thuong.png",
      img: "https://tngo.vn/Data/121023.a5.jpg",
      title:
        'Xe đạp công cộng tại Hà Nội và bài toán "dặm cuối" trong hệ thống giao thông',
    },
  ]);
  return (
    <>
      <div className="bg-[#F4F4FA] mb-12 ">
        <div className="w-[1320px] mx-auto py-12">
          <div>
            <h3 className="text-center text-5xl text-black font-semibold mb-12">
              Báo chí nói gì về chúng tôi
            </h3>
          </div>
          <div className="w-[1320px] mx-auto">
            <div className=" flex flex-wrap items-center">
              {" "}
              {data.length > 0 &&
                data.map((item, index) => {
                  return (
                    <div
                      className="flex flex-col w-[25%] px-3 gap-2s"
                      key={index + "vinh"}
                    >
                      <div>
                        {" "}
                        <Image
                          src={item.logo}
                          alt="logo"
                          width={104} // Dù đặt width, nhưng sẽ bị ghi đè bởi style
                          height={40} // Chiều cao cố định
                          style={{
                            width: "auto",
                            height: "40px",
                            objectFit: "contain",
                          }} // Đảm bảo ảnh không bị méo
                          className="mx-auto mb-4 flex-shrink-0"
                        />
                      </div>

                      <Image
                        src={item.img}
                        alt="img"
                        layout="intrinsic"
                        width={306}
                        height={204}
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "contain",
                        }}
                      />
                      <div className="min-h-20">
                        {/* <Link hr>  {item.title}</Link> */}
                        <p className=" text-black pt-2 pb-6 flex-shrink-0">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default News;
