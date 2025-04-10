import pool from "@/db.js";

export async function POST(req) {
    try {
        const ticket = await req.json();

        const safeValue = (value) => value === undefined ? null : value;
        // Chèn dữ liệu vé mới vào cơ sở dữ liệu
        const [result] = await pool.execute(
            "INSERT INTO `ve` (ten_ve, loai_xe, diem_tngo, thoi_luong, thoi_han, phi_phat_sinh, ghi_chu) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [ticket.ten_ve, ticket.loai_xe, ticket.diem_tngo, ticket.thoi_luong, ticket.thoi_han, ticket.phi_phat_sinh, ticket.ghi_chu]
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
