
import pool from "@/db.js";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("id");

    if (!userId) {
      return NextResponse.json({ message: "Thiếu ID người dùng!" }, { status: 400 });
    }

    const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [userId]);

    if (rows.length === 0) {
      return NextResponse.json({ message: "Không tìm thấy người dùng!" }, { status: 404 });
    }

    return NextResponse.json({ user: rows[0] }, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi truy vấn người dùng:", error);
    return NextResponse.json({ message: "Lỗi server!" }, { status: 500 });
  }
}
