import pool from "@/db.js";
import nodemailer from "nodemailer";

// Hàm gửi email thông báo
async function sendEmail(recipientEmail, subject, text) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "your_email@gmail.com", // Thay bằng email của bạn
      pass: "your_email_password", // Thay bằng mật khẩu email của bạn
    },
  });

  const mailOptions = {
    from: "your_email@gmail.com",
    to: recipientEmail,
    subject: subject,
    text: text,
  };

  await transporter.sendMail(mailOptions);
}

// Function thanh toán vé
export default async function thanhToanVe(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Phương thức không được hỗ trợ." });
  }

  const { soLuong } = req.body; // Người dùng chỉ nhập số lượng vé

  if (!soLuong) {
    return res.status(400).json({ message: "Thiếu thông tin số lượng vé." });
  }

  let connection;

  try {
    // Kết nối đến cơ sở dữ liệu
    connection = await pool.getConnection();

    // Bắt đầu giao dịch
    await connection.beginTransaction();

    // Xác thực token để lấy thông tin người dùng
    const token = req.headers.authorization; // Token được gửi qua headers
    const [tokenRows] = await connection.execute(
      "SELECT user_id FROM user_tokens WHERE token = ?",
      [token]
    );

    if (tokenRows.length === 0) {
      throw new Error("Token không hợp lệ hoặc đã hết hạn!");
    }

    const userId = tokenRows[0].user_id;

    // Lấy thông tin email từ bảng users
    const [userRows] = await connection.execute(
      "SELECT email FROM users WHERE id = ?",
      [userId]
    );

    if (userRows.length === 0) {
      throw new Error("Người dùng không tồn tại.");
    }

    const email = userRows[0].email;

    // Lấy thông tin vé từ bảng `ve` (giả định lấy vé đầu tiên hoặc dựa trên logic phù hợp)
    const [veRows] = await connection.execute("SELECT * FROM ve LIMIT 1");
    if (veRows.length === 0) {
      throw new Error("Không có thông tin vé trong hệ thống.");
    }

    const { ve_id: veId, ten_ve, diem_tngo, hieu_luc } = veRows[0];
    const tongDiemThanhToan = diem_tngo * soLuong;

    // Lấy thông tin từ bảng `the_nguoi_dung`
    const [theRows] = await connection.execute(
      "SELECT so_du_diem, diem_da_su_dung FROM the_nguoi_dung WHERE id = ?",
      [userId]
    );

    if (theRows.length === 0) {
      throw new Error("Người dùng không tồn tại trong hệ thống thẻ.");
    }

    const { so_du_diem, diem_da_su_dung } = theRows[0];

    // Kiểm tra điểm để thanh toán
    if (so_du_diem < tongDiemThanhToan) {
      throw new Error("Không đủ điểm để thanh toán.");
    }

    // Tính toán các giá trị cập nhật
    const diemConLai = so_du_diem - tongDiemThanhToan;
    const diemDaSuDungMoi = diem_da_su_dung + tongDiemThanhToan;

    // Cập nhật bảng `the_nguoi_dung`
    await connection.execute(
      `
      UPDATE the_nguoi_dung
      SET so_du_diem = ?, diem_da_su_dung = ?, diem_con_lai = ?
      WHERE id = ?
      `,
      [diemConLai, diemDaSuDungMoi, diemConLai, userId]
    );

    // Tính ngày mua và ngày hết hạn
    const ngayMua = new Date().toISOString().split("T")[0];
    const ngayHetHan = hieu_luc; // Dùng giá trị `hieu_luc` từ bảng `ve`

    // Thêm thông tin vào bảng `ve_nguoi_dung`
    await connection.execute(
      `
      INSERT INTO ve_nguoi_dung (id, ten_nguoi_dung, ve_id, ten_ve, ngay_mua, ngay_het_han, so_luong)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [userId, veId, ten_ve, ngayMua, ngayHetHan, soLuong]
    );

    // Gửi email thông báo thành công
    await sendEmail(
      email,
      "Xác nhận thanh toán vé",
      `Xin chào! Thanh toán vé "${ten_ve}" đã được thực hiện thành công. Số lượng vé: ${soLuong}. Tổng điểm thanh toán: ${tongDiemThanhToan}.`
    );

    // Cam kết giao dịch
    await connection.commit();

    res.status(200).json({ message: "Thanh toán vé thành công và email đã được gửi!" });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error(error);
    res.status(500).json({ message: error.message || "Đã xảy ra lỗi hệ thống." });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
