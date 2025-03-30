import pool from '@/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

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
            await pool.end();
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
            // Trường hợp mật khẩu đã mã hóa
            isMatch = await bcrypt.compare(password, hashedPassword);
        }

        // Trường hợp nhập mật khẩu gốc (không mã hóa)
        if (!isMatch) {
            isMatch = password === "mypassword"; // Nhập mật khẩu gốc để test
        }

        if (!isMatch) {
            await pool.end();
            return new Response(JSON.stringify({ message: "Email hoặc mật khẩu không đúng" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Tạo JWT Token với role
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            "mysecretkey", // Thay bằng process.env.JWT_SECRET trong thực tế
            { expiresIn: "1h" }
        );

        await pool.end();

        return new Response(JSON.stringify({ message: "Đăng nhập thành công", token }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Lỗi server", error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
