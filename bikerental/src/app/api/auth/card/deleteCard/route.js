import pool from "@/db.js";

export async function DELETE(req) {
    try {
        const { the_id } = await req.json();

        // Kiểm tra nếu the_id tồn tại trong cơ sở dữ liệu
        const [rows] = await pool.execute(
            "SELECT COUNT(*) AS count FROM `the` WHERE the_id = ?",
            [the_id]
        );

        if (rows[0].count === 0) {
            // Nếu không tồn tại, trả về thông báo thẻ không tồn tại
            return new Response(
                JSON.stringify({ message: "Thẻ không tồn tại!" }),
                { status: 404 }
            );
        }

        // Nếu tồn tại, tiến hành xóa thẻ
        await pool.execute(
            "DELETE FROM `the` WHERE the_id = ?",
            [the_id]
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
