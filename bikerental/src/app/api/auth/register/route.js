import pool from "@/db.js"; // Đảm bảo đường dẫn đúng
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { email, password, username, phone, role } = await req.json();

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Lưu vào database
        await pool.execute(
            "INSERT INTO users (email, password, username, phone, role) VALUES (?, ?, ?, ?, ?)",
            [email, hashedPassword, username, phone, role]
        );

        // Tạo JWT token
        const token = jwt.sign(
            { email, username, role },
            "mysecretkey", // Nên dùng biến môi trường trong thực tế
            { expiresIn: "1h" }
        );

        return new Response(JSON.stringify({ message: "Đăng ký thành công!", token }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Đăng ký thất bại!", error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
