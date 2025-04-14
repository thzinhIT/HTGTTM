const SECRET_KEY = "mysecretkey"; // Dùng biến môi trường thực tế
import jwt from "jsonwebtoken";
import pool from "@/db.js";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ message: "Thiếu hoặc sai định dạng token!" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, SECRET_KEY);
    } catch (err) {
      return new Response(JSON.stringify({ message: "Token không hợp lệ!" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    const userId = decoded.id;

    // Truy vấn lấy tất cả dòng trùng khớp với users_id
    const [rows] = await pool.execute("SELECT * FROM ve_nguoi_dung WHERE users_id = ?", [userId]);

    if (rows.length === 0) {
      return NextResponse.json({ message: "Không tìm thấy thông tin!" }, { status: 404 });
    }

    // Trả về toàn bộ danh sách các đơn hàng
    return NextResponse.json({ orders: rows }, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi truy vấn người dùng:", error);
    return NextResponse.json({ message: "Lỗi server!" }, { status: 500 });
  }
}

