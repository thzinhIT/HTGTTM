import React from "react";

const Content = () => {
  return (
    <>
      <div className="mt-2 w-[70%] text-justify">
        <div className="">
          {" "}
          <p className="mb-4 text-lg ">
            <b>Quan trọng</b> – Chào mừng bạn đến với ứng dụng Dịch vụ xe đạp
            công cộng TNGo và website tngo.vn, xedapchung.vn (sau đây được gọi
            bằng “website”, “trang web”) thuộc sở hữu của Công ty Cổ phần Dịch
            vụ Vận tải số Trí Nam, là một đơn vị thuộc Tập đoàn Trí Nam.
          </p>
          <p className="mb-4 text-lg">
            Ứng dụng TNGo cung cấp dịch vụ chia sẻ xe đạp công cộng tại Việt
            Nam, hiện đang vận hành tại TP Hà Nội, TP Hải Phòng, TP Đà Nẵng, TP
            Quy Nhơn, TP Vũng Tàu, TP Hồ Chí Minh và sẽ tiếp tục mở rộng tới các
            tỉnh thành khác trên cả nước.
          </p>
          <p className="mb-4 text-lg">
            Việc sử dụng ứng dụng và website cũng như các hoạt động mua bán tại
            đây đều phải được thực hiện công khai, minh bạch và đảm bảo quyền
            lợi cho người sử dụng.
          </p>
          <p className="mb-4 text-lg">
            Bằng việc cài đặt và đồng ý truy cập bao gồm đăng nhập, đăng ký ứng
            dụng (bao gồm cả trên website và ứng dụng trên iOS/Android) là đồng
            nghĩa với việc người dùng xác nhận đã <b>đọc, hiểu rõ, cam kết</b>{" "}
            thực hiện đúng các nội dung tại Điều Khoản Sử dụng dịch vụ xe đạp
            công cộng-TNGo này và đồng ý tiếp tục sử dụng Dịch Vụ cũng như Ứng
            Dụng của Chúng tôi.
          </p>
        </div>

        {/* phần 1 */}
        <div>
          <div className="relative  ">
            <div className="w-14 h-14 border-2 border-blue-700 rotate-45 flex items-center justify-center absolute z-10 bg-white -top-1 -left-0.5">
              <p className="-rotate-45 text-blue-700 font-bold text-lg">1</p>
            </div>
            <div className="bg-blue-200 rounded-2xl pl-20  ">
              {" "}
              <h2 className="  text-xl pt-2 pb-3 text-blue-700 uppercase font-semibold">
                Điều khoản chung
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Content;
