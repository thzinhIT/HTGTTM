"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import user1 from "../../../public/assets/img/use-1.png";
import user2 from "../../../public/assets/img/use-2.png";
import user3 from "../../../public/assets/img/use-3.png";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
const Howuse = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState([
    {
      title: "Mở khóa",
      content:
        "Chạm vào nút 'Mở khóa' và quét mã QR trên xe đạp/khóa xe để tự động mở khóa.",
    },
    {
      title: "Đi xe",
      content:
        "Tận hưởng chuyến đi, nên đội mũ bảo hiểm và tuân thủ luật giao thông.",
    },
    {
      title: "Trả xe",
      content:
        "Trả xe về trạm bất kỳ và xác nhận kết thúc chuyến đi trên ứng dụng.",
    },
  ]);
  const [img, setImg] = useState([user1, user2, user3]);
  const [currentImg, setCurrentImg] = useState(img[0]);

  const handleOnClickBtn = (index) => {
    setCurrentImg(img[index]);
    setActiveStep(index);
  };
  useEffect(() => {
    console.log("Ảnh hiện tại đã thay đổi:", currentImg);
  }, [currentImg]);
  return (
    <>
      <div className="flex gap-10 items-center">
        {" "}
        <div className="bg-gray-100 w-[600px] h-[600px] rounded-[50%] ml-20 mt-[50px] ">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 100 }} // Bắt đầu từ phải
              animate={{ opacity: 1, x: 0 }} // Trượt vào chính giữa
              exit={{ opacity: 0, x: -100 }} // Trượt ra bên trái
              transition={{ duration: 0.15 }}
              className="relative w-[700px] h-[550px] top-30 -left-20"
            >
              <Image
                src={img[activeStep]}
                alt={`Hình ${activeStep + 1}`}
                fill
                className="relative" // Giữ nguyên kích thước, không cắt ảnh
              />
            </motion.div>
          </AnimatePresence>
          {/* <div className="relative w-[700px] h-[550px] top-30 -left-20">
            <Image src={currentImg} alt="ảnh 1" fill className="relative  " />
          </div> */}
        </div>
        <div className="flex flex-col gap-8 ">
          {data.length !== 0 &&
            data.map((item, index) => {
              return (
                <div key={index} className="flex gap-10 items-center">
                  <div>
                    <button
                      className=" w-16 h-16 rounded-[50%]
                     bg-gray-900 flex justify-center items-center 
                      text-white text-xl hover:cursor-pointer
                       hover:bg-blue-500 focus:bg-blue-500"
                      onClick={() => handleOnClickBtn(index)}
                    >
                      {" "}
                      {index + 1}
                    </button>
                  </div>
                  <div>
                    <h2 className="font-bold text-2xl">{item.title}</h2>
                    <p className="text-xl">{item.content}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div></div>
    </>
  );
};

export default Howuse;
