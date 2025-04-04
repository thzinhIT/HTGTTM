import pool from "@/db.js";

export async function PUT(req) {
    try {
        const { id, email, username, phone} = await req.json();
        if (!id || !email || !username) {
            return Response.json({ message: "Thiếu thông tin!" }, { status: 400 });
        }

        await pool.execute(
            "UPDATE users SET email = ?, username = ?, phone = ? WHERE id = ?",
            [email, username, phone || "user", id]
        );

        return Response.json({ message: "Cập nhật thông tin thành công!" }, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Cập nhật thông tin thất bại!", error: error.message }, { status: 500 });
    }
}
