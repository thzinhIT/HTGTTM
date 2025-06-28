import pool from "@/db.js";

export async function DELETE(req) {
    try {
        const { ve_id } = await req.json();

         // Kiểm tra nếu the_id tồn tại trong cơ sở dữ liệu
         const [rows] = await pool.execute(
            "SELECT COUNT(*) AS count FROM `ve` WHERE ve_id = ?",
            [ve_id]
        );

        if (rows[0].count === 0) {
            // Nếu không tồn tại, trả về thông báo thẻ không tồn tại
            return new Response(
                JSON.stringify({ message: "Vé không tồn tại!" }),
                { status: 404 }
            );
        }

        await pool.execute(
            "DELETE FROM `ve` WHERE ve_id = ?",
            [ve_id]
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
