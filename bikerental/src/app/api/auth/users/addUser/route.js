import pool from "@/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { email, password, username, phone} = await req.json();
        if (!email || !password || !username) {
            return Response.json({ message: "Thiếu thông tin!" }, { status: 400 });
        }

        const role = 'User';

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.execute(
            "INSERT INTO users (email, password, username, phone, role) VALUES (?, ?, ?, ?, ?)",
            [email, hashedPassword, username, phone]
        );

        
       
        const token = jwt.sign(
                    {id, email, username, password, phone, role },
                    "mysecretkey", // Nên dùng biến môi trường trong thực tế
                  
                );
        return Response.json({ message: "Đăng ký thành công!", token }, { status: 201 });
    } catch (error) {
        return Response.json({ message: "Đăng ký thất bại!", error: error.message }, { status: 500 });
    }
}
