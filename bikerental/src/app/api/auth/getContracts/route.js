import pool from "@/db.js";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const [lien_he] = await pool.execute(
            "SELECT * FROM lien_he LIMIT ? OFFSET ?",
            [limit, offset]
        );
        const [[{ total }]] = await pool.execute(
            "SELECT COUNT(*) as total FROM lien_he"
        );

        return new Response(
            JSON.stringify({
                lien_he,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error:", error.message);
        return new Response(
            JSON.stringify({ message: "Lỗi lấy danh sách users!", error: error.message }),
            { status: 500 }
        );
    }
}
