import pool from "@/db.js";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const [veXeDap] = await pool.execute(
            "SELECT * FROM `ve` WHERE loai_xe = 'xe đạp cơ'"
        );
        
        // Lấy danh sách vé xe đạp điện
        const [veXeDien] = await pool.execute(
            "SELECT * FROM `ve` WHERE loai_xe = 'xe đạp điện'"
        );
        
        const [[{ total }]] = await pool.execute(
            "SELECT COUNT(*) as total FROM `ve`"
        );

        return new Response(
            JSON.stringify({
                veXeDap,
                veXeDien,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching tickets:", error.message);
        return new Response(
            JSON.stringify({ message: "Lỗi lấy danh sách vé!", error: error.message }),
            { status: 500 }
        );
    }
}