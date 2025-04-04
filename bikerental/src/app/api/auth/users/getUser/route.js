import pool from "@/db.js";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const [users] = await pool.execute(
            "SELECT * FROM users LIMIT ? OFFSET ?",
            [limit, offset]
        );
        const [[{ total }]] = await pool.execute(
            "SELECT COUNT(*) as total FROM users"
        );

        return new Response(
            JSON.stringify({
                users,
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
