import pool from "@/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Lấy danh sách users (phân trang)
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const [users] = await pool.execute(
            "SELECT * FROM users LIMIT ? OFFSET ?",
            [limit, offset]
        );
        const [[{ total }]] = await pool.execute(
            "SELECT COUNT(*) as total FROM users"
        );

        return new Response(
            JSON.stringify({
                users,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error:", error.message);
        return new Response(
            JSON.stringify({ message: "Lỗi lấy danh sách users!", error: error.message }),
            { status: 500 }
        );
    }
}


// Thêm user mới
export async function POST(req) {
    try {
        const { email, password, username, phone, role } = await req.json();
        if (!email || !password || !username) {
            return Response.json({ message: "Thiếu thông tin!" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userRole = role || "user";

        await pool.execute(
            "INSERT INTO users (email, password, username, phone, role) VALUES (?, ?, ?, ?, ?)",
            [email, hashedPassword, username, phone, userRole]
        );

        const token = jwt.sign({ email, username, role: userRole }, "mysecretkey", { expiresIn: "1h" });
        return Response.json({ message: "Đăng ký thành công!", token }, { status: 201 });
    } catch (error) {
        return Response.json({ message: "Đăng ký thất bại!", error: error.message }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { user_id, email, username, phone, role } = await req.json();
        if (!user_id || !email || !username) {
            return Response.json({ message: "Thiếu thông tin!" }, { status: 400 });
        }

        await pool.execute(
            "UPDATE users SET email = ?, username = ?, phone = ?, role = ? WHERE id = ?",
            [email, username, phone, role || "user", user_id]
        );

        return Response.json({ message: "Cập nhật thông tin thành công!" }, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Cập nhật thông tin thất bại!", error: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { user_id } = await req.json();
        if (!user_id) {
            return Response.json({ message: "Thiếu user_id!" }, { status: 400 });
        }

        await pool.execute("DELETE FROM users WHERE id = ?", [user_id]);

        return Response.json({ message: "Xóa user thành công!" }, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Xóa user thất bại!", error: error.message }, { status: 500 });
    }
}


