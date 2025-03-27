"use client";
import React from "react";
import Data from "../../../../public/assets/mock-data/mock-data";
import avatar from "../../../../public/assets/img/banner-news (1).jpg";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FaFacebook } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { CiCalendarDate } from "react-icons/ci";
import { List } from "lucide-react";
import { useRouter } from "next/navigation";
const Detail = () => {
  const param = useParams();
  const id = param.id;
  const currentitem = Data.filter((item) => item.id === Number(id));
  const solution = currentitem[0];
  const listBlog = Data.slice(0, 10);
  const router = useRouter();
  const handleOnClickItem = (item) => {
    router.push(`/newspaper/${item}`);
  };

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
          <div className="flex flex-col gap-3 text-3xl text-blue-500 justify-center cursor-pointer w-[10%] items-center">
            <Link
              href={"https://www.facebook.com/binh.ang.548813?locale=vi_VN"}
            >
              <FaFacebook />
            </Link>
            <Link href={"https://mail.google.com/"}>
              {" "}
              <SiGmail />
            </Link>
            <Link href="tel:+84377590393">
              <SiZalo className="text-5xl" />
            </Link>
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
            <div className="w-full min-h-[480px] h-auto relative mb-7">
              <Image src={solution.img} alt="ảnh" fill objectFit="" />
            </div>

            {/* phần content */}
            <div dangerouslySetInnerHTML={{ __html: solution.content }} />

            {/* phần thông tin liên hệ */}
            <div>
              <span>------------------------------------------------</span>
              <p className="text-xl mb-2">
                {" "}
                <strong>Thông tin liên hệ</strong>
              </p>
              <p>
                <strong>Số điện thoại :</strong>{" "}
                <Link
                  href="tel:+84377590393"
                  target="_blank"
                  className="text-blue-700 cursor-pointer"
                >
                  0377590393
                </Link>
              </p>
              <p>
                <strong>Email:</strong>{" "}
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
              <h3 className="text-2xl font-semibold mb-4">Xem thêm</h3>

              <div className="flex gap-5">
                <div className="w-[35%] min-h-[130px] h-auto relative">
                  {Number(id) === 1 ? (
                    <Image src={Data[1].img} alt="ảnh" fill />
                  ) : (
                    <Image src={Data[0].img} alt="ảnh" fill />
                  )}
                </div>

                <div className="">
                  {Number(id) === 1 ? (
                    <>
                      {" "}
                      <p className="text-2xl mb-2">{Data[1].title}</p>
                      <p className="">{Data[1].header}</p>
                    </>
                  ) : (
                    <>
                      {" "}
                      <p className="text-2xl mb-2">{Data[0].title}</p>
                      <p className="">{Data[0].header}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* bài viết liên quan */}
          <div className="w-[30%] px-3">
            <div>
              <h3 className="text-xl mb-5">Bài viết liên quan</h3>
              <div>
                {listBlog.length > 0 ? (
                  <div className="w-full flex flex-col gap-3 flex-wrap">
                    {listBlog.map((item, index) => {
                      return (
                        <React.Fragment key={item.id}>
                          {" "}
                          <div
                            className="flex gap-4 items-start  text-justify"
                            onClick={() => handleOnClickItem(item.id)}
                          >
                            <div
                              key={item.id}
                              className="w-[40%] min-h-[80px]  relative py-2 hover:cursor-pointer overflow-hidden flex-shrink-0"
                            >
                              {item.img ? (
                                <Image
                                  src={item.img}
                                  alt="ảnh"
                                  fill
                                  className="hover:scale-110 duration-200"
                                  objectFit="cover"
                                />
                              ) : null}
                            </div>
                            <div className="flex flex-col">
                              <div className=" font-semibold line-clamp-2">
                                {item.title}
                              </div>
                              <div>
                                <i>{item.date} </i>
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                ) : (
                  <div> không có tin tức j hết</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Detail;
