import pool from "@/db.js";

// Xử lý lấy user và trả về token từ lần đăng nhập trước
export async function GET(req) {
    try {
        const searchParams = new URL(req.url).searchParams; // Lấy thông tin từ URL
        const userId = searchParams.get("id"); // Lấy ID user từ query parameter

        if (!userId) {
            return Response.json({ message: "Thiếu ID người dùng!" }, { status: 400 });
        }

        // Truy vấn bảng users để lấy thông tin người dùng theo ID
        const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [userId]);

        if (rows.length === 0) {
            return Response.json({ message: "Người dùng không tồn tại!" }, { status: 404 });
        }

        const user = rows[0];

        // Truy vấn token từ bảng hoặc hệ thống lưu trữ token (giả định bạn có bảng lưu trữ token)
        const [tokenRows] = await pool.execute("SELECT token FROM user_tokens WHERE user_id = ?", [userId]);

        if (tokenRows.length === 0) {
            return Response.json({ message: "Token không tồn tại! Người dùng có thể cần đăng nhập lại." }, { status: 404 });
        }

        const existingToken = tokenRows[0].token; // Lấy token từ bảng user_tokens

        return Response.json({ message: "Token đã được tìm thấy!", token: existingToken }, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Lỗi khi lấy token người dùng!", error: error.message }, { status: 500 });
    }
}
