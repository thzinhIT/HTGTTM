import pool from "@/db.js";

// Function thanh toán vé
export default async function thanhToanVe(req, res) {
  // Kiểm tra phương thức HTTP
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Phương thức không được hỗ trợ." });
  }

  // Lấy thông tin từ request body
  const { veId, soLuong } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!veId || !soLuong) {
    return res.status(400).json({ message: "Thiếu thông tin ID vé hoặc số lượng vé." });
  }

  let connection;

  try {
    // Kết nối đến cơ sở dữ liệu
    connection = await pool.getConnection();

    // Bắt đầu giao dịch
    await connection.beginTransaction();

    // Xác thực token từ header
    const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ "Bearer [token]"
    if (!token) {
      throw new Error("Token không hợp lệ hoặc không được cung cấp!");
    }

    // Lấy thông tin user từ token
    const [tokenRows] = await connection.execute(
      "SELECT user_id FROM user_tokens WHERE token = ?",
      [token]
    );

    if (tokenRows.length === 0) {
      throw new Error("Token không hợp lệ hoặc đã hết hạn!");
    }

    const userId = tokenRows[0].user_id;

    // Lấy thông tin vé từ bảng `ve` dựa trên ID vé
    const [veRows] = await connection.execute("SELECT * FROM ve WHERE ve_id = ?", [veId]);

    if (veRows.length === 0) {
      throw new Error(`Vé với ID: ${veId} không tồn tại.`);
    }

    const { ten_ve, diem_tngo, hieu_luc } = veRows[0];
    const tongDiemThanhToan = diem_tngo * soLuong;

    // Lấy thông tin thẻ của người dùng
    const [theRows] = await connection.execute(
      "SELECT so_du_diem, diem_da_su_dung, loai_the FROM the_nguoi_dung WHERE id = ?",
      [userId]
    );

    if (theRows.length === 0) {
      throw new Error("Người dùng không tồn tại trong hệ thống thẻ.");
    }

    const { so_du_diem, diem_da_su_dung, loai_the } = theRows[0];

    // Xác định số dư tối thiểu dựa trên loại thẻ
    const minBalance = {
      RideUp: 100000,
      Prenium: 1000000,
      VIP: 5000000,
    };

    if (so_du_diem - tongDiemThanhToan < (minBalance[loai_the] || 0)) {
      throw new Error(
        `Số dư thấp hơn mức tối thiểu (${minBalance[loai_the].toLocaleString()}), bạn không thể thanh toán.`
      );
    }

    // Tính toán các giá trị cập nhật
    const diemConLai = so_du_diem - tongDiemThanhToan;
    const diemDaSuDungMoi = diem_da_su_dung + tongDiemThanhToan;

    // Cập nhật bảng `the_nguoi_dung`
    await connection.execute(
      `
      UPDATE the_nguoi_dung
      SET so_du_diem = ?, diem_da_su_dung = ?
      WHERE id = ?
      `,
      [diemConLai, diemDaSuDungMoi, userId]
    );

    // Tính ngày mua và ngày hết hạn
    const ngayMua = new Date().toISOString().split("T")[0];
    const ngayHetHan = hieu_luc; // Dùng giá trị `hieu_luc` từ bảng `ve`

    // Thêm thông tin vào bảng `ve_nguoi_dung`
    await connection.execute(
      `
      INSERT INTO ve_nguoi_dung (id, ve_id, ten_ve, ngay_mua, ngay_het_han, so_luong)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [userId, veId, ten_ve, ngayMua, ngayHetHan, soLuong]
    );

    // Cam kết giao dịch
    await connection.commit();

    res.status(200).json({ message: "Thanh toán vé thành công!" });
  } catch (error) {
    // Xử lý rollback khi có lỗi
    if (connection) {
      await connection.rollback();
    }
    console.error("Lỗi:", error.message);
    res.status(500).json({ message: error.message || "Đã xảy ra lỗi hệ thống." });
  } finally {
    // Giải phóng kết nối
    if (connection) {
      connection.release();
    }
  }
}
