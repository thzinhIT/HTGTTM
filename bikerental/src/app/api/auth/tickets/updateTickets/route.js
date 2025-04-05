import pool from "@/db.js";

export async function PUT(req) {
    try {
        const { ticketId, updatedInfo } = await req.json();

        await pool.execute(
            "UPDATE `ve` SET ten_ve = ?, diem_tngo = ?, thoi_gian_hieu_luc = ?, hieu_luc = ?, phi_phat_sinh = ?, ghi_chu = ? WHERE ve_id = ?",
            [updatedInfo.ten_ve, updatedInfo.diem_tngo, updatedInfo.thoi_gian_hieu_luc, updatedInfo.hieu_luc, updatedInfo.phi_phat_sinh, updatedInfo.ghi_chu, ticketId]
        );

        return new Response(
            JSON.stringify({ message: "Thông tin vé đã được cập nhật!" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating ticket:", error.message);
        return new Response(
            JSON.stringify({ message: "Lỗi cập nhật thông tin vé!", error: error.message }),
            { status: 500 }
        );
    }
}
