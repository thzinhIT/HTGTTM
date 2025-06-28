import pool from "@/db.js";
import bcrypt from "bcrypt"; // Thư viện dùng để mã hóa mật khẩu

export async function PUT(req) {
        let connection;
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return new Response(JSON.stringify({ message: "Thiếu id người dùng" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Lấy dữ liệu từ request body
        const { email, username, password, phone } = await req.json();

        // Kiểm tra thông tin bắt buộc
        if (!email || !username || !password) {
            return Response.json({ message: "Thiếu thông tin bắt buộc!" }, { status: 400 });
        }

        // Mã hóa mật khẩu trước khi lưu
        const hashedPassword = await bcrypt.hash(password, 10); // Mã hóa mật khẩu với độ phức tạp là 10

        // Cập nhật thông tin người dùng trong cơ sở dữ liệu
        await pool.execute(
            "UPDATE users SET email = ?, username = ?, password = ?, phone = ? WHERE id = ?",
            [email, username, hashedPassword, phone, id]
        );

        return Response.json({ message: "Cập nhật thông tin thành công!" }, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Cập nhật thông tin thất bại, email này đã tồn tại rồi!", error: error.message }, { status: 500 });
    }
}
