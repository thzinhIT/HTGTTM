import pool from "@/db.js";

export async function POST(req) {
    try {
        const ticket = await req.json();

        // Chèn dữ liệu vé mới vào cơ sở dữ liệu
        const [result] = await pool.execute(
            "INSERT INTO `ve` (ve_id, ten_ve, diem_tngo, thoi_gian_hieu_luc, hieu_luc, phi_phat_sinh, ghi_chu) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [ticket.ve_id, ticket.ten_ve, ticket.diem_tngo, ticket.thoi_gian_hieu_luc, ticket.hieu_luc, ticket.phi_phat_sinh, ticket.ghi_chu]
        );

        // Trả về thông báo thành công
        return new Response(
            JSON.stringify({ message: "Vé mới đã được thêm!" }),
            { status: 200 }
        );
    } catch (error) {
        // Nếu có lỗi xảy ra trong quá trình thêm vé
        console.error("Error adding ticket:", error.message);
        return new Response(
            JSON.stringify({ message: "Lỗi thêm vé mới!", error: error.message }),
            { status: 500 }
        );
    }
}
