import mysql from "mysql2/promise";

export async function POST(req) {
    try {
        const { email, password, username, phone } = await req.json();

        // Sử dụng createPool thay vì createConnection
        const pool = mysql.createPool({
            host: "127.0.0.1",
            user: "root",
            password: "",
            database: "bikerental",
        });

        await pool.execute(
            "INSERT INTO users (email, password, username, phone) VALUES (?, ?, ?, ?)",
            [email, password, username, phone]
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
