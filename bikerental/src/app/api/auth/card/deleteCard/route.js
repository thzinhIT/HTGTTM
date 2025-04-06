import pool from "@/db.js";

export async function DELETE(req) {
    try {
        const { cardId } = await req.json();

        await pool.execute(
            "DELETE FROM `the` WHERE the_id = ?",
            [cardId]
        );

        return new Response(
            JSON.stringify({ message: "Thẻ đã được xóa!" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting card:", error.message);
        return new Response(
            JSON.stringify({ message: "Lỗi xóa thẻ!", error: error.message }),
            { status: 500 }
        );
    }
}
