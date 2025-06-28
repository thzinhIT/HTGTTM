import Image from "next/image";

import Slider from "@/components/silder/page";

import * as React from "react";

import Howuse from "./how-to-use";
import TransactionTable from "./transaction-table";
import News from "./news";
import Moment from "./moment";
export default function Home() {
  return (
    <>
      <Slider />

      <div className=" flex flex-col items-center  w-[1320px] mx-auto mt-10">
        {/* Hàng đầu tiên: Giới thiệu + Video */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          {/* Phần giới thiệu văn bản */}
          <div className="md:w-1/2 text-left">
            <h2 className="text-4xl font-bold mb-7">Giới thiệu về TNGo</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-lg">
              Dịch vụ xe đạp công cộng TNGo (TN-Go) đem đến một hình thức giao
              thông đô thị mới văn minh, tiện lợi, tốt cho sức khỏe và thân
              thiện với môi trường. Chỉ với vài thao tác đơn giản trên ứng dụng
              di động, người tham gia giao thông có thể dễ dàng thuê xe, di
              chuyển và trả xe tại các trạm xe đạp TNGo bất kỳ trên địa bàn
              thành phố. TNGo sẽ giúp kết nối các hệ thống giao thông công cộng
              khác như xe buýt, tàu điện... giúp việc di chuyển trong đô thị trở
              nên linh hoạt và thuận tiện hơn.
            </p>
            <p className="font-bold">
              Dịch vụ xe đạp công cộng TNGo hiện đã có mặt tại 06 Tỉnh, Thành
              phố:
              <span className="text-black">
                {" "}
                TP. Hà Nội, Hải Phòng, Đà Nẵng, Quy Nhơn, Vũng Tàu, Hồ Chí Minh.
              </span>
            </p>
          </div>

          {/* Phần Video */}
          <div className="md:w-1/2 flex justify-center">
            <iframe
              title="TNGo Introduction Video"
              className="w-full md:w-[500px] h-[280px] rounded-xl shadow-lg"
              src="https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=826310328960933"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Hàng thứ hai: Hình ảnh điện thoại + QR + App Store */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full mt-16">
          {/* Hình ảnh điện thoại */}
          <div className="md:w-1/3 flex ">
            <img
              src="https://tngo.vn/image/dapp.jpg"
              alt="App Preview"
              className="rounded-lg shadow-md"
            />
          </div>

          {/* QR Code + Rating */}
          <div className="md:w-1/3 text-center p-5 justify-center">
            <div className="">
              {" "}
              <Image
                src="https://tngo.vn/image/onlink_to_tngo.svg"
                alt="QR Code"
                className="mx-auto p-2 bg-pink-100 rounded-lg"
                width={150}
                height={150}
              />
            </div>

            <div className="flex justify-center my-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-500 text-3xl">
                  ★
                </span>
              ))}
            </div>
            <p className="text-gray-600 font-medium">
              Hơn <span className="font-bold">20K</span> lượt đánh giá tích cực,
              đạt <span className="font-bold"> 4.8/5</span>
              sao trên các kho ứng dụng iOS và Android!
            </p>
          </div>

          {/* App Store & Google Play */}
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="flex flex-col gap-4">
              <img
                src="https://tngo.vn/image/app-ios.png"
                alt="App Store"
                className="rounded-md shadow-sm"
                width={200}
              />
              <img
                src="https://tngo.vn/image/app-android.png"
                alt="Google Play"
                className="rounded-md shadow-sm"
                width={200}
              />
            </div>
            <p className="text-blue-600 font-bold text-3xl mt-10">
              4,6 triệu +
            </p>
            <p className="text-gray-500">Số Km khách hàng đã đi</p>
          </div>
        </div>
      </div>

      {/* khối thức 2 */}
      <div className=" w-[1320px] mx-auto mt-36">
        <div className="pl-6">
          <h2 className="text-5xl mt-16 ">Cách sử dụng</h2>
          <p className="my-8 text-xl">
            Sau khi <span className="text-blue-500">Đăng kí</span>, sử dụng dễ
            dàng với 3 bước:{" "}
            <span className="text-blue-500">Mở khóa - Đi xe - Trả xe</span>
          </p>
        </div>
        <Howuse />
      </div>

      <div className=" mt-20">
        <TransactionTable />
      </div>
      <div className="py-12 w-[1320px] mx-auto mb-12 ">
        <div>
          <h2 className="text-center text-5xl font-semibold mb-6">
            Những con số biết nói
          </h2>
        </div>
        <div className="flex">
          <div className="text-center w-[33%]">
            <div className="text-green-500 text-6xl font-semibold mb-3">06</div>
            <div className="text-2xl text-black">Tỉnh/Thành phố</div>
          </div>
          <div className="text-center w-[33%]">
            <div className="text-green-500 text-6xl font-semibold mb-3">
              3500+
            </div>
            <div className="text-2xl text-black">Xe đạp trên toàn quốc</div>
          </div>
          <div className="text-center w-[33%]">
            <div className="text-green-500 text-6xl font-semibold mb-3">
              600,000+
            </div>
            <div className="text-2xl text-black">Số Km khách hàng đã đi</div>
          </div>
        </div>
      </div>
      <News />
      <Moment />
    </>
  );
}
