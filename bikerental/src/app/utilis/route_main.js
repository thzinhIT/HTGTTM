import pool from "@/lib/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Vui lòng nhập đầy đủ email và mật khẩu" });
    }

    try {
        // Kiểm tra email trong database
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
        }

        const user = rows[0];

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
        }

        // Tạo JWT Token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ message: "Đăng nhập thành công", token });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server", error: error.message });
    }
}