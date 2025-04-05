import pool from "@/db.js";

export async function PUT(req) {
    try {
        const { cardId, updatedInfo } = await req.json();

        await pool.execute(
            "UPDATE `the` SET loai_the = ?, phi_kich_hoat = ?, so_du_toi_thieu = ?, diem_thuong = ?, so_xe_toi_da = ? WHERE the_id = ?",
            [updatedInfo.loai_the, updatedInfo.phi_kich_hoat, updatedInfo.so_du_toi_thieu, updatedInfo.diem_thuong, updatedInfo.so_xe_toi_da, cardId]
        );

        return new Response(
            JSON.stringify({ message: "Thông tin thẻ đã được cập nhật!" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating card:", error.message);
        return new Response(
            JSON.stringify({ message: "Lỗi cập nhật thông tin thẻ!", error: error.message }),
            { status: 500 }
        );
    }
}
