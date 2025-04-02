import pool from "@/db.js";

// Xử lý thêm vé vào giỏ hàng
export async function POST(req) {
    try {
        const { nguoiDungId, veId, soLuong } = await req.json();

        if (!nguoiDungId || !veId || !soLuong) {
            return Response.json({ message: "Thiếu thông tin cần thiết!" }, { status: 400 });
        }

        // Kiểm tra vé có tồn tại trong bảng ve
        const [rows] = await pool.execute("SELECT ten_ve, diem_tngo FROM ve WHERE ve_id = ?", [veId]);
        if (rows.length === 0) {
            return Response.json({ message: "Vé không tồn tại!" }, { status: 404 });
        }

        const { ten_ve, diem_tngo } = rows[0];

        // Tính giá dựa trên số điểm tùy chọn
        const gia = diem_tngo * soLuong;

        // Thêm thông tin vào giỏ hàng
        await pool.execute(
            "INSERT INTO gio_hang (nguoi_dung_id, ten_ve, so_luong, gia, ngay_tao) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)",
            [nguoiDungId, ten_ve, soLuong, gia]
        );

        return Response.json({ message: "Vé đã được thêm vào giỏ hàng!", data: { ten_ve, soLuong, gia } }, { status: 201 });
    } catch (error) {
        return Response.json({ message: "Lỗi khi thêm vé vào giỏ hàng!", error: error.message }, { status: 500 });
    }
}
