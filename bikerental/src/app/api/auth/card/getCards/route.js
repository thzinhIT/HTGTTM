import pool from "@/db.js";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const [cards] = await pool.execute(
            "SELECT * FROM `the` LIMIT ? OFFSET ?",
            [limit, offset]
        );
        const [[{ total }]] = await pool.execute(
            "SELECT COUNT(*) as total FROM `the`"
        );

        return new Response(
            JSON.stringify({
                cards,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching cards:", error.message);
        return new Response(
            JSON.stringify({ message: "Lỗi lấy danh sách thẻ!", error: error.message }),
            { status: 500 }
        );
    }
}
