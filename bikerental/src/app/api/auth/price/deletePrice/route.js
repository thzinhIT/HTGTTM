import pool from "@/db.js";

export async function DELETE(req) {
    try {
        const { id } = await req.json();


        const [rows] = await pool.execute(
            "SELECT COUNT(*) AS count FROM `bang_gia` WHERE id = ?",
            [id]
        );

        if (rows[0].count === 0) {
            return new Response(
                JSON.stringify({ message: "Bảng giá không tồn tại!" }),
                { status: 404 }
            );
        }

        await pool.execute(
            "DELETE FROM `bang_gia` WHERE id = ?",
            [id]
        );

        return new Response(
            JSON.stringify({ message: "Bảng giá đã được xóa!" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting card:", error.message);
        return new Response(
            JSON.stringify({ message: "Lỗi xóa!", error: error.message }),
            { status: 500 }
        );
    }
}
