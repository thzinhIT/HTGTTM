"use client";
import React from "react";
import Data from "../../../../public/assets/data/mock-data";
import avatar from "../../../../public/assets/img/banner-news (1).jpg";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FaFacebook } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { CiCalendarDate } from "react-icons/ci";

const Detail = () => {
  const param = useParams();
  const id = param.id;
  const currentitem = Data.filter((item) => item.id === Number(id));
  const solution = currentitem[0];

  console.log("check mảng hiện tại", solution, id);
  return (
    <>
      <div className="min-h-[400px] relative  bg-black">
        <Image
          src={avatar}
          alt="ảnh"
          fill
          objectFit="cover"
          className="opacity-50"
        />
        <div className="absolute top-1/2 left-1/2 text-center -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-4xl text-white font-bold  ">{solution.title}</h2>
        </div>
      </div>
      <div className="w-[1320px] mx-auto py-12 px-3 my-12 ">
        <div className="flex items-start ">
          {/* logo */}
          <div className="flex flex-col gap-5 text-2xl text-blue-500 justify-center cursor-pointer w-[10%] items-center">
            <FaFacebook />
            <SiGmail />
            <FaInstagram />
            <SiZalo className="text-4xl" />
          </div>

          <div className="w-[60%] px-3 border-r-1">
            {/* header và date */}

            <div className="gap-2 items-center justify-end flex ml-auto  ">
              <div className="">
                <CiCalendarDate />
              </div>
              <p className="">{solution.date}</p>
            </div>
            <div
              className="mb-8 font-semibold"
              dangerouslySetInnerHTML={{ __html: solution.header }}
            />

            {/* img */}
            <div className="w-full min-h-[425px] h-auto relative mb-7">
              <Image src={solution.img} alt="ảnh" fill />
            </div>

            {/* phần content */}
            <div dangerouslySetInnerHTML={{ __html: solution.content }} />

            {/* phần thông tin liên hệ */}
            <div>
              <span>------------------------------------------------</span>
              <p>Thông tin liên hệ</p>
              <p>
                Số điện thoại :{" "}
                <Link
                  href="tel:+84377590393"
                  target="_blank"
                  className="text-blue-700 cursor-pointer"
                >
                  0377590393
                </Link>
              </p>
              <p>
                Email:{" "}
                <Link
                  href={"https://mail.google.com/"}
                  target="_blank"
                  className="text-blue-700 cursor-pointer"
                >
                  lebinh5112004@gmail.com
                </Link>
              </p>
            </div>

            {/* xem thêm */}
            <div className="mt-10">
              <h3 className="text-2xl font-semibold">Xem thêm</h3>

              <div className="flex gap-5">
                <div className="w-[35%] min-h-[130px] h-auto relative">
                  {Number(id) === 1 ? (
                    <Image src={Data[2].img} alt="ảnh" fill />
                  ) : (
                    <Image src={Data[1].img} alt="ảnh" fill />
                  )}
                </div>

                <div className="">
                  <p className="text-2xl mb-2">{solution.title}</p>
                  <p className="">{solution.header}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[30%]"></div>
        </div>
        <div className="h-[10000px]"></div>
      </div>
      <div></div>
    </>
  );
};

export default Detail;
