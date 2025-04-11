import pool from "@/db.js";

export async function GET(req) {
    try {

        const [price] = await pool.execute(
            "SELECT * FROM `bang_gia`",
        );
        const [[{ total }]] = await pool.execute(
            "SELECT COUNT(*) as total FROM `bang_gia`"
        );

        return new Response(
            JSON.stringify({
                total,
                price,}),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching:", error.message);
        return new Response(
            JSON.stringify({ message: "Lỗi lấy danh sách bảng giá!", error: error.message }),
            { status: 500 }
        );
    }
}
