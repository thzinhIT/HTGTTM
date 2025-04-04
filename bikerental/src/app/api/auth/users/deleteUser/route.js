import pool from "@/db.js";

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
