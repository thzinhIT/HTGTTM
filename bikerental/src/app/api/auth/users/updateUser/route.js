import pool from "@/db.js";
import bcrypt from "bcrypt"; // Thư viện dùng để mã hóa mật khẩu

export async function PUT(req) {
    try {
        // Lấy dữ liệu từ request body
        const { id, email, username, password, phone } = await req.json();

        // Kiểm tra thông tin bắt buộc
        if (!id || !email || !username || !password) {
            return Response.json({ message: "Thiếu thông tin bắt buộc!" }, { status: 400 });
        }

        // Mã hóa mật khẩu trước khi lưu
        const hashedPassword = await bcrypt.hash(password, 10); // Mã hóa mật khẩu với độ phức tạp là 10

        // Cập nhật thông tin người dùng trong cơ sở dữ liệu
        await pool.execute(
            "UPDATE users SET email = ?, username = ?, password = ?, phone = ? WHERE id = ?",
            [email, username, hashedPassword, phone || "user", id]
        );

        return Response.json({ message: "Cập nhật thông tin thành công!" }, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Cập nhật thông tin thất bại!", error: error.message }, { status: 500 });
    }
}
