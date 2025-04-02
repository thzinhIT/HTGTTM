import pool from "@/db.js";

// Cập nhật điểm thưởng sau khi thanh toán bằng tiền
export async function updatePoints(userId, theId, thanhTien) {
    try {
        if (!userId || !theId || !thanhTien) {
            throw new Error("Thiếu thông tin cần thiết!");
        }

        // Tính số điểm thưởng dựa trên số tiền thanh toán (1 điểm = 1000 đồng)
        const diemThuongMoi = Math.floor(thanhTien / 1000);

        // Lấy thông tin hiện tại của thẻ
        const [rows] = await pool.execute("SELECT so_du_diem, diem_con_lai FROM the_nguoi_dung WHERE the_id = ?", [theId]);

        if (rows.length === 0) {
            throw new Error("Thẻ không tồn tại!");
        }

        const { so_du_diem, diem_con_lai } = rows[0];
        const diemMoi = parseInt(diem_con_lai) + diemThuongMoi;

        // Cập nhật thông tin điểm mới
        await pool.execute(
            "UPDATE the_nguoi_dung SET so_du_diem = ?, diem_con_lai = ? WHERE the_id = ?",
            [so_du_diem + diemThuongMoi, diemMoi, theId]
        );

        console.log(`Điểm thưởng đã được cập nhật thành công! Thẻ ID: ${theId}`);
    } catch (error) {
        console.error("Lỗi khi cập nhật điểm thưởng:", error.message);
        throw new Error("Không thể cập nhật điểm thưởng!");
    }
}

// Thanh toán bằng điểm (trừ điểm đã sử dụng và hiển thị số điểm đã dùng)
export async function thanhToanBangPoint(userId, theId, diemSuDung) {
    try {
        if (!userId || !theId || !diemSuDung) {
            throw new Error("Thiếu thông tin cần thiết để thực hiện thanh toán!");
        }

        // Lấy thông tin hiện tại của thẻ
        const [rows] = await pool.execute(
            "SELECT diem_da_su_dung, diem_con_lai FROM the_nguoi_dung WHERE the_id = ?",
            [theId]
        );

        if (rows.length === 0) {
            throw new Error("Thẻ không tồn tại!");
        }

        const { diem_da_su_dung, diem_con_lai } = rows[0];

        if (diem_con_lai < diemSuDung) {
            throw new Error("Số điểm không đủ để thanh toán!");
        }

        // Tính toán giá trị mới sau khi sử dụng điểm
        const diemDaSuDungMoi = parseInt(diem_da_su_dung) + parseInt(diemSuDung);
        const diemConLaiMoi = parseInt(diem_con_lai) - parseInt(diemSuDung);

        // Cập nhật thông tin thẻ trong database
        await pool.execute(
            "UPDATE the_nguoi_dung SET diem_da_su_dung = ?, diem_con_lai = ? WHERE the_id = ?",
            [diemDaSuDungMoi, diemConLaiMoi, theId]
        );

        console.log(`Điểm đã được trừ thành công! Tổng điểm đã sử dụng: ${diemDaSuDungMoi}. Thẻ ID: ${theId}`);
    } catch (error) {
        console.error("Lỗi khi thanh toán bằng điểm:", error.message);
        throw new Error("Không thể thực hiện thanh toán bằng điểm!");
    }
}

// Xử lý API POST: Tích hợp thanh toán bằng tiền và điểm
export async function POST(req) {
    try {
        const { userId, theId, thanhTien, diemSuDung, loaiThanhToan } = await req.json();

        if (!userId || !theId || (!thanhTien && !diemSuDung)) {
            return Response.json({ message: "Thiếu thông tin cần thiết!" }, { status: 400 });
        }

        if (loaiThanhToan === "tien") {
            // Thanh toán bằng tiền và cập nhật điểm thưởng
            await updatePoints(userId, theId, thanhTien);
        } else if (loaiThanhToan === "diem") {
            // Thanh toán bằng điểm
            await thanhToanBangPoint(userId, theId, diemSuDung);
        } else {
            return Response.json({ message: "Loại thanh toán không hợp lệ!" }, { status: 400 });
        }

        return Response.json({ message: "Thanh toán thành công!" }, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Lỗi khi xử lý thanh toán!", error: error.message }, { status: 500 });
    }
}
