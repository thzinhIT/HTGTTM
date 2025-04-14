import pool from "@/db.js";

export async function PUT(req) {
    try {
        // Lấy id của bảng giá từ query parameters
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        // Kiểm tra nếu thiếu id
        if (!id) {
            return new Response(JSON.stringify({ message: "Thiếu thông tin của bảng giá!" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const { diem_tngo, phi_nap, imgMoney } = await req.json();

        if (!diem_tngo|| !phi_nap || !imgMoney) {
            return Response.json({ message: "Thiếu thông tin bắt buộc!" }, { status: 400 });
        }

        const [rows] = await pool.execute(
            "SELECT COUNT(*) AS count FROM `bang_gia` WHERE diem_tngo = ? AND phi_nap = ? AND imgMoney = ? AND id = ?",
            [diem_tngo, phi_nap, imgMoney, id]
        );

        if (rows[0].count > 0) {
            return new Response(
                JSON.stringify({ message: "Thông tin đã tồn tại, không thể cập nhật!" }),
                { status: 400 }
            );
        }


        // Cập nhật thông tin thẻ trong cơ sở dữ liệu
        await pool.execute(
            "UPDATE `bang_gia` SET diem_tngo = ?, phi_nap = ?, imgMoney = ? WHERE id = ?",
            [diem_tngo, phi_nap, imgMoney, id]
        );


        return new Response(
            JSON.stringify({ message: "Thông tin bảng giá đã được cập nhật!" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating ticket:", error.message);
        return new Response(
            JSON.stringify({ message: "Lỗi cập nhật thông tin bảng giá!", error: error.message }),
            { status: 500 }
        );
    }
}
