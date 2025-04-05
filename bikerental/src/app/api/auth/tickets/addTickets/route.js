import pool from "@/db.js";

export async function POST(req) {
    try {
        const ticket = await req.json();

        const [result] = await pool.execute(
            "INSERT INTO `ve` (ten_ve, diem_tngo, thoi_gian_hieu_luc, hieu_luc, phi_phat_sinh, ghi_chu) VALUES (?, ?, ?, ?, ?, ?)",
            [ticket.ten_ve, ticket.diem_tngo, ticket.thoi_gian_hieu_luc, ticket.hieu_luc, ticket.phi_phat_sinh, ticket.ghi_chu]
        );

        return new Response(
            JSON.stringify({ message: "Vé mới đã được thêm!", ticketId: result.insertId }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error adding ticket:", error.message);
        return new Response(
            JSON.stringify({ message: "Lỗi thêm vé mới!", error: error.message }),
            { status: 500 }
        );
    }
}
