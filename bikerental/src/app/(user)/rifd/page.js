"use client";
import useFetchGetData from "@/hooks/useFecthGetData";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import usePostData from "@/hooks/useFetchPostData";
import { AlertPayment } from "@/components/Alertpayment";
import LoadingPage from "@/components/loading-page";
import formatMoney from "@/components/format-money";
const Rifd = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cards, setCards] = useState();
  const [token, setToken] = useState();
  const [id, setId] = useState();
  const [dataCard, setDataCard] = useState();
  const [openAlert, setOpenAlert] = useState(false);
  const [postUrl, setPostUrl] = useState(``);
  const [name, setName] = useState("");

  const [image, setImage] = useState([
    {
      img: "https://tngo.vn/image/Rectangle%20669.jpg",
    },
    {
      img: "https://tngo.vn/image/Rectangle%20670.jpg",
    },
    {
      img: "https://tngo.vn/image/Rectangle%20671.jpg",
    },
  ]);

  const params = useSearchParams();
  const loginSuccess = params.get("loginSuccess");
  console.log(loginSuccess);

  const { data, loading, error } = useFetchGetData(
    "http://localhost:3000/api/auth/card/getCards?page=1"
  );

  const { postData, response } = usePostData();
  useEffect(() => {
    if (id) {
    }
  }, []);

  const handleOnClickId = (item) => {
    setName(item.loai_the);
    setOpenAlert(true);
    setId(item.the_id);
    console.log("id", id);

    console.log("item", postUrl);
  };
  useEffect(() => {
    if (id) {
      setPostUrl(`http://localhost:3000/api/auth/payment-card?theId=${id}`);
    }
  }, [id]);

  useEffect(() => {
    const tokenStorage = localStorage.getItem("token");
    setToken(tokenStorage);
  }, [loginSuccess]);

  useEffect(() => {
    if (data) {
      setCards(data?.cards);
    }
  }, [data]);

  useEffect(() => {
    setIsOpen(true);
  }, [cards]);

  return (
    <>
      <div>
        {" "}
        <div className="min-h-[400px] relative  bg-black">
          <Image
            src={"https://tngo.vn/image/banner-rank.png"}
            alt="ảnh"
            fill
            objectFit="cover"
            className="opacity-50"
          />
          <div className="absolute top-1/2 left-1/2 text-center -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-4xl text-white font-bold  ">
              Thẻ RFID định danh
            </h2>
          </div>
        </div>
        <div className="w-[1320px] mx-auto">
          {/* list thẻ */}
          <div className="flex flex-wrap justify-between mb-16 mt-5">
            {" "}
            {isOpen && cards?.length > 0 ? (
              cards.map((card, index) => {
                return (
                  <React.Fragment key={index}>
                    {" "}
                    <div className="w-[31%] flex flex-col gap-3 justify-between">
                      <h2 className="text-2xl font-semibold">
                        {card.loai_the}
                      </h2>
                      <div className="w-full min-h-[236px] h-auto relative">
                        <Image
                          src={card.img}
                          alt="ảnh"
                          fill
                          objectFit="cover"
                        />
                      </div>
                      <div className="text-[17px]">
                        <p className="">
                          ✅ Phí mở thẻ{" "}
                          <span className="font-semibold">
                            {formatMoney(card?.phi_kich_hoat) ?? "N/A"} VNĐ
                          </span>
                          , miễn phí mở thẻ lần đầu
                        </p>
                        <p className="">
                          ✅ Số dư tài khoản chính tối thiểu{" "}
                          <span className="font-bold text-red-500">
                            {formatMoney(card?.so_du_toi_thieu) ?? "N/A"}
                          </span>
                          , tặng ngay{" "}
                          <span className="font-bold text-green-600">
                            {formatMoney(card?.diem_thuong) ?? "N/A"}
                          </span>{" "}
                          điểm khuyến mãi đạp xe
                        </p>

                        <p>
                          <span className="font-bold text-blue-600">
                            {formatMoney(card?.so_xe_toi_da) ?? "N/A"}
                          </span>{" "}
                          xe cùng lúc
                        </p>
                      </div>

                      <div className="w-full mt-2">
                        {token ? (
                          <button
                            className="bg-blue-600 text-white w-full py-2 px-4 rounded-lg text-xl cursor-pointer hover:bg-blue-900"
                            onClick={() => handleOnClickId(card)}
                          >
                            Mua thẻ đi bạn ui
                          </button>
                        ) : (
                          <button className="bg-blue-600 text-white w-full py-2 px-4 rounded-lg text-xl cursor-pointer hover:bg-blue-900">
                            Đăng nhập để mua thẻ
                          </button>
                        )}
                      </div>
                    </div>
                    <div></div>
                  </React.Fragment>
                );
              })
            ) : (
              <p>Loading...</p>
            )}
          </div>

          <h2 className="text-3xl font-semibold mb-2">
            Chính sách sử dụng thẻ RFID
          </h2>
          {/* điều khoảng sử dụng */}
          <div className="mt-10 ">
            <div className="flex gap-5 justify-between items-start">
              {" "}
              <div className="mt-2 w-[65%] text-justify">
                <div className="">
                  {" "}
                  <p>
                    Thẻ RFID định danh được liên kết với tài khoản TNGo cho phép
                    khách hàng thuê xe mà không cần sử dụng ứng dụng mobile hay
                    kết nối internet. Một tài khoản có thể mở không giới hạn thẻ
                    RFID, hãy mở thẻ ngay cho người thân để sử dụng dịch vụ xe
                    đạp công cộng một cách tiện lợi và nhanh chóng.
                  </p>
                </div>

                {/* phần 1 */}
                <div>
                  <div className="relative mt-10 ">
                    <div className="w-14 h-14 border-2 border-blue-700 rotate-45 flex items-center justify-center absolute z-10 bg-white -top-1 -left-0.5">
                      <p className="-rotate-45 text-blue-700 font-bold text-lg">
                        1
                      </p>
                    </div>
                    <div className="bg-blue-200 rounded-2xl pl-20  ">
                      {" "}
                      <h2 className="  text-xl pt-2 pb-3 text-blue-700 uppercase font-semibold">
                        Hướng dẫn mở thẻ
                      </h2>
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="text-lg mb-4">
                      - Khách hàng dùng chức năng mở thẻ trên ứng dụng mobile
                      TNGo hoặc trực tiếp trên website. Vui lòng{" "}
                      <strong>Đăng nhập</strong> và chọn chức năng{" "}
                      <strong>"Thẻ của tôi"</strong> để bắt đầu mở thẻ.
                    </p>
                    <p className="text-lg mb-4">
                      - Tài khoản cần <strong>xác thực</strong> để có thể sử
                      dụng chức năng mở thẻ.
                    </p>
                    <p className="text-lg mb-4">
                      - Một tài khoản có thể mở <strong>không giới hạn</strong>{" "}
                      thẻ RFID.
                    </p>
                    <p className="text-lg mb-4">
                      - Khách hàng có thể lựa chọn tùy ý tên in trên thẻ và mẫu
                      thiết kế thẻ.
                    </p>
                    <p className="text-lg mb-4">
                      - Thời gian giao thẻ 07-14 ngày kể từ ngày đăng kí mở thẻ.
                    </p>
                    <p className="text-lg mb-4">
                      - Phí làm thẻ{" "}
                      <strong>không bao gồm phí vận chuyển giao thẻ</strong>,
                      nhân viên CSKH sẽ kiểm tra phí vận chuyển và liên lạc tới
                      khách hàng để xác nhận phí vận chuyển trước khi phát hành
                      thẻ.
                    </p>
                  </div>
                </div>
                {/* phần 2 */}
                <div>
                  <div className="relative mt-10 ">
                    <div className="w-14 h-14 border-2 border-blue-700 rotate-45 flex items-center justify-center absolute z-10 bg-white -top-1 -left-0.5">
                      <p className="-rotate-45 text-blue-700 font-bold text-lg">
                        2
                      </p>
                    </div>
                    <div className="bg-blue-200 rounded-2xl pl-20  ">
                      {" "}
                      <h2 className="  text-xl pt-2 pb-3 text-blue-700 uppercase font-semibold">
                        Hướng dẫn sử dụng
                      </h2>
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="text-lg mb-4">
                      -{" "}
                      <span className="text-red-500 font-semibold">
                        Kích hoạt thẻ:
                      </span>{" "}
                      Khi nhận được thẻ, khách hàng cần{" "}
                      <strong>kích hoạt</strong> thẻ trên ứng dụng mobile hoặc
                      trên website tngo.vn để bắt đầu sử dụng.
                    </p>
                    <p className="text-lg mb-4">
                      -{" "}
                      <span className="text-red-500 font-semibold">
                        Mở khóa:
                      </span>{" "}
                      Chạm thẻ vào <strong>biểu tượng RFID trên khóa</strong>{" "}
                      (có âm thanh báo hiệu) để mở khóa xe.
                    </p>
                    <p className="text-lg mb-4">
                      -{" "}
                      <span className="text-red-500 font-semibold">
                        Trả xe:
                      </span>{" "}
                      Đỗ xe trong trạm, <strong>đóng khóa xe</strong>, chạm thẻ
                      vào <strong>biểu tượng RFID trên khóa</strong> (có âm
                      thanh báo hiệu) trong vòng <strong>30 giây</strong> sau
                      khi đóng khóa xe để kết thúc chuyến đi.
                    </p>
                    <p className="text-lg mb-4">
                      -{" "}
                      <span className="text-red-500 font-semibold">
                        Kiểm tra số dư:
                      </span>{" "}
                      Khách hàng có thể kiểm tra số dư tài khoản (liên kết với
                      thẻ) trên ứng dụng mobile hoặc trên website tngo.vn.
                    </p>
                  </div>
                </div>
                {/* phần 3 */}
                <div>
                  <div className="relative mt-10 ">
                    <div className="w-14 h-14 border-2 border-blue-700 rotate-45 flex items-center justify-center absolute z-10 bg-white -top-1 -left-0.5">
                      <p className="-rotate-45 text-blue-700 font-bold text-lg">
                        3
                      </p>
                    </div>
                    <div className="bg-blue-200 rounded-2xl pl-20  ">
                      {" "}
                      <h2 className="  text-xl pt-2 pb-3 text-blue-700 uppercase font-semibold">
                        Phí dịch vụ thẻ
                      </h2>
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="text-lg mb-4">
                      - Phí dịch vụ thẻ là{" "}
                      <span className="text-red-500 font-semibold">
                        5.000 điểm/thẻ/tháng
                      </span>
                      , trừ vào <strong>tài khoản chính</strong> và trừ vào ngày{" "}
                      <strong>01</strong> hằng tháng.
                    </p>
                    <p className="text-lg mb-4">
                      - Phí dịch vụ được áp dụng kể từ khi khách hàng kích hoạt
                      thẻ.
                    </p>
                    <p className="text-lg mb-4">
                      - Nếu tài khoản quý khách không đủ để duy trì phí dịch vụ,
                      thẻ sẽ{" "}
                      <span className="font-semibold">dừng hoạt động</span>. Khi
                      khách hàng nạp tiền vào tài khoản TNGO, hệ thống sẽ tự
                      động trừ phí và mở lại thẻ.
                    </p>
                    <p className="text-lg mb-4">
                      - Khách hàng có thể hủy thẻ <strong>miễn phí</strong>. Đối
                      với thẻ đầu tiên (được miễn phí làm thẻ), khách hàng hủy
                      thẻ trong vòng <strong>04 tháng</strong> đầu sau khi kích
                      hoạt sẽ bị trừ <strong>20.000đ</strong> phí làm thẻ.
                    </p>
                  </div>
                </div>
                {/* phần 4 */}
                <div>
                  <div className="relative mt-10 ">
                    <div className="w-14 h-14 border-2 border-blue-700 rotate-45 flex items-center justify-center absolute z-10 bg-white -top-1 -left-0.5">
                      <p className="-rotate-45 text-blue-700 font-bold text-lg">
                        4
                      </p>
                    </div>
                    <div className="bg-blue-200 rounded-2xl pl-20  ">
                      {" "}
                      <h2 className="  text-xl pt-2 pb-3 text-blue-700 uppercase font-semibold">
                        phí thuê xe
                      </h2>
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="text-lg mb-4">
                      - Áp dụng giá vé (
                      <strong>vé lượt, vé ngày, vé tháng, vé trả trước</strong>)
                      và các tính năng vé nhóm tương tự như dùng trên ứng dụng
                      mobile.
                    </p>
                    <p className="text-lg mb-4">
                      - Tiền phí thuê xe được trừ vào{" "}
                      <strong>tài khoản TNGo</strong> của chủ thẻ (tài khoản mở
                      thẻ).
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[30%] ">
                <div className="flex flex-col gap-12">
                  {image.length > 0 ? (
                    image.map((item, index) => {
                      return (
                        <div
                          key={index + "vinh"}
                          className="w-full relative  min-h-[550px]"
                        >
                          <Image
                            src={item.img}
                            alt="ảnh"
                            fill
                            objectFit="cover"
                          />
                        </div>
                      );
                    })
                  ) : (
                    <p>lỗi ảnh</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[200px]"></div>
      {id && (
        <AlertPayment
          open={openAlert}
          setOpen={setOpenAlert}
          name={name}
          url={postUrl}
          data={dataCard}
        />
      )}
    </>
  );
};

export default Rifd;
