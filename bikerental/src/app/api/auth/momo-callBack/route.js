import jwt from "jsonwebtoken";
import pool from "@/lib/db"; // import pool kết nối MySQL của bạn
import { sendEmail } from "@/utils/sendEmail"; // import hàm gửi email của bạn
import { NextResponse } from "next/server";

export async function POST(req) {
  let connection;
  try {
    const body = await req.json();
    console.log("Momo Callback:", body);

    const { resultCode, extraData } = body;

    // ✅ Chỉ xử lý nếu thanh toán thành công
    if (resultCode !== 0) {
      return NextResponse.json(
        { message: "Thanh toán thất bại!" },
        { status: 400 }
      );
    }

    // 👉 Giả sử bạn truyền userId và id qua extraData lúc tạo đơn (nếu cần)
    const extra = JSON.parse(Buffer.from(extraData, "base64").toString());
    const { userId, id, soLuong } = extra;

    connection = await pool.getConnection();
    await connection.beginTransaction();

    // Lấy dữ liệu nạp từ bảng bang_gia
    const [rows] = await pool.execute(
      "SELECT diem_tngo FROM bang_gia WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Không tìm thấy thông tin thẻ." },
        { status: 404 }
      );
    }

    const { diem_tngo } = rows[0];

    // Lấy thông tin người dùng
    const [userRows] = await pool.execute(
      "SELECT so_du_diem, email FROM the_nguoi_dung WHERE id = ?",
      [userId]
    );

    if (userRows.length === 0) {
      return NextResponse.json(
        { message: "Không tìm thấy người dùng." },
        { status: 404 }
      );
    }

    const user = userRows[0];

    const so_du_diem =
      parseFloat(user.so_du_diem) + parseFloat(diem_tngo) * parseInt(soLuong);

    // Cập nhật số dư
    await pool.execute(
      "UPDATE the_nguoi_dung SET so_du_diem = ? WHERE id = ?",
      [so_du_diem, userId]
    );

    await connection.commit();
    return NextResponse.json({ message: "Cập nhật điểm thành công qua MoMo." });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("Lỗi xử lý IPN:", error);
    return NextResponse.json(
      { message: "Lỗi xử lý IPN.", error: error.message },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}
