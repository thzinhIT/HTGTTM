"use client";
import React, { useState } from "react";
import Image from "next/image";

const Moment = () => {
  const [image, setImg] = useState([
    { img: "https://tngo.vn/Data/Khoang%20khac%20TNGo%20(1).png" },
    { img: "https://tngo.vn/Data/Khoang%20khac%20TNGo%20(11).png" },
    { img: "https://tngo.vn/Data/Khoang%20khac%20TNGo%20(7).png" },
    { img: "https://tngo.vn/Data/Khoang%20khac%20TNGo%20(12).png" },
    { img: "https://tngo.vn/Data/Khoang%20khac%20TNGo%20(4).png" },
    { img: "https://tngo.vn/Data/Khoang%20khac%20TNGo%20(8).png" },
    { img: "https://tngo.vn/image/Rectangle%20628.jpg" },
    { img: "https://tngo.vn/Data/Khoang%20khac%20TNGo%20(9).png" },
    { img: "https://tngo.vn/Data/Khoang%20khac%20TNGo%20(6).png" },
    { img: "https://tngo.vn/image/Rectangle%20632.jpg" },
    { img: "https://tngo.vn/Data/Khoang%20khac%20TNGo%20(10).png" },
    { img: "https://tngo.vn/image/Rectangle%20633.jpg" },
  ]);
  return (
    <>
      <div className="w-[1320px] mx-auto py-12 mb-24">
        <div>
          <h2 className="text-center text-5xl font-semibold mb-24">
            Khoảng khắc TnGO
          </h2>
        </div>
        <div>
          {" "}
          <div className=" flex  flex-wrap gap-5">
            {image.length > 0 ? (
              image.map((item, index) => {
                return (
                  <div
                    className="relative w-[32%] mb-1"
                    style={{
                      height: "auto",
                      minHeight: "260px",
                      maxWidth: "100%",
                    }}
                    key={index + "vinh"}
                  >
                    <Image src={item.img} alt="ảnh" fill objectFit="cover" />
                  </div>
                );
              })
            ) : (
              <div>không có ảnh</div>
            )}
          </div>
        </div>

        <div></div>
      </div>
      <div></div>
    </>
  );
};

export default Moment;
