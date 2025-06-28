import jwt from "jsonwebtoken";
import pool from "@/db.js";
import { NextResponse } from "next/server";
const SECRET_KEY = "mysecretkey"; // Dùng biến môi trường thực tế

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

    const [rows] = await pool.execute("SELECT * FROM the_nguoi_dung WHERE id = ?", [userId]);

    if (rows.length === 0) {
      return NextResponse.json({ message: "Không tìm thấy người dùng!" }, { status: 404 });
    }

    return NextResponse.json({ user: rows[0] }, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi truy vấn người dùng:", error);
    return NextResponse.json({ message: "Lỗi server!" }, { status: 500 });
  }
}
