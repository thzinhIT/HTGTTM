import pool from "@/db.js";

export async function DELETE(req) {
    try {
        const { id } = await req.json();
        if (!id) {
            return new Response(JSON.stringify({ message: "Thiếu user_id!" }), { status: 400 });
        }

        await pool.execute("DELETE FROM users WHERE id = ?", [id]);

        return new Response(JSON.stringify({ message: "Xóa user thành công!" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Xóa user thất bại!", error: error.message }), { status: 500 });
    }
}
