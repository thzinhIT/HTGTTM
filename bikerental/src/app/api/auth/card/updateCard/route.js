import pool from "@/db.js";

export async function PUT(req) {
    try {
        // Lấy 'the_id' từ query parameters
        const { searchParams } = new URL(req.url);
        const the_id = searchParams.get("the_id");

        // Kiểm tra nếu thiếu the_id
        if (!the_id) {
            return new Response(JSON.stringify({ message: "Thiếu thông tin theId!" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Lấy dữ liệu cập nhật từ body của request
        const { loai_the, phi_kich_hoat, so_du_toi_thieu, diem_thuong, so_xe_toi_da } = await req.json();

        if (!loai_the || !phi_kich_hoat || !so_du_toi_thieu ||  !diem_thuong || !so_xe_toi_da) {
            return Response.json({ message: "Thiếu thông tin bắt buộc!" }, { status: 400 });
        }


        // Cập nhật thông tin thẻ trong cơ sở dữ liệu
        await pool.execute(
            "UPDATE `the` SET loai_the = ?, phi_kich_hoat = ?, so_du_toi_thieu = ?, diem_thuong = ?, so_xe_toi_da = ? WHERE the_id = ?",
            [loai_the, phi_kich_hoat, so_du_toi_thieu, diem_thuong, so_xe_toi_da, the_id]
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
