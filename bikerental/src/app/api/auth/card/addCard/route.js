import pool from "@/db.js";

export async function POST(req) {
    try {
        const card = await req.json();

        const [result] = await pool.execute(
            "INSERT INTO `the` (the_id, loai_the, img, phi_kich_hoat, so_du_toi_thieu, diem_thuong, so_xe_toi_da) VALUES (?, ?, ?, ?, ?, ?)",
            [card.the_id, card.loai_the, card.img, card.phi_kich_hoat, card.so_du_toi_thieu, card.diem_thuong, card.so_xe_toi_da]
        );

        return new Response(
            JSON.stringify({ message: "Thẻ mới đã được thêm!"}),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error adding card:", error.message);
        return new Response(
            JSON.stringify({ message: "Lỗi thêm thẻ mới!", error: error.message }),
            { status: 500 }
        );
    }
}
