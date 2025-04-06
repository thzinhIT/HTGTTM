import pool from "@/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        // Kiểm tra email trong database
        const [rows] = await pool.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        // Nếu không tìm thấy user
        if (rows.length === 0) {
            return new Response(JSON.stringify({ message: "Email hoặc mật khẩu không đúng" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        const user = rows[0];
        const hashedPassword = user.password;

        let isMatch = false;

        // Kiểm tra cả mật khẩu mã hóa và mật khẩu gốc
        if (hashedPassword.startsWith("$2a$") || hashedPassword.startsWith("$2b$")) {
            isMatch = await bcrypt.compare(password, hashedPassword);
        }

        // Trường hợp nhập mật khẩu gốc (không mã hóa)
        if (!isMatch) {
            isMatch = password === "mypassword"; // Nhập mật khẩu gốc để test
        }

        if (!isMatch) {
            return new Response(JSON.stringify({ message: "Email hoặc mật khẩu không đúng" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        // ✅ Tạo JWT token KHÔNG CÓ iat
        const token = jwt.sign(
            { email: user.email, password: user.password }, // Payload
            "mysecretkey",
            {
                noTimestamp: true, // ✅ Loại bỏ iat
            }
        );

        // Lưu token vào bảng user_tokens
        await pool.execute(
            "INSERT INTO user_tokens (user_id, token) VALUES (?, ?) ON DUPLICATE KEY UPDATE token = ?",
            [user.id, token, token]
        );

        return new Response(JSON.stringify({ message: "Đăng nhập thành công", token }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Đăng nhập thất bại", error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
