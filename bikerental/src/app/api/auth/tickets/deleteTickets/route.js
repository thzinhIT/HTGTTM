import pool from "@/db.js";

export async function DELETE(req) {
    try {
        const { ticketId } = await req.json();

        await pool.execute(
            "DELETE FROM `ve` WHERE ve_id = ?",
            [ticketId]
        );

        return new Response(
            JSON.stringify({ message: "Vé đã được xóa!" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting ticket:", error.message);
        return new Response(
            JSON.stringify({ message: "Lỗi xóa vé!", error: error.message }),
            { status: 500 }
        );
    }
}
