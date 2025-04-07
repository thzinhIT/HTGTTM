import Image from "next/image";
import avatar from "../../../../public/assets/img/banner-rank.png";
const Tripcare = () => {
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
          <h2 className="text-4xl text-white font-bold  ">
            ĐIỀU KHOẢN VÀ ĐIỀU KIỆN BẢO HIỂM TRIP CARE
          </h2>
        </div>
      </div>
      <div className="mx-auto w-[1320px]">
        {/* I. Quy Tắc Và Điều Khoản Áp Dụng */}
        <div className="bg-white px-6 py-4">
          <h2 className="text-xl font-semibold text-black mb-2">
            I. Quy Tắc Và Điều Khoản Áp Dụng
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Được phê chuẩn theo Công văn số 15204/BTC-QLBH ngày 13/12/2019 của
            Bộ Tài chính và được ban hành theo Quyết định số 125/2019/QĐ-TGĐ
            ngày 31/12/2019 của Tổng Giám Đốc Công ty Cổ phần Bảo hiểm OPES và
            các Điều khoản bổ sung được ban hành kèm theo.
          </p>
        </div>
        {/* II. Quy Trình Mua Bảo Hiểm Trip Care Trên App TNGO */}
        <div className="bg-white px-6 py-4">
          <h2 className="text-xl font-semibold text-black mb-4">
            II. Quy Trình Mua Bảo Hiểm Trip Care Trên App TNGO
          </h2>
          <div>
            <img
              src="https://tngo.vn/image/trip-care.jpg"
              alt="Quy trình mua bảo hiểm Trip Care"
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
        </div>
        {/* III. Chương Trình Bảo Hiểm */}
        <div className="bg-white px-6 py-4">
          <h2 className="text-xl font-semibold text-black mb-4">
            III. Chương Trình Bảo Hiểm
          </h2>
          {/* Bảng 1: Quyền lợi bảo hiểm */}
          <p className="text-sm text-gray-700 italic mb-2">
            Bảng 1: Quyền lợi bảo hiểm & Số tiền Bảo hiểm (Đơn vị: VND)
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm text-left border border-red-500">
              <thead className="bg-white font-semibold text-black">
                <tr>
                  <th className="border border-red-500 px-2 py-1">STT</th>
                  <th className="border border-red-500 px-2 py-1">
                    Quyền lợi bảo hiểm
                  </th>
                  <th className="border border-red-500 px-2 py-1">
                    STBH/người/thời hạn BH
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-red-500 px-2 py-1">1</td>
                  <td className="border border-red-500 px-2 py-1">
                    Tử vong hoặc thương tật vĩnh viễn do tai nạn
                  </td>
                  <td className="border border-red-500 px-2 py-1">
                    150.000.000
                  </td>
                </tr>
                <tr>
                  <td className="border border-red-500 px-2 py-1 pl-4">a</td>
                  <td className="border border-red-500 px-2 py-1">
                    Tử vong hoặc Thương Tật Toàn Bộ Vĩnh Viễn
                  </td>
                  <td className="border border-red-500 px-2 py-1">
                    150.000.000
                  </td>
                </tr>
                <tr>
                  <td className="border border-red-500 px-2 py-1 pl-4">b</td>
                  <td className="border border-red-500 px-2 py-1">
                    Thương Tật Bộ Phận Vĩnh Viễn (tính theo tỷ lệ TT-PL2)
                  </td>
                  <td className="border border-red-500 px-2 py-1">
                    150.000.000
                  </td>
                </tr>
                <tr>
                  <td className="border border-red-500 px-2 py-1">2</td>
                  <td className="border border-red-500 px-2 py-1">
                    Thương tật tạm thời
                  </td>
                  <td className="border border-red-500 px-2 py-1">
                    15.000.000
                  </td>
                </tr>
                <tr>
                  <td className="border border-red-500 px-2 py-1">3</td>
                  <td className="border border-red-500 px-2 py-1">
                    Trợ cấp Thu nhập
                  </td>
                  <td className="border border-red-500 px-2 py-1">4.500.000</td>
                </tr>
                <tr>
                  <td className="border border-red-500 px-2 py-1 pl-4">-</td>
                  <td className="border border-red-500 px-2 py-1">
                    Số tiền trợ cấp mỗi ngày
                  </td>
                  <td className="border border-red-500 px-2 py-1">150.000</td>
                </tr>
                <tr>
                  <td className="border border-red-500 px-2 py-1 pl-4">-</td>
                  <td className="border border-red-500 px-2 py-1">
                    Số ngày nhận viện trợ tối đa
                  </td>
                  <td className="border border-red-500 px-2 py-1">30</td>
                </tr>
                <tr>
                  <td className="border border-red-500 px-2 py-1">4</td>
                  <td className="border border-red-500 px-2 py-1">
                    Mất GTTT, thẻ NH
                  </td>
                  <td className="border border-red-500 px-2 py-1">500.000</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Bảng 2: Phí bảo hiểm */}
          <p className="text-sm text-gray-700 italic mb-2">
            Bảng 2: Phí Bảo hiểm (Đơn vị: VND)
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm text-left border border-yellow-500">
              <thead className="bg-yellow-50 font-semibold text-black">
                <tr>
                  <th className="border border-yellow-500 px-2 py-1">
                    Thời hạn bảo hiểm
                  </th>
                  <th className="border border-yellow-500 px-2 py-1">
                    Vé lượt
                    <br />
                    <span className="font-normal text-gray-600 text-xs">
                      Tối đa 2 giờ
                    </span>
                  </th>
                  <th className="border border-yellow-500 px-2 py-1">
                    Vé ngày
                    <br />
                    <span className="font-normal text-gray-600 text-xs">
                      Tối đa 450 phút/ngày
                    </span>
                  </th>
                  <th className="border border-yellow-500 px-2 py-1">
                    Vé tháng
                    <br />
                    <span className="font-normal text-gray-600 text-xs">
                      Tối đa 60 giờ/tháng
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-yellow-500 px-2 py-1">
                    Phí bảo hiểm (bao gồm VAT)
                  </td>
                  <td className="border border-yellow-500 px-2 py-1">1.000</td>
                  <td className="border border-yellow-500 px-2 py-1">6.000</td>
                  <td className="border border-yellow-500 px-2 py-1">24.000</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Ghi chú */}
          <p className="text-xs text-gray-600">
            * Thời hạn bảo hiểm là khoảng thời gian HĐBH có hiệu lực tính từ
            thời điểm NĐBH bắt đầu thuê xe qua ứng dụng TNGo, di chuyển và trả
            xe tại các trạm xe đạp TNGo, tối đa theo số giờ quy định tại các gói
            bảo hiểm.
            <br />* Phạm vi địa lý: Việt Nam
          </p>
        </div>
        {/* IV. Loại Trừ Trách Nhiệm Bảo Hiểm */}
        <div className="bg-white px-6 py-4">
          <h2 className="text-xl font-semibold text-black mb-4">
            IV. Loại Trừ Trách Nhiệm Bảo Hiểm
          </h2>
          <div className="text-sm text-gray-700">
            Công Ty Bảo Hiểm sẽ không chi trả quyền lợi bảo hiểm nếu sự kiện bảo
            hiểm xảy ra thuộc các trường hợp hoặc nguyên nhân từ bất kỳ sự kiện
            nào sau đây:
            <ol className="list-decimal list-inside space-y-2 mt-2">
              <li>
                Hành động/lỗi cố ý của Bên Mua Bảo Hiểm, Người Được Bảo Hiểm,
                Người thụ hưởng.
              </li>
              <li>
                Người được bảo hiểm danh nghĩa (trừ chi phí mình được đền bù là
                hành động tự vệ), tham gia thi đấu, tập luyện các môn thể thao
                chuyên nghiệp hoặc bất kỳ hoạt động chuyên nghiệp nào.
              </li>
              <li>
                Người được bảo hiểm tự tử hoặc tự gây thương tích (người trí
                trưởng thành có năng lực của mình) dù đang trong tình trạng hay
                không có năng lực hành vi.
              </li>
              <li>
                Sử tịch không do tai nạn; Sử tịch không do tai nạn trong thời
                gian chờ; Sử tịch không có giấy phép lái xe hợp lệ; Sử tịch do
                vi phạm pháp luật hoặc vi phạm luật giao thông: đua xe, điều
                khiển xe không có giấy phép lái xe hợp lệ; Sử tịch do điều kiện
                trong các trường hợp: chiến tranh, nội chiến, bạo động, khủng
                bố, đình công, biểu tình, bạo loạn, cách mạng, đảo chính, hoặc
                các sự kiện tương tự.
              </li>
              <li>
                Tai nạn xảy ra do nguyên nhân trực tiếp và/hoặc gián tiếp từ
                rượu bia, ma túy, chất kích thích, chất cấm khác; Các chất kích
                thích được sử dụng theo Quy Tắc là các chất mà Người Được Bảo
                Hiểm sử dụng mà pháp luật cấm hoặc không được phép sử dụng, hoặc
                các chất mà pháp luật cho phép nhưng Người Được Bảo Hiểm sử dụng
                không đúng quy định, gây tệ liệt thần kinh, làm mất kiểm soát
                hành vi.
              </li>
              <li>
                Người Được Bảo Hiểm bị ngộ độc thực phẩm, đồ uống, hít phải khí,
                độc (trừ trường hợp tham gia quy định bảo hiểm ngộ độc thực
                phẩm, đồ uống, hít phải khí, độc).
              </li>
              <li>
                Người Được Bảo Hiểm bị cảm đột ngột, trung gió; bệnh tật; thai
                sản; bệnh nghề nghiệp; nhiễm vi sinh vật trong quá trình điều
                trị bệnh và thai sản.
              </li>
              <li>
                Các hoạt động không được viết trong các chương trình bảo hiểm
                như: leo núi, trượt tuyết, lặn biển, nhảy dù, đua xe, đua ngựa,
                đua thuyền, đua máy bay (trừ khi có điều kiện, điều khoản, sửa
                đổi, bổ sung, hoặc các điều kiện, điều khoản, sửa đổi, bổ sung
                được áp dụng trong hợp đồng bảo hiểm).
              </li>
              <li>
                Các loại trừ khác được Quy định tại Điều 4, Điều khoản loại trừ
                trách nhiệm bảo hiểm của Quy tắc bảo hiểm được phê duyệt tại
                Phần I điều này.
              </li>
            </ol>
          </div>
        </div>
        {/* V. Đối Tượng Tham Gia Bảo Hiểm */}
        <div className="bg-white px-6 py-4">
          <h2 className="text-xl font-semibold text-black mb-4">
            V. Đối Tượng Tham Gia Bảo Hiểm
          </h2>
          <div className="text-sm text-gray-700">
            <div className="font-bold mb-2">Đối tượng tham gia bảo hiểm:</div>
            <ul className="list-disc list-inside space-y-2">
              <li>
                OPES chỉ nhận bảo hiểm với các trường hợp từ bên mua bảo hiểm
                trong trường hợp NĐBH (người được bảo hiểm) là người Việt Nam
                hoặc người nước ngoài sinh sống và làm việc tại Việt Nam, không
                bị cấm tham gia bảo hiểm theo quy định pháp luật hiện hành.
              </li>
              <li>
                Tuổi từ đủ 01 tuổi đến 65 tuổi (tính đến thời điểm tham gia bảo
                hiểm ngay tại thời điểm tham gia bảo hiểm).
              </li>
              <li>Không bị thương tật vĩnh viễn từ 50% trở lên.</li>
              <li>
                Không đang trong thời gian điều trị thương tật hoặc bệnh lý.
              </li>
            </ul>
            <div className="mt-2">
              Trong trường hợp OPES không thẩm định tại thời điểm cấp HDBH và
              được xác định trong trường hợp xảy ra sự kiện bảo hiểm, OPES không
              chịu trách nhiệm chi trả quyền lợi bảo hiểm nếu NĐBH không đáp ứng
              các điều kiện trên tại thời điểm tham gia bảo hiểm.
            </div>
          </div>
        </div>
        {/* VI. Chấm Dứt Hợp Đồng Bảo Hiểm Trước Hạn */}
        <div className="bg-white px-6 py-4">
          <h2 className="text-xl font-semibold text-black mb-4">
            VI. Chấm Dứt Hợp Đồng Bảo Hiểm Trước Hạn
          </h2>
          <div className="text-sm text-gray-700">Không áp dụng</div>
        </div>
        <div className="bg-white px-6 py-4">
          <h2 className="text-xl font-semibold text-black mb-4">
            VII. Hướng Dẫn Bồi Thường
          </h2>
          <div className="text-sm text-gray-700">
            <div className="mb-2">
              1. Thông báo sự kiện bảo hiểm trong vòng 30 ngày kể từ ngày sự
              kiện bảo hiểm, trừ trường hợp bất khả kháng và bất khả kháng theo
              quy định của pháp luật.
            </div>
            <div className="mb-4">
              2. Quy trình giải quyết yêu cầu bồi thường
            </div>
            <div>
              <div className="font-bold mb-2">
                Bảng 3: Quy trình giải quyết yêu cầu bồi thường bảo hiểm
              </div>
              <table className="w-full text-sm text-left border border-red-500">
                <thead className="bg-red-50 font-semibold text-black">
                  <tr>
                    <th className="border border-red-500 px-4 py-2">
                      Bước Thực Hiện
                    </th>
                    <th className="border border-red-500 px-4 py-2">
                      Hướng Dẫn Chi Tiết
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-red-500 px-4 py-2">
                      Bước 1: Thông báo sự kiện bảo hiểm
                    </td>
                    <td className="border border-red-500 px-4 py-2">
                      Khi phát sinh sự kiện bảo hiểm, vui lòng thông báo sự kiện
                      bảo hiểm đến OPES qua các kênh thông tin sau:
                      <br />
                      - Hotline (miễn phí): 1800 55 88 55
                      <br />- Email hỗ trợ:{" "}
                      <a
                        href="mailto:lebinh5112004@gmail.com"
                        className="text-blue-600"
                      >
                        lebinh5112004@gmail.com
                      </a>
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-red-500 px-4 py-2">
                      Bước 2: Hoàn thiện hồ sơ yêu cầu giải quyết bồi thường bảo
                      hiểm
                    </td>
                    <td className="border border-red-500 px-4 py-2">
                      Ngày tiếp nhận thông tin yêu cầu giải quyết bồi thường của
                      OPES:
                      <br />
                      - Hướng dẫn hoàn thiện hồ sơ yêu cầu giải quyết bồi thường
                      bảo hiểm
                      <br />
                      - Toàn bộ giấy tờ cần thiết để giải quyết bồi thường bảo
                      hiểm sẽ được OPES hướng dẫn cụ thể trong trường hợp xảy ra
                      sự kiện bảo hiểm
                      <br />- OPES sẽ xem xét và giải quyết yêu cầu bồi thường
                      trong thời gian sớm nhất
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-red-500 px-4 py-2">
                      Bước 3: Nhận kết quả giải quyết bồi thường bảo hiểm
                    </td>
                    <td className="border border-red-500 px-4 py-2">
                      Trong vòng 05 ngày làm việc kể từ ngày nhận đầy đủ hồ sơ
                      yêu cầu giải quyết bồi thường, OPES sẽ có Thông báo phương
                      án giải quyết bồi thường bảo hiểm bằng văn bản hoặc các
                      hình thức khác
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-red-500 px-4 py-2">
                      Bước 4: Nhận chi trả bảo hiểm
                    </td>
                    <td className="border border-red-500 px-4 py-2">
                      Trong vòng 02 ngày làm việc kể từ khi nhận được đầy đủ
                      giấy tờ, OPES sẽ hoàn tất việc chuyển tiền bồi thường tới
                      Khách hàng
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* VIII. Tư Vấn & Giải Thích Tư Vấn Tắt */}
        <div className="bg-white px-6 py-4">
          <h2 className="text-xl font-semibold text-black mb-4">
            VIII. Tư Vấn & Giải Thích Tư Vấn Tắt
          </h2>
          <div className="text-sm text-gray-700">
            <div className="font-bold mb-2">Bảng 4: Giải thích tư vấn tắt</div>
            <table className="w-full text-sm text-left border border-gray-300">
              <thead className="bg-gray-200 font-semibold text-black">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">STT</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Tư vấn tắt
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Giải thích tư vấn tắt
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">1</td>
                  <td className="border border-gray-300 px-4 py-2">OPES</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Công ty cổ phần bảo hiểm OPES
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">2</td>
                  <td className="border border-gray-300 px-4 py-2">HDBH</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Hợp đồng bảo hiểm
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">3</td>
                  <td className="border border-gray-300 px-4 py-2">GCNBH</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Giấy chứng nhận bảo hiểm
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">4</td>
                  <td className="border border-gray-300 px-4 py-2">GYCBH</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Giấy yêu cầu bảo hiểm
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">5</td>
                  <td className="border border-gray-300 px-4 py-2">BMBH</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Bên mua bảo hiểm
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">6</td>
                  <td className="border border-gray-300 px-4 py-2">NĐBH</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Người được bảo hiểm
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">7</td>
                  <td className="border border-gray-300 px-4 py-2">QLBH</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Quyền lợi bảo hiểm
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">8</td>
                  <td className="border border-gray-300 px-4 py-2">QTĐK</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Quy tắc điều khoản
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">9</td>
                  <td className="border border-gray-300 px-4 py-2">GTTT</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Giấy tờ tùy thân
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">10</td>
                  <td className="border border-gray-300 px-4 py-2">CTBH</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Chương trình bảo hiểm
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">11</td>
                  <td className="border border-gray-300 px-4 py-2">HDNV</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Hướng dẫn nghiệp vụ
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">12</td>
                  <td className="border border-gray-300 px-4 py-2">KH</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Khách hàng
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">13</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Ban PTSP và QLNV
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Ban Phát triển sản phẩm và Quản lý nghiệp vụ
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* IX. Xác Nhận Của Khách Hàng */}
        <div className="px-6 py-4 bg-white mb-8  mt-6">
          <h2 className="text-xl font-semibold mb-2">
            IX. Xác Nhận Của Khách Hàng
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Bằng việc yêu cầu tham gia bảo hiểm và đóng phí bảo hiểm đầy đủ theo
            Chương trình bảo hiểm này, khách hàng xác nhận đã đọc, hiểu và đồng
            ý với toàn bộ điều kiện, điều khoản quy định tại Quy tắc điều khoản
            bảo hiểm, các quy định của Chương trình bảo hiểm tại tài liệu này.
            Chứng từ liên quan đến Hợp đồng bảo hiểm OPES cấp gửi Khách hàng
            được cấp trên cơ sở yêu cầu của Bên mua bảo hiểm dưới hình thức
            chứng từ điện tử, có gắn QR code, MACCODE của OPES và là bản gốc.
            Quý khách có thể tra cứu Chứng nhận bảo hiểm điện tử của mình và các
            thông tin liên quan.
          </p>
        </div>{" "}
      </div>
    </>
  );
};

export default Tripcare;
