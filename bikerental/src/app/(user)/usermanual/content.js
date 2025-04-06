"use client";
import React, { useState } from "react";
import Image from "next/image";
const Content = () => {
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
    {
      img: "https://tngo.vn/image/Rectangle%20673.jpg",
    },
  ]);
  return (
    <>
      {" "}
      <div className="flex gap-5 justify-between items-start">
        {" "}
        <div className="mt-2 w-[65%] text-justify">
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
              Nam, hiện đang vận hành tại TP Hà Nội, TP Hải Phòng, TP Đà Nẵng,
              TP Quy Nhơn, TP Vũng Tàu, TP Hồ Chí Minh và sẽ tiếp tục mở rộng
              tới các tỉnh thành khác trên cả nước.
            </p>
            <p className="mb-4 text-lg">
              Việc sử dụng ứng dụng và website cũng như các hoạt động mua bán
              tại đây đều phải được thực hiện công khai, minh bạch và đảm bảo
              quyền lợi cho người sử dụng.
            </p>
            <p className="mb-4 text-lg">
              Bằng việc cài đặt và đồng ý truy cập bao gồm đăng nhập, đăng ký
              ứng dụng (bao gồm cả trên website và ứng dụng trên iOS/Android) là
              đồng nghĩa với việc người dùng xác nhận đã{" "}
              <b>đọc, hiểu rõ, cam kết</b> thực hiện đúng các nội dung tại Điều
              Khoản Sử dụng dịch vụ xe đạp công cộng-TNGo này và đồng ý tiếp tục
              sử dụng Dịch Vụ cũng như Ứng Dụng của Chúng tôi.
            </p>
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
                  Điều khoản chung
                </h2>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-lg mb-4">
                Điều Khoản này có giá trị hiệu lực như một Thỏa thuận pháp lý
                giữa Công ty Cổ Phần Dịch Vụ Vận Tải Số Trí Nam (Công ty) và
                Khách Hàng khi sử dụng Dịch vụ xe đạp công cộng TNGo ứng dụng
                thuộc sở hữu của Công ty Cổ phần Tập Đoàn Trí Nam giao cho Công
                ty Cổ phần Dịch vụ Vận tải số Trí Nam vận hành và hoạt động theo
                Hợp đồng giao việc số 01/2021/HĐGV ký ngày 15/07/2021 giữa Công
                ty Cổ phần Tập Đoàn Trí Nam với Công ty Cổ phần Dịch Vụ Vận tải
                số Trí Nam.
              </p>
              <p className="text-lg mb-4">
                Bằng việc tải và cài đặt Ứng Dụng do Công Ty cung cấp, Khách
                Hàng đã đọc một cách cẩn thận, hiểu, chấp nhận, tự nguyện đồng ý
                với từng phần, cũng như toàn bộ các quy định được thể hiện tại
                Điều Khoản này và chấp thuận việc sử dụng Dịch vụ xe đạp công
                cộng sẽ được điều chỉnh, ràng buộc bởi Điều Khoản Dịch vụ này và
                mọi quy tắc, thủ tục, điều khoản cụ thể khác đối với Dịch Vụ
                được cung cấp bởi Công Ty.
              </p>
              <p className="text-lg mb-4">
                Tùy theo nhu cầu của Công Ty và phù hợp với Pháp Luật, Công Ty
                bảo lưu quyền được sửa đổi, bổ sung, thay thế một phần hoặc toàn
                bộ Điều Khoản Sử Dụng Dịch Vụ này hoặc các quy định, chính sách
                có liên quan đến Dịch Vụ tại bất kỳ thời điểm nào. Thông qua
                (các) Ứng Dụng và/hoặc các thông tin được cung cấp bởi Khách
                Hàng, Công ty sẽ tiến hành cập nhật, thông báo cho Khách Hàng về
                những sửa đổi, bổ sung, thay thế Điều Khoản Sử Dụng Dịch Vụ hoặc
                các quy định, chính sách nêu trên trước 05 (năm) ngày tính đến
                ngày áp dụng. Nếu Khách Hàng tiếp tục sử dụng Dịch Vụ sau những
                sửa đổi, bổ sung, thay thế nêu trên, có nghĩa là Khách Hàng đã
                chấp nhận và đồng ý với những thay đổi đó.
              </p>
              <p className="text-lg mb-4">
                Điều Khoản Sử Dụng Dịch Vụ này được công bố công khai tại
                website: xedapchung.vn, tngo.vn, ứng dụng TNGo
              </p>
            </div>
          </div>
          {/* phần 2 */}
          <div>
            <div className="relative mt-10 ">
              <div className="w-14 h-14 border-2 border-blue-700 rotate-45 flex items-center justify-center absolute z-10 bg-white -top-1 -left-0.5">
                <p className="-rotate-45 text-blue-700 font-bold text-lg">2</p>
              </div>
              <div className="bg-blue-200 rounded-2xl pl-20  ">
                {" "}
                <h2 className="  text-xl pt-2 pb-3 text-blue-700 uppercase font-semibold">
                  Giải thích từ ngữ
                </h2>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-lg mb-4">
                Bên Cung Cấp “dịch vụ xe đạp công cộng TNGo” là một dịch vụ cho
                thuê (chia sẻ dùng chung) xe đạp, giúp cho người tham gia giao
                thông có thể nhận xe đạp từ một trạm dịch vụ xe đạp TNGo bất kỳ
                và tự di chuyển trên địa bàn thành phố, sau đó có thể gửi trả
                lại xe tại một trạm bất kỳ khác (bao gồm cả trạm gốc Thủ tục và
                cách thức nhận xe nhanh chóng).
              </p>
              <p className="text-lg mb-4">
                Công Ty có nghĩa là Công ty Cổ Phần Dịch Vụ Vận Tải Số Trí Nam
                được thành lập theo pháp luật Việt Nam có mã số thuế là:
                0109561814 là Công ty có nhiệm vụ vận hành và hoạt động dịch vụ
                xe đạp công cộng TNGo theo Hợp đồng giao việc số 01/2021/HĐGV ký
                ngày 15/07/2021 giữa Công ty Cổ phần Tập Đoàn Trí Nam với Công
                ty Cổ phần Dịch Vụ Vận tải số Trí Nam với mục đích hỗ trợ Khách
                Hàng có nhu cầu sử dụng dịch vụ xe đạp để di chuyển trên địa bàn
                thành phố thông qua việc đặt xe trên ứng dụng.
              </p>
              <p className="text-lg mb-4">
                Dịch Vụ xe đạp công cộng TNGo là dịch vụ cho phép khách hàng sử
                dụng xe đạp của Công ty Cổ Phần Dịch Vụ Vận Tải Số Trí Nam tại
                các trạm đặt xe để di chuyển trong thành phố có tính phí theo
                các gói giờ, ngày, tuần, tháng.
              </p>
              <p className="text-lg mb-4">
                Khách Hàng là cụm từ được sử dụng chung cho Người Dùng/ Bên sử
                dụng dịch vụ xe đạp công cộng của Công Ty. Khách Hàng là cá nhân
                hoặc đại diện tổ chức có nhu cầu sử dụng Dịch vụ xe đạp công
                cộng TNGo do Công Ty cung cấp.
              </p>
              <p className="text-lg mb-4">
                Ứng Dụng là website/Ứng dụng trên thiết bị di động do Công Ty sở
                hữu hoặc được quyền sử dụng để hỗ trợ cung cấp Dịch vụ xe đạp
                công cộng TNGo.
              </p>
              <p className="text-lg mb-4">
                Thông tin tài khoản nghĩa là thông tin sau mà Khách Hàng cung
                cấp cho Công Ty để đăng ký Tài khoản người dùng, bao gồm: Thông
                tin về họ tên; ngày tháng năm sinh; số CCCD/hộ chiếu ngày cấp,
                nơi cấp; địa chỉ; số điện thoại; email cá nhân; hình CCCD/ hộ
                chiếu mặt trước, mặt sau; Thông tin về tài khoản ngân hàng; tài
                khoản thanh toán; Bất kỳ thông tin nào khác bao gồm nhưng không
                giới hạn các bản scan, bản chụp, tập tin và dữ liệu xác thực
                khác… mà Công Ty đề nghị cung cấp để đảm bảo cài đặt Ứng Dụng và
                sử dụng dịch vụ xe đạp công cộng TNGo và bất kỳ thông tin nào
                khác bao gồm các bản scan, bản chụp, tập tin và dữ liệu xác thực
                khác mà Khách Hàng đã tạo, cung cấp, lưu trữ, sử dụng trên các
                Ứng Dụng của Công Ty.
              </p>
              <p className="text-lg mb-4">
                Sự kiện bất khả kháng là sự kiện xảy ra một cách khách quan
                không thể lường trước được và không thể khắc phục được mặc dù đã
                áp dụng mọi biện pháp cần thiết và khả năng cho phép làm cho một
                bên không thể thực hiện được bất kỳ hoặc tất cả các nghĩa vụ của
                mình theo các Điều Khoản Sử Dụng Dịch Vụ này (ví dụ như thiên
                tai, hỏa hoạn, sự bất ổn dân sự, tình hình chính trị…).
              </p>
              <p className="text-lg mb-4">
                Quyền sở hữu trí tuệ là quyền đối với tài sản trí tuệ, bao gồm
                quyền tác giả và quyền liên quan đến quyền tác giả, quyền sở hữu
                công nghiệp. Trong đó, Chúng tôi có quyền đối với tác phẩm do
                mình sáng tạo ra, đối với cuộc biểu diễn, bản ghi âm, ghi hình,
                chương trình phát sóng, tín hiệu vệ tinh mang chương trình được
                mã hóa, đối với sáng chế, kiểu dáng công nghiệp, thiết kế bố trí
                mạch tích hợp bán dẫn, nhãn hiệu, tên thương mại, chỉ dẫn địa
                lý, bí mật kinh doanh do mình sáng tạo ra hoặc sở hữu và quyền
                chống cạnh tranh không lành mạnh.
              </p>
              <p className="text-lg mb-4">
                Nhãn hiệu là bao gồm hình ảnh, chữ viết, ký tự, slogan, thông
                điệp, dấu hiệu nhìn thấy được dưới dạng chữ cái, từ ngữ, hình
                vẽ, hình ảnh, kể cả hình ba chiều hoặc sự kết hợp các yếu tố đó,
                được thể hiện bằng một hoặc nhiều mầu sắc; có khả năng phân biệt
                hàng hoá, dịch vụ của chủ sở hữu nhãn hiệu với hàng hoá, dịch vụ
                của chủ thể khác, nó có thể bao gồm: tên công ty, tên sản phẩm
                và dịch vụ, nhãn hiệu, nhãn hiệu dịch vụ, thiết kế và logo.
              </p>
              <p className="text-lg mb-4">
                Chính sách bảo mật có nghĩa là chính sách quyền riêng tư &
                cookie của Công Ty, liên quan đến việc truy cập, sử dụng Dịch vụ
                xe đạp công cộng TNGo tại các Ứng Dụng của Công Ty.
              </p>
              <p className="text-lg mb-4">
                Hợp đồng nghĩa là hợp đồng dịch vụ xe đạp-TNGo mà bạn giao kết
                với Chúng tôi để sử dụng Dịch vụ xe đạp công cộng TNGo của Chúng
                tôi.
              </p>
              <p className="text-lg mb-4">
                Bên thứ ba có nghĩa là một thể nhân hoặc pháp nhân, cơ quan, tổ
                chức không phải là Khách Hàng/Người dùng cũng không phải Tập
                Đoàn nhưng có mối liên hệ, sự ảnh hưởng hoặc có liên quan đến
                Ứng Dụng hoặc Khách Hàng/Người Dùng.
              </p>
              <p className="text-lg mb-4">
                Sử dụng có nghĩa là sử dụng xe đạp của Công Ty tại bất kỳ trạm
                đặt xe nào của Công Ty.
              </p>
              <p className="text-lg mb-4">
                Tài khoản có nghĩa là tài khoản Khách Hàng/Người Dùng cá nhân mà
                Khách Hàng/Người dùng đăng ký với Công Ty thông qua Ứng Dụng để
                có quyền đặt xe trên ứng dụng.
              </p>
              <p className="text-lg mb-4">
                Thanh toán có nghĩa là Khách Hàng có sử dụng thẻ tín dụng, tài
                khoản ngân hàng hoặc các ứng dụng trung gian (như ZALOPAY,
                Momo,…) để thanh toán cho việc sử dụng dich vụ xe đạp công cộng
                TNGo của Công Ty.
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
                  dịch vụ cung cấp
                </h2>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-lg mb-4">
                1. Dịch vụ xe đạp công cộng TNGo của Công ty Cổ Phần Dịch vụ Vận
                Tải Số Trí Nam:
              </p>
              <p className="text-lg mb-4">
                Là một dịch vụ cho thuê/chia sẻ dùng chung xe đạp, giúp cho
                người tham gia giao thông có thể di chuyển từ trạm xe đạp TNGo
                bất kỳ của Công ty và tự di chuyển trên địa bàn thành phố, sau
                đó có thể gửi trả lại xe tại 1 trạm bất kỳ khác (bao gồm cả trạm
                gốc) mà không phải lo việc tìm chỗ gửi xe.
              </p>
              <p className="text-lg mb-4">
                2. Quy trình cung cấp Dịch Vụ thông qua ứng dụng TNGo
              </p>
              <p className="text-lg mb-4">
                Như một giải pháp hữu ích nhằm mục đích mang lại sự tiện lợi cho
                Người dùng, ứng dụng được xây dựng như một nền tảng trung gian
                kết nối giữa Công Ty và Khách Hàng; Theo đó, quy trình cơ bản
                được thực hiện như sau:
              </p>
              <p className="text-lg mb-4">
                Bước 1: Tải ứng dụng và đăng ký tài khoản Quý khách điền các
                thông tin cá nhân theo yêu cầu:
              </p>

              <p className="text-lg mb-4">- Họ tên;</p>
              <p className="text-lg mb-4">- Ngày tháng năm sinh;</p>
              <p className="text-lg mb-4">
                - Số CCCD/Hộ chiếu/Thẻ sinh viên (còn hạn)
              </p>
              <p className="text-lg mb-4">- Ngày cấp, nơi cấp;</p>
              <p className="text-lg mb-4">- Địa chỉ liên lạc;</p>
              <p className="text-lg mb-4">- Địa chỉ Email;</p>
              <p className="text-lg mb-4">
                - Nhập số điện thoại đăng ký theo ứng dụng TNGo;
              </p>
              <p className="text-lg mb-4">
                - Hình CCCD/Hộ chiếu mặt trước, mặt sau, chụp hình khuôn mặt;
              </p>

              <p className="text-lg mb-4">Bước 2: Nạp tiền vào tài khoản:</p>

              <p className="text-lg mb-4">
                Xác nhận số tiền muốn nạp, chọn phương thức nạp tiền là cổng
                thanh toán MOMO, ZALOPAY và làm theo hướng dẫn của các cổng
                thanh toán này. Hoặc chuyển khoản trực tiếp vào tài khoản Công
                ty.
              </p>

              <p className="text-lg mb-4">
                Sau khi nạp tiền hoàn thành, Ứng dụng sẽ thông báo nạp tiền vào
                tài khoản thành công và Quý khách có thể bắt đầu sử dụng dịch
                vụ.
              </p>

              <p className="text-lg mb-4">
                Bước 3: Nếu đồng ý sử dụng dịch vụ, Khách Hàng quét mã QR code
                mở khóa xe và sử dụng.
              </p>

              <p className="text-lg mb-4">
                Bước 4: Sau khi hoàn thành chuyến đi Khách Hàng trả xe tại 1
                trạm bất kỳ của TNGo, khóa xe bằng tay và nhấn nút kết thúc
                chuyến đi trên ứng dụng.
              </p>

              <p className="text-lg mb-4">3. Phí dịch vụ:</p>

              <p className="text-lg mb-4">
                Phí dịch vụ là khoản phí thuê xe đạp Khách Hàng /Người dùng phải
                trả khi sử dụng Dịch vụ xe đạp công cộng TNGo do Công Ty cung
                cấp:
              </p>

              <p className="text-lg mb-4">
                Biểu phí dịch vụ được Công Ty công khai theo từng thời điểm và
                dựa trên Biểu phí dịch vụ của Công Ty cung cấp trên ứng dụng
                TNGo, web tngo.vn. Khách Hàng có quyền xem xét Biểu phí dịch vụ
                trước khi lựa chọn, việc lựa chọn gói cước theo nhu cầu của
                Khách Hàng sẽ được xem là cố định và không có khả năng thay đổi
                hoàn trả, Khách Hàng theo đó phải tự chịu trách nhiệm về những
                nội dung đơn hàng của mình bao gồm cả phí dịch vụ.
              </p>

              <p className="text-lg mb-4">
                Công Ty có quyền quy định, thay đổi mức phí của các gói cước
                liên quan đến Dịch Vụ tại Ứng Dụng của Công Ty. Biểu phí thay
                đổi sẽ có giá trị (ràng buộc) nếu Khách Hàng tiếp tục sử dụng
                dịch vụ ngay sau khi biểu phí mới có hiệu lực (ngày biểu phí mới
                có hiệu lực).
              </p>

              <p className="text-lg mb-4">
                Các khách hàng tạo tài khoản từ ngày 01/01/2023 TNGo sẽ áp dụng
                thu phí dịch vụ duy trì tài khoản trong trường hợp không phát
                sinh chuyến đi hoặc giao dịch liên tiếp trong vòng 2 tháng, phí
                duy trì sẽ được thu từ tháng thứ 3 với chi phí 5.000 VNĐ/ tháng.
              </p>

              <p className="text-lg mb-4">
                4. Thứ tự trừ điểm trên tài khoản khi Khách Hàng sử dụng dịch
                vụ:
              </p>

              <p className="text-lg mb-4">
                - Khách Hàng có 2 tài khoản sau khi tải ứng dụng TNGo và đăng ký
                thành công:
              </p>

              <p className="text-lg mb-4">
                - Tài khoản gốc: Là tài khoản quy đổi điểm khi khách hàng nạp
                tiền. Tài khoản này được bảo lưu số dư điểm trên tài khoản sang
                tháng kế tiếp. Đối với tài khoản gốc sau khi tài khoản của quý
                khách đã được xác thực đầy đủ thì số điểm trong tài khoản gốc sẽ
                có quyền được chia sẻ, cho, tặng sang các tài khoản khác.
              </p>

              <p className="text-lg mb-4">
                - Tài khoản khuyến mãi: Là tài khoản Khách Hàng nhận được tặng
                điểm tùy theo các chương trình khuyến mại theo từng giai đoạn.
                Tài khoản này có thời hạn sử dụng theo từng chương trình khuyến
                mại mà công ty quy định, hệ thống tự động hủy số dư điểm nếu hết
                tháng (hoặc hết thời gian khuyến mại) Khách Hàng không sử dụng
                hết.
              </p>

              <p className="text-lg mb-4">
                Khi Khách Hàng sử dụng ứng dụng TNGo để đặt xe cho chuyến đi
                theo các gói ngày, hoặc mua vé trả trước thì thứ tự trừ điểm
                trên tài khoản của Khách Hàng như sau:
              </p>

              <p className="text-lg mb-4">
                - Ưu tiên một hệ thống tự động trừ tiền trên Tài khoản điểm
                thưởng (là tài khoản điểm thưởng theo các chương trình khuyến
                mại, các mã khuyến mại,...)
              </p>

              <p className="text-lg mb-4">
                - Tiếp theo hệ thống tự động trừ tiền tài khoản gốc (nếu Tài
                khoản điểm thưởng đã trừ hết mà chưa đủ điểm cho gói dịch vụ
                Khách Hàng đăng ký)
              </p>

              <p className="text-lg mb-4">5. Thanh toán:</p>

              <p className="text-lg mb-4">
                Khách Hàng có thể thanh toán dịch vụ cho “TNGo” bằng cách:
              </p>

              <p className="text-lg mb-4">
                - Công Ty có thể hợp tác với bên thứ ba cung cấp dịch vụ trung
                gian thanh toán bao gồm MOMO, ZALOPAY hoặc hệ thống ví điện tử
                khác để tạo thuận lợi cho việc thanh toán của Người dùng.
              </p>

              <p className="text-lg mb-4">
                - Khách Hàng /Người dùng đồng ý, hiểu và xác nhận rằng những
                thông tin thanh toán được cung cấp để sử dụng các dịch vụ của
                Công Ty là chính xác và hợp lệ.
              </p>

              <p className="text-lg mb-4">
                - Việc sử dụng dịch vụ thanh toán của bên thứ ba sẽ tùy thuộc
                vào các điều khoản sử dụng của bên thứ ba cung cấp dịch vụ thanh
                toán, Công Ty không có khả năng hạn chế, can thiệp hay bảo đảm
                nào cho Khách Hàng.
              </p>

              <p className="text-lg mb-4">
                - Lưu ý: Dịch vụ xe đạp công cộng TNGo là một dịch vụ cho thuê
                xe đạp công cộng được tính bằng số điểm Quý khách nạp trên ứng
                dụng TNGo, thông qua các đơn vị tài chính trung gian nên việc
                hoàn trả tiền không thuộc thẩm quyền của công ty.
              </p>

              <p className="text-lg mb-4">
                6. Cam đoan của Khách Hàng/ Người dùng:
              </p>

              <p className="text-lg mb-4">
                Với việc đồng ý sử dụng Dịch vụ xe đạp công cộng -TNGo trên ứng
                dụng của Công Ty, Khách Hàng /Người dùng đồng ý và cam đoan:
              </p>

              <p className="text-lg mb-4">
                - Không có bất kỳ hành vi gây hư hỏng đến tài sản của Công Ty
                trong quá trình sử dụng.
              </p>
              <p className="text-lg mb-4">
                - Không sử dụng xe thuê vào các mục đích phi pháp.
              </p>
              <p className="text-lg mb-4">
                - Không cho thuê lại xe hoặc giao xe cho đơn vị khác sử dụng.
              </p>
              <p className="text-lg mb-4">
                - Tuân theo tất cả các quy định luật pháp Việt Nam về An toàn
                giao thông đường bộ.
              </p>
              <p className="text-lg mb-4">
                - Nếu gây hư hỏng phương tiện, khách hàng phải chịu hoàn toàn
                trách nhiệm.
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
                  Tài khoản người dùng
                </h2>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-lg mb-4">
                Để có quyền truy cập và/hoặc mua và/hoặc sử dụng bất kỳ Dịch Vụ
                nào từ Ứng Dụng, Khách Hàng thừa nhận và đồng ý rằng phải đăng
                ký và duy trì Tài khoản Khách Hàng trên Ứng Dụng của Công Ty.
              </p>

              <p className="text-lg mb-4">
                Để đăng ký Tài khoản Khách Hàng, các đối tượng được cung cấp
                Dịch Vụ trên Ứng Dụng phải đảm bảo tuân thủ theo Điều Khoản Sử
                Dụng Dịch Vụ này và phải cung cấp cho Công Ty các thông tin bắt
                buộc thông qua việc đăng ký và cài đặt Ứng Dụng TNGo.
              </p>

              <p className="text-lg mb-4">
                Khách Hàng /Người dùng phải bảo đảm và cam kết với Công Ty rằng:
              </p>

              <p className="text-lg mb-4">
                - Thông tin tài khoản mà Người dùng cung cấp cho Chúng tôi là
                chính xác, đầy đủ, hợp pháp và Người dùng sẽ duy trì thông tin
                chính xác đó trong điều kiện như vậy trên cơ sở liên tục; hoặc
                phải tự động cập nhật, bổ sung, chỉnh lý khi Người dùng có bất
                kỳ thông tin thay đổi nào.
              </p>

              <p className="text-lg mb-4">
                - Trường hợp Người dùng đang sử dụng Tài khoản người dùng thay
                mặt cho một pháp nhân/ cơ quan/ tổ chức và Người dùng phải đáp
                ứng rằng mình phải cung cấp hoặc đảm bảo có thẩm quyền pháp lý
                cần thiết để làm việc đó.
              </p>

              <p className="text-lg mb-4">
                - Người dùng thừa nhận và đồng ý rằng việc vi phạm bất kỳ cam
                kết nào cũng có thể sẽ dẫn đến việc chấm dứt ngay quyền sử dụng
                Dịch Vụ và Ứng Dụng, Công Ty có quyền áp dụng các chế tài theo
                Điều Khoản Sử Dụng Dịch Vụ này và các quy chế khác (nếu có).
              </p>

              <p className="text-lg mb-4">
                - Người dùng theo đó với việc đồng ý sử dụng tài sản, cơ sở dữ
                liệu, dịch vụ, tiện ích cung cấp bởi Ứng Dụng đồng nghĩa với
                việc đồng ý không sử dụng sử dụng tài sản, cơ sở dữ liệu, dịch
                vụ, tiện ích này vào các mục đích phi pháp, bị cấm theo quy định
                của Pháp Luật hoặc vi phạm các quyền hợp pháp, gây trở ngại, hạn
                chế việc sử dụng Dịch vụ của Người dùng khác.
              </p>
            </div>
          </div>
          {/* phần 4 */}
          <div>
            <div className="relative mt-10 ">
              <div className="w-14 h-14 border-2 border-blue-700 rotate-45 flex items-center justify-center absolute z-10 bg-white -top-1 -left-0.5">
                <p className="-rotate-45 text-blue-700 font-bold text-lg">5</p>
              </div>
              <div className="bg-blue-200 rounded-2xl pl-20  ">
                {" "}
                <h2 className="  text-xl pt-2 pb-3 text-blue-700 uppercase font-semibold">
                  bảo mật thông tin
                </h2>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-lg mb-4">
                Khách Hàng luôn luôn phải bảo mật Thông tin tài khoản của mình
                cũng như tên Khách Hàng và mật khẩu của Tài khoản Khách Hàng
                trên Ứng Dụng.
              </p>

              <p className="text-lg mb-4">
                - Khách Hàng sẽ không cho phép bất kỳ Bên thứ ba nào sử dụng Tài
                khoản Khách Hàng của mình. Khách Hàng cũng không được chuyển
                nhượng hoặc chuyển tài khoản Người dùng của mình cho bất kỳ cá
                nhân hoặc pháp nhân/ cơ quan/ tổ chức nào khác.
              </p>

              <p className="text-lg mb-4">
                - Khách Hàng phải chịu trách nhiệm cho tất cả các hoạt động xảy
                ra trong Tài khoản Khách Hàng của mình, trừ khi bạn cung cấp đủ
                bằng chứng cho sự hài lòng hợp lý của Công Ty rằng Tài khoản
                Khách Hàng của mình đang là đối tượng sử dụng trái phép.
              </p>

              <p className="text-lg mb-4">
                - Khách Hàng cũng sẽ phải thông báo cho Công Ty về bất kỳ vi
                phạm bảo mật tên người dùng và mật khẩu của Người dùng ngay lập
                tức.
              </p>

              <p className="text-lg mb-4">
                - Để bình luận dưới các bài trong trang Tin tức, Công ty có yêu
                cầu Khách Hàng /Người dùng đăng nhập vào tài khoản Facebook cá
                nhân. Đây là nhằm dễ dàng cho việc quản trị; không để trang web
                bị đăng những thông tin sai, những nội dung không phù hợp thuần
                phong mỹ tục hay bất hợp pháp.
              </p>

              <p className="text-lg mb-4">
                - Cookie: Chúng tôi cũng có thể thu thập các dữ liệu về những
                lần truy cập (bao gồm các hành vi như số lần truy cập, số trang
                xem, các đường link được click, cũng như các nội dung khác liên
                quan đến website) và trình duyệt, thiết bị người dùng sử dụng để
                truy cập (bao gồm địa chỉ IP, loại trình duyệt, ngôn ngữ sử
                dụng, thời gian và địa chỉ mà trình duyệt truy xuất đến). Người
                dùng có quyền lựa chọn cho phép trang web được lưu trữ hoặc truy
                xuất các thông tin này hay không vào lần đầu tiên truy cập.
              </p>

              <p className="text-lg mb-4">
                - Công Ty cam kết bảo vệ quyền riêng tư của Người dùng đối với
                những thông tin mà Người dùng không muốn tiết lộ trong quá trình
                sử dụng Dịch Vụ tại Ứng Dụng của Công Ty, trừ khi có quy định
                khác Công ty không phát tán, cung cấp thông tin khách hàng cho
                bên thứ 3 trừ trường hợp (i) thực hiện theo yêu cầu của các cơ
                quan nhà nước có thẩm quyền; (ii) phục vụ cho nhu cầu nghiên cứu
                thị trường, báo cáo phân tích và quảng bá các sản phẩm dịch vụ
                của Công ty. Công ty sẽ yêu cầu các tổ chức này bảo vệ dữ liệu
                người dùng, và chỉ sử dụng các thông tin này theo mục đích đã
                thỏa thuận giữa hai bên.
              </p>

              <p className="text-lg mb-4">
                - Bảo mật thanh toán sau khi đăng ký thành viên tại ứng dụng
                TNGo của Công ty, khách hàng có thể nạp tiền để thanh toán các
                gói cước sử dụng dịch vụ thông qua cổng thanh toán ZALOPAY,
                MOMO. ZALOPAY và MOMO là cổng thanh toán đã được cấp phép hoạt
                động hợp pháp tại Việt Nam. Theo đó, các tiêu chuẩn bảo mật
                thanh toán sẽ đảm bảo tuân thủ theo các tiêu chuẩn bảo mật của
                nhà cung cấp dịch vụ.
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
                  Giới hạn trách nhiệm , bồi thường và rủi ro
                </h2>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-lg mb-4">
                Trách nhiệm bồi thường thiệt hại của khách hàng trong việc sử
                dụng tài sản của Công Ty: Mọi hư hỏng, mất mát hoặc thiệt hại
                trực tiếp, đến xe đạp, tài sản của Công Ty trong quá trình Khách
                Hàng sử dụng xe đạp của Công Ty thì phải bồi thường 100% giá trị
                xe, tài sản. (giá trị xe (tài sản) được tính là giá mà Công ty
                mua trừ đi mức khấu hao hàng năm theo quy định của Pháp Luật).
                Mọi hư hỏng tài sản, xe đạp trong quá trình Khách hàng sử dụng
                do lỗi chủ quan của Khách hàng thì phải chịu 100% chi phí sửa
                chữa.
              </p>

              <p className="text-lg mb-4">
                Đánh giá rủi ro bởi Khách Hàng: Khách Hàng là người duy nhất và
                hoàn toàn chịu trách nhiệm về hoạt động an toàn của xe đạp tại
                bất cứ thời điểm nào. Khách Hàng đồng ý rằng xe đạp là các cỗ
                máy có thể gặp sự cố ngay cả khi xe được bảo dưỡng đúng cách và
                rằng sự cố đó có thể gây thương tích. Khách Hàng đồng ý rằng
                việc lái xe có nhiều rủi ro rõ ràng và không rõ ràng, có thể gây
                thương tích hoặc tử vong cho Khách hàng hoặc người khác cũng như
                thiệt hại cho tài sản và những rủi ro, nguy hiểm đó, các mối
                nguy hiểm không thể luôn luôn được dự đoán hoặc tránh được.
                Khách Hàng đồng ý rằng những rủi ro nguy cơ và nguy hiểm như vậy
                là trách nhiệm duy nhất của Khách hàng. Khách Hàng đồng ý rằng
                nếu việc sử dụng dịch vụ xe đạp TNGo gây ra bất kỳ thương tích
                hoặc thiệt hại tài sản cho người khác thì Khách hàng phải chịu
                trách nhiệm cho tất cả các thương tích và thiệt hại tài sản và
                các chi phí liên quan. Bằng cách chọn đồng ý đi xe Khách hàng
                chịu trách nhiệm hoàn toàn và đầy đủ về mọi rủi ro nguy cơ và
                nguy hiểm liên quan, và đồng ý rằng Công ty và tất cả Người liên
                Quan khác không chịu trách nhiệm cho bất kỳ thương tích, thiệt
                hại tài sản hoặc chi phí nào do Khách Hàng gây ra cho bất kỳ
                người nào hoặc tài sản, bao gồm cả chính Xe đó.
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
                  khuyến mãi và liên kết
                </h2>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-lg mb-4">
                Công Ty có thể cung cấp các lợi ích, giảm giá và các Chương
                trình khuyến mãi khác (sau đây được gọi chung là Chương trình
                khuyến mãi). Khi tham gia Chương trình khuyến mãi, Người dùng
                đồng ý với các quy tắc chính thức chi phối Chương trình khuyến
                mãi đó. Các quy tắc và điều kiện cho mỗi Chương trình khuyến mãi
                như vậy sẽ được xác định bởi Công Ty và Công Ty có quyền giới
                hạn chúng khi xét thấy cần thiết.
              </p>

              <p className="text-lg mb-4">
                Người dùng có quyền xem xét để quyết định sử dụng dịch vụ khác
                dựa trên các đơn vị cung cấp khác được liên kết, tích hợp trên
                Ứng Dụng của Công Ty và phải đảm bảo rằng Người dùng tự chịu
                trách nhiệm với chính sách, điều khoản của bên thứ ba và không
                ảnh hưởng hoặc tạo trở ngại, áp lực nào cho Công Ty.
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
                  điều khoản thi hành
                </h2>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-lg mb-4">
                Người dùng thừa nhận và đồng ý rằng Công Ty có thể sửa đổi các
                Điều Khoản Sử Dụng Dịch Vụ này bất cứ lúc nào mà không cần phải
                chính thức thông báo cho Người dùng, trừ khi có quy định khác.
              </p>

              <p className="text-lg mb-4">
                Người dùng có thể xem và đồng ý chủ động kiểm tra mỗi lần Người
                dùng sử dụng Ứng Dụng, đều đọc và xem xét Điều Khoản Sử Dụng
                Dịch Vụ này trong website, ứng dụng.
              </p>

              <p className="text-lg mb-4">
                Khi chấp nhận và đồng ý các Điều Khoản Sử Dụng Dịch Vụ này,
                Người dùng bảo đảm và tuyên bố với Công Ty rằng Người dùng có
                năng lực và thẩm quyền hợp pháp cần thiết để Người dùng thực
                thi, tuân thủ, tự nguyện và đáp ứng các tiêu chí, điều kiện để
                tham gia vào việc sử dụng Dịch Vụ dựa trên ứng dụng.
              </p>

              <p className="text-lg mb-4">
                Người dùng thừa nhận và đồng ý rằng Công Ty có thể và sẽ dựa vào
                bảo hành, đại diện và cam kết mà Người dùng cung cấp cho Công
                Ty.
              </p>

              <p className="text-lg mb-4">
                Cả Người dùng và Công Ty sẽ tuân thủ tất cả các quy định của
                Pháp Luật.
              </p>

              <p className="text-lg mb-4">
                Các Điều Khoản Sử Dụng Dịch Vụ này cấu thành toàn bộ thỏa thuận
                giữa Người dùng và Công Ty liên quan đến việc sử dụng Dịch vụ xe
                đạp công cộng TNGo, để loại trừ tất cả các điều khoản và điều
                kiện khác và mọi thỏa thuận trước bằng văn bản giữa các bên (nếu
                có).
              </p>

              <p className="text-lg mb-4">
                Các thông báo và khuyến cáo sau này của Công Ty là bộ phận bổ
                sung cho Điều Khoản Sử Dụng Dịch Vụ này và kết hợp với nhau để
                tạo thành một thỏa thuận hoàn chỉnh giữa Công Ty với Người dùng
                về việc truy cập và sử dụng Dịch vụ xe đạp công cộng TNGo.
              </p>

              <p className="text-lg mb-4">
                Nếu bất kỳ điều khoản nào tại Điều Khoản Sử Dụng Dịch Vụ này,
                cũng như thông báo và khuyến cáo về sau, không hợp pháp, vô hiệu
                và/hoặc không thể thi hành được, thì điều khoản đó sẽ được coi
                là tách biệt khỏi những điều khoản còn lại của Điều Khoản Sử
                Dụng Dịch Vụ này, và không ảnh hưởng đến hiệu lực cũng như khả
                năng thi hành của các điều khoản còn lại.
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
                  Khiếu nại phản ánh
                </h2>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-lg mb-4">
                Người dùng có thể gửi khiếu nại, ý kiến phản ánh của mình đến
                Công ty Cổ Phần dịch vụ Vận Tải Số Trí Nam thông qua các kênh
                sau:
              </p>

              <p className="text-lg mb-4">Hotline: 1900 633 548</p>

              <p className="text-lg mb-4">Email: info@vantaiso.com.vn</p>

              <p className="text-lg mb-4">
                Trụ sở công ty: 446 Đội Cấn, Phường Cống Vị, Quận Ba Đình, Thành
                phố Hà Nội
              </p>

              <p className="text-lg mb-4">
                Văn phòng tại TP. Hồ Chí Minh: 13M Đường số 14, Phường 3, Quận
                Bình Thạnh, Thành Phố Hồ Chí Minh
              </p>

              <p className="text-lg mb-4">
                Văn phòng tại TP. Đà Nẵng: 497 Ngô Quyền, Phường An Hải Bắc,
                Quận Sơn Trà, Thành Phố Đà Nẵng
              </p>

              <p className="text-lg mb-4">
                Văn phòng tại TP. Vũng Tàu: 196 Trương Công Định, Phường 3,
                Thành Phố Vũng Tàu
              </p>

              <p className="text-lg mb-4">
                Văn phòng tại TP. Hải Phòng: 24 Lê Thánh Tông, Phường Máy Tơ,
                Quận Ngô Quyền, Thành Phố Hải Phòng
              </p>

              <p className="text-lg mb-4">
                Văn phòng tại TP. Quy Nhơn: 47 Hà Huy Tập, Phường Trần Phú,
                Thành Phố Quy Nhơn, Tỉnh Bình Định
              </p>

              <p className="text-lg mb-4">
                Thông tin chi tiết tại{" "}
                <a href="/" className="text-blue-600 font-semibold">
                  tngo.vn
                </a>
              </p>
            </div>
          </div>
          <p className="text-lg">
            Điều Khoản Sử Dụng Dịch vụ này có hiệu lực kể từ ngày 01/07/2021.
          </p>
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
                    <Image src={item.img} alt="ảnh" fill objectFit="cover" />
                  </div>
                );
              })
            ) : (
              <p>lỗi ảnh</p>
            )}
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Content;
