import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { email, password, username, phone, role } = await req.json();

        // Mã hóa mật khẩu trước khi lưu vào database
        const hashedPassword = await bcrypt.hash(password, 10); // 10 là số vòng mã hóa (mạnh hơn nếu lớn hơn)

        // Sử dụng createPool thay vì createConnection
        const pool = mysql.createPool({
            host: "127.0.0.1",
            user: "root",
            password: "",
            database: "bikerental",
        });

        // Thêm role vào câu lệnh INSERT
        await pool.execute(
            "INSERT INTO users (email, password, username, phone, role) VALUES (?, ?, ?, ?, ?)",
            [email, hashedPassword, username, phone, role] // Dùng hashedPassword thay vì password gốc
        );

        await pool.end();

        return new Response(JSON.stringify({ message: "Đăng ký thành công!" }), {
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
