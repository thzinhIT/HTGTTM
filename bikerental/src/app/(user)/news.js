"use client";
import React, { useState } from "react";
import Image from "next/image";

const News = () => {
  const [data, setData] = useState([
    {
      logo: "https://tngo.vn/Data/Logo-NhanDan%20(3).png",
      img: "https://tngo.vn/Data/edit-16-16941651063501736088332.png",
      title: "Sớm nhân rộng mô hình xe đạp công cộng",
      link: "https://nhandan.vn/som-nhan-rong-mo-hinh-xe-dap-cong-cong-post767915.html",
    },
    {
      logo: "https://tngo.vn/Data/Vietnam_Television_logo_from_2013.svg.png",
      img: "https://tngo.vn/Data/edit-dsc9573-16941650235121652833945.png",
      title: "Dịch vụ xe đạp công cộng bắt đầu được triển khai tại Hà Nội",
      link: "https://vtv.vn/xa-hoi/dich-vu-xe-dap-cong-cong-bat-dau-duoc-trien-khai-tai-ha-noi-20230814145143205.htm",
    },
    {
      logo: "https://tngo.vn/Data/quoc-huy2.png",
      img: "https://tngo.vn/Data/img5981-16989010362041891008993.jpg",
      title:
        "Thủ tướng Phạm Minh Chính và Thủ tướng Hà Lan cùng đạp xe TNGo dạo phố Hà Nội",
      link: "https://baochinhphu.vn/thu-tuong-pham-minh-chinh-va-thu-tuong-ha-lan-cung-dap-xe-dao-pho-ha-noi-102231102121145119.htm",
    },
    {
      logo: "https://tngo.vn/Data/Logo-bao-tuoi-tre.png",
      img: "https://tngo.vn/Data/Gioi%20tre%20.jpg",
      title: "Giới trẻ háo hức trải nghiệm dịch vụ đạp xe công cộng",
      link: "https://baodanang.vn/channel/5433/202304/gioi-tre-hao-huc-trai-nghiem-dich-vu-dap-xe-cong-cong-3942094/",
    },
    {
      logo: "https://tngo.vn/Data/15.png",
      img: "https://tngo.vn/Data/w-xe-dap1-1-1081.jpg",
      title: "Chiếc xe đạp Thủ tướng Hà Lan đi trên phố Hà Nội có gì đặc biệt",
      link: "https://vietnamnet.vn/chiec-xe-dap-thu-tuong-ha-lan-di-tren-pho-ha-noi-co-gi-dac-biet-2210668.html",
    },
    {
      logo: "https://tngo.vn/Data/Logoantv.png",
      img: "https://tngo.vn/Data/anh-bai-nho-trang-7-xe-dap-dien.jpeg",
      title: "Xe đạp công cộng tăng khả năng kết nối phụ trợ cho giao thông",
      link: "https://antv.gov.vn/xa-hoi-4/xe-dap-cong-cong-tang-kha-nang-ket-noi-va-thu-hut-nguoi-dan-den-voi-vtcc-293EF3CFF.html",
    },
    {
      logo: "https://tngo.vn/Data/Logo_VOV.png",
      img: "https://tngo.vn/Data/Anh%20VOV.png",
      title: "Dịch vụ cho thuê xe đạp được giới trẻ Hà Nội yêu thích",
      link: "https://vov.vn/xa-hoi/dich-vu-cho-thue-xe-dap-duoc-gioi-tre-ha-noi-yeu-thich-post1040932.vov",
    },
    {
      logo: "https://tngo.vn/Data/logo%20cong%20thuong.png",
      img: "https://tngo.vn/Data/121023.a5.jpg",
      title:
        "Xe đạp công cộng tại Hà Nội và bài toán dặm cuối trong hệ thống giao thông",
      link: "https://congthuong.vn/xe-dap-cong-cong-tai-ha-noi-va-bai-toan-dam-cuoi-trong-he-thong-giao-thong-266720.html",
    },
  ]);

  return (
    <div className="bg-[#F4F4FA] mb-12">
      <div className="w-[1320px] mx-auto py-12">
        <h3 className="text-center text-5xl text-black font-semibold mb-12">
          Báo chí nói gì về chúng tôi
        </h3>
        <div className="flex flex-wrap items-center">
          {data.map((item, index) => (
            <div
              className="flex flex-col w-[25%] px-3 gap-2 mb-8"
              key={index} // Sửa key, bỏ "+ vinh"
            >
              {/* Logo báo */}
              <div>
                <Image
                  src={item.logo}
                  alt="logo"
                  width={104}
                  height={40}
                  style={{
                    width: "auto",
                    height: "40px",
                    objectFit: "contain",
                  }}
                  className="mx-auto mb-4 flex-shrink-0"
                />
              </div>

              {/* Ảnh bài báo */}
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <Image
                  src={item.img}
                  alt="img"
                  width={306}
                  height={204}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </a>

              {/* Tiêu đề bài báo */}
              <div className="min-h-20">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black pt-2 pb-6 flex-shrink-0 hover:underline block"
                >
                  {item.title}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
