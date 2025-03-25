import React from "react";
import avatar from "../../../public/assets/img/banner-user-manual.jpg";
import Image from "next/image";
import Howuse from "../how-to-use";
import Content from "./content";
const page = () => {
  return (
    <>
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
        </div>
      </div>

      <div className="w-[1320px] mx-auto my-12 py-12">
        <div className="px-3">
          <div>
            <h2 className="text-5xl mt-16 ">Cách sử dụng</h2>
            <p className="my-8 text-xl">
              Sau khi <span className="text-blue-500">Đăng kí</span>, sử dụng dễ
              dàng với 3 bước:{" "}
              <span className="text-blue-500">Mở khóa - Đi xe - Trả xe</span>
            </p>
            <Howuse />
          </div>

          <div className="mt-20">
            <h2 className="text-4xl font-semibold mb-8">Điều khoản sử dụng</h2>
            <div>
              {/* vế trái */}
              <div>
                <Content />
              </div>
              {/* vế phải */}
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
