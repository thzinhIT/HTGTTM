import pool from "@/db.js";

export async function PUT(req) {
    try {
        // Lấy 'ticketId' từ query parameters
        const { searchParams } = new URL(req.url);
        const ve_id = searchParams.get("ve_id");

        // Kiểm tra nếu thiếu ticketId
        if (!ve_id) {
            return new Response(JSON.stringify({ message: "Thiếu thông tin vé!" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const { ten_ve, loai_xe, diem_tngo, thoi_luong, thoi_han, phi_phat_sinh, ghi_chu } = await req.json();

        if (!ten_ve || !loai_xe || !diem_tngo || !thoi_luong || !thoi_han || !phi_phat_sinh || !ghi_chu) {
            return Response.json({ message: "Thiếu thông tin bắt buộc!" }, { status: 400 });
        }


        // Cập nhật thông tin thẻ trong cơ sở dữ liệu
        await pool.execute(
            "UPDATE `ve` SET ten_ve = ?, loai_xe = ?, diem_tngo = ?, thoi_luong = ?, thoi_han = ?, phi_phat_sinh = ?, ghi_chu = ? WHERE ve_id = ?",
            [ten_ve, loai_xe, diem_tngo, thoi_luong, thoi_han, phi_phat_sinh, ghi_chu, ve_id]
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
