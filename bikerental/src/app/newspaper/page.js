"use client";
import React from "react";
import Image from "next/image";
import avatar from "../../../public/assets/img/banner-news (1).jpg";
import Data from "../../../public/assets/data/mock-data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const Newspaper = () => {
  const router = useRouter();
  const handleOnClickItem = (item) => {
    router.push(`/newspaper/${item}`);
  };
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
        <div className="w-[1320px] mx-auto py-12 px-3">
          {Data.length > 0 ? (
            <div className="w-full flex gap-6 flex-wrap">
              {Data.map((item, index) => {
                return (
                  <React.Fragment key={item.id}>
                    {" "}
                    <div
                      className="flex flex-col w-[30%] text-left"
                      onClick={() => handleOnClickItem(item.id)}
                    >
                      <div
                        key={item.id}
                        className="w-full min-h-[235px] h-auto relative py-2 hover:cursor-pointer overflow-hidden "
                      >
                        {item.img ? (
                          <Image
                            src={item.img}
                            alt="ảnh"
                            fill
                            className="hover:scale-110 duration-200"
                          />
                        ) : null}
                      </div>
                      <div className="mt-2 font-semibold">{item.title}</div>
                      <div>
                        <i>{item.date} </i>
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
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div></div>
    </>
  );
};

export default Newspaper;
