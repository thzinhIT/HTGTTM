import React from "react";
import Link from "next/link";
const PrimarySecutity = () => {
  return (
    <>
      <div className="w-[1320px] mx-auto">
        <div className="mt-2  text-justify">
          <div className="">
            {" "}
            <h2 className="mb-10 text-4xl font-semibold mt-12">
              Chính sách bảo mật
            </h2>
          </div>

          {/* phần 1 */}
          <div>
            <div className="relative mt-10 ">
              <div className="w-14 h-14 border-2 border-blue-700 rotate-45 flex items-center justify-center absolute z-10 bg-white -top-1 -left-0.5">
                <p className="-rotate-45 text-blue-700 font-bold text-lg">1</p>
              </div>
              <div className="bg-blue-200 rounded-2xl pl-20  ">
                {" "}
                <h2 className="  text-xl pt-2 pb-3 text-blue-700 uppercase font-semibold">
                  giới thiệu
                </h2>
              </div>
            </div>
            <div className="mt-8 mb-20 px-15">
              <p className="text-lg mb-4">
                Chúng tôi cam kết bảo vệ quyền riêng tư của bạn. Chính sách bảo
                mật này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ
                thông tin cá nhân của bạn khi bạn dùng ứng dụng của chúng tôi.
              </p>
            </div>
          </div>
          {/* phần 2 */}
          <div>
            <div className="relative mt-10  ">
              <div className="w-14 h-14 border-2 border-blue-700 rotate-45 flex items-center justify-center absolute z-10 bg-white -top-1 -left-0.5">
                <p className="-rotate-45 text-blue-700 font-bold text-lg">2</p>
              </div>
              <div className="bg-blue-200 rounded-2xl pl-20  ">
                {" "}
                <h2 className="  text-xl pt-2 pb-3 text-blue-700 uppercase font-semibold">
                  dữ liệu chúng tôi thu thập
                </h2>
              </div>
            </div>
            <div className="mt-8 px-15 mb-20">
              <p className="text-lg mb-4 ">
                Chúng tôi có thể thu thập các loại thông tin sau từ người dùng:
              </p>
              <p className="text-lg mb-4">
                - Thông tin cá nhân: Tên, địa chỉ email, số điện thoại,giấy tờ
                tùy thân (CCCD, Hộ chiếu, Thẻ Sinh Viên – còn hạn)
              </p>
              <p className="text-lg mb-4">
                - Dữ liệu thiết bị: Địa chỉ IP, hệ điều hành, loại trình duyệt,
                và thông tin kết nối.
              </p>
              <p className="text-lg mb-4">
                - Dữ liệu vị trí: Nếu người dùng cho phép, chúng tôi có thể thu
                thập dữ liệu vị trí để cải thiện dịch vụ.
              </p>
            </div>
          </div>
          {/* phần 3 */}
          <div>
            <div className="relative mt-10 ">
              <div className="w-14 h-14 border-2 border-blue-700 rotate-45 flex items-center justify-center absolute z-10 bg-white -top-1 -left-0.5">
                <p className="-rotate-45 text-blue-700 font-bold text-lg">3</p>
              </div>
              <div className="bg-blue-200 rounded-2xl pl-20  ">
                {" "}
                <h2 className="  text-xl pt-2 pb-3 text-blue-700 uppercase font-semibold">
                  cách chúng tôi sử dụng dữ liệu
                </h2>
              </div>
            </div>
            <div className="mt-8 px-15 mb-20">
              <p className="text-lg mb-4">
                Thông tin của bạn sẽ được sử dụng cho các mục đích sau:
              </p>
              <p className="text-lg mb-4">- Cung cấp và duy trì ứng dụng.</p>
              <p className="text-lg mb-4">
                - Cải thiện trải nghiệm người dùng.
              </p>
              <p className="text-lg mb-4">
                - Tìm kiếm các trạm gần bạn, thuận tiện di chuyển.
              </p>

              <p className="text-lg mb-4">
                - Gửi thông báo về cập nhật hoặc thay đổi trong ứng dụng.
              </p>
              <p className="text-lg mb-4">
                - Phân tích và phát triển dịch vụ mới.
              </p>
              <p className="text-lg mb-4">
                - Đảm bảo tuân thủ pháp luật hiện hành.
              </p>
            </div>
          </div>
          {/* phần 4 */}
          <div>
            <div className="relative mt-10 ">
              <div className="w-14 h-14 border-2 border-blue-700 rotate-45 flex items-center justify-center absolute z-10 bg-white -top-1 -left-0.5">
                <p className="-rotate-45 text-blue-700 font-bold text-lg">4</p>
              </div>
              <div className="bg-blue-200 rounded-2xl pl-20  ">
                {" "}
                <h2 className="  text-xl pt-2 pb-3 text-blue-700 uppercase font-semibold">
                  chia sẻ thông tin
                </h2>
              </div>
            </div>
            <div className="mt-8 px-15 mb-20">
              <p className="text-lg mb-4 ">
                Chúng tôi không bán hoặc chia sẻ thông tin cá nhân của bạn với
                các bên thứ ba, trừ khi:
              </p>

              <p className="text-lg mb-4">- Bạn đồng ý rõ ràng.</p>

              <p className="text-lg mb-4">
                - Theo yêu cầu pháp lý hoặc để bảo vệ quyền lợi hợp pháp của
                chúng tôi.
              </p>

              <p className="text-lg mb-4">
                - Khi cần thiết để cung cấp dịch vụ (chẳng hạn như dịch vụ đám
                mây).
              </p>
            </div>
          </div>
          {/* phần 5 */}
          <div>
            <div className="relative mt-10 ">
              <div className="w-14 h-14 border-2 border-blue-700 rotate-45 flex items-center justify-center absolute z-10 bg-white -top-1 -left-0.5">
                <p className="-rotate-45 text-blue-700 font-bold text-lg">5</p>
              </div>
              <div className="bg-blue-200 rounded-2xl pl-20  ">
                {" "}
                <h2 className="  text-xl pt-2 pb-3 text-blue-700 uppercase font-semibold">
                  Quyền truy cập và api sử dụng thông tin nhạy cảm
                </h2>
              </div>
            </div>
            <div className="mt-8 px-15 mb-20">
              <p className="text-lg mb-4">
                Ứng dụng của chúng tôi có thể yêu cầu quyền truy cập vào các
                tính năng và thông tin nhạy cảm của thiết bị như:
              </p>

              <p className="text-lg mb-4">
                - <b> Vị trí :</b>
                Sử dụng để cung cấp các tính năng dựa trên vị trí.
              </p>

              <p className="text-lg mb-4">
                - <b>Camera và Micro : </b> Dùng để chụp ảnh hoặc ghi âm, nếu
                cần thiết.
              </p>

              <p className="text-lg mb-4">
                - <b>Thông tin thiết bị : </b> Để phân tích và cải thiện ứng
                dụng.
              </p>

              <p className="text-lg mb-4">
                - Mọi quyền truy cập này sẽ được thông báo rõ ràng và yêu cầu sự
                đồng ý của bạn trước khi thực hiện.
              </p>
            </div>
          </div>
          {/* phần 6 */}
          <div>
            <div className="relative mt-10 ">
              <div className="w-14 h-14 border-2 border-blue-700 rotate-45 flex items-center justify-center absolute z-10 bg-white -top-1 -left-0.5">
                <p className="-rotate-45 text-blue-700 font-bold text-lg">6</p>
              </div>
              <div className="bg-blue-200 rounded-2xl pl-20  ">
                {" "}
                <h2 className="  text-xl pt-2 pb-3 text-blue-700 uppercase font-semibold">
                  bảo mật thông tin
                </h2>
              </div>
            </div>
            <div className="mt-8 px-15 mb-20">
              <p className="text-lg mb-4">
                Chúng tôi sử dụng các biện pháp bảo mật hợp lý về kỹ thuật và tổ
                chức để bảo vệ thông tin cá nhân của bạn khỏi truy cập, sử dụng
                hoặc tiết lộ trái phép. Tuy nhiên, không có hệ thống nào có thể
                đảm bảo an toàn tuyệt đối, và chúng tôi không chịu trách nhiệm
                đối với các sự cố bảo mật ngoài ý muốn.
              </p>
            </div>
          </div>
          {/* phần 7 */}
          <div>
            <div className="relative mt-10 ">
              <div className="w-14 h-14 border-2 border-blue-700 rotate-45 flex items-center justify-center absolute z-10 bg-white -top-1 -left-0.5">
                <p className="-rotate-45 text-blue-700 font-bold text-lg">7</p>
              </div>
              <div className="bg-blue-200 rounded-2xl pl-20  ">
                {" "}
                <h2 className="  text-xl pt-2 pb-3 text-blue-700 uppercase font-semibold">
                  lạm dụng thiết bị và mạng
                </h2>
              </div>
            </div>
            <div className="mt-8 px-15 mb-20">
              <p className="text-lg mb-4">
                Ứng dụng không được phép lạm dụng tài nguyên của thiết bị hoặc
                mạng:
              </p>

              <p className="text-lg mb-4">
                - Sử dụng pin hoặc băng thông quá mức mà không có sự đồng ý của
                người dùng.
              </p>
              <p className="text-lg mb-4">
                - Ứng dụng không được phép thực hiện các hành vi gian lận, spam
                hoặc làm hỏng hệ thống.
              </p>
              <p className="text-lg mb-4">
                - Không chứa bất kỳ mã độc hại nào có thể gây hại cho thiết bị
                hoặc dữ liệu của người dùng.
              </p>
            </div>
          </div>
          {/* phần 8 */}
          <div>
            <div className="relative mt-10 ">
              <div className="w-14 h-14 border-2 border-blue-700 rotate-45 flex items-center justify-center absolute z-10 bg-white -top-1 -left-0.5">
                <p className="-rotate-45 text-blue-700 font-bold text-lg">8</p>
              </div>
              <div className="bg-blue-200 rounded-2xl pl-20  ">
                {" "}
                <h2 className="  text-xl pt-2 pb-3 text-blue-700 uppercase font-semibold">
                  hành vi lừa dối và trình báo sai lệch
                </h2>
              </div>
            </div>
            <div className="mt-8 px-15 mb-20">
              <p className="text-lg mb-4">
                Ứng dụng không được phép cung cấp thông tin sai lệch hoặc đánh
                lừa người dùng về tính năng hoặc chức năng của nó. Chúng tôi cam
                kết minh bạch về mục đích và cách hoạt động của ứng dụng.
              </p>
            </div>
          </div>
          {/* phần 9 */}
          <div className="mb-10">
            <div className="relative mt-10 ">
              <div className="w-14 h-14 border-2 border-blue-700 rotate-45 flex items-center justify-center absolute z-10 bg-white -top-1 -left-0.5">
                <p className="-rotate-45 text-blue-700 font-bold text-lg">9</p>
              </div>
              <div className="bg-blue-200 rounded-2xl pl-20  ">
                {" "}
                <h2 className="  text-xl pt-2 pb-3 text-blue-700 uppercase font-semibold">
                  tuân thủ chính sách và mục tiên api của google
                </h2>
              </div>
            </div>
            <div className="mt-8 px-15 mb-20 ">
              <p className="text-lg mb-4">
                Chúng tôi đảm bảo rằng ứng dụng luôn nhắm đến cấp độ API mới
                nhất theo yêu cầu của Google Play. Điều này đảm bảo ứng dụng của
                chúng tôi tuân thủ các tiêu chuẩn bảo mật và hiệu suất mới nhất
                của hệ điều hành Android.
              </p>
            </div>
          </div>
          {/* phần 10 */}
          <div className="mb-10">
            <div className="relative mt-10 ">
              <div className="w-14 h-14 border-2 border-blue-700 rotate-45 flex items-center justify-center absolute z-10 bg-white -top-1 -left-0.5">
                <p className="-rotate-45 text-blue-700 font-bold text-lg">10</p>
              </div>
              <div className="bg-blue-200 rounded-2xl pl-20  ">
                {" "}
                <h2 className="  text-xl pt-2 pb-3 text-blue-700 uppercase font-semibold">
                  Liên hệ
                </h2>
              </div>
            </div>
            <div className="mt-8 px-15 mb-20 ">
              <p className="text-lg mb-4">
                Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, vui
                lòng liên hệ với chúng tôi qua email:{" "}
                <Link
                  className="text-blue-700"
                  href={"https://mail.google.com/"}
                >
                  vinhthanhnguyen1212200@gmail.com
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default PrimarySecutity;
