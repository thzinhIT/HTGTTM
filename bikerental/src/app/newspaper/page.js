import React from "react";
import Image from "next/image";
import avatar from "../../../public/assets/img/banner-news (1).jpg";

import Link from "next/link";
const Newspaper = () => {
  return (
    <>
      <div>
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
            <h2 className="text-4xl text-white font-bold  ">Tin tức</h2>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Newspaper;
