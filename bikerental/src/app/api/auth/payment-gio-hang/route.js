import pool from "@/db.js";
import nodemailer from "nodemailer";

// Xử lý thanh toán giỏ hàng (bằng chuyển khoản hoặc điểm)
export async function POST(req) {
    try {
        const { nguoiDungId, email, phuongThucThanhToan, theId, veId, diemSuDung } = await req.json();

        if (!nguoiDungId || !email || !phuongThucThanhToan) {
            return Response.json({ message: "Thiếu thông tin cần thiết!" }, { status: 400 });
        }

        let trangThaiGiaoDich = "thanh_cong";

        if (phuongThucThanhToan === "chuyen_khoan" || phuongThucThanhToan === "diem") {
            // Ghi giao dịch vào bảng giao_dich
            await pool.execute(
                "INSERT INTO giao_dich (nguoi_dung_id, email, phuong_thuc_thanh_toan, trang_thai_giao_dich) VALUES (?, ?, ?, ?)",
                [nguoiDungId, email, phuongThucThanhToan, trangThaiGiaoDich]
            );

            // Nếu thanh toán bằng điểm, trừ điểm trong thẻ
            if (phuongThucThanhToan === "diem") {
                await thanhToanBangPoint(nguoiDungId, theId, diemSuDung);
            }

            // Thêm dữ liệu vào bảng thong_tin_nguoi_dung
            await insertGioHang(nguoiDungId, theId, veId);

            // Gửi email xác nhận giao dịch
            await sendEmail(email, "Xác nhận giao dịch giỏ hàng", `Giao dịch giỏ hàng của bạn đã được thực hiện thành công!`);
            return Response.json({ message: "Thanh toán giỏ hàng thành công!" }, { status: 201 });
        } else {
            return Response.json({ message: "Phương thức thanh toán không hợp lệ!" }, { status: 400 });
        }
    } catch (error) {
        return Response.json({ message: "Lỗi khi xử lý thanh toán giỏ hàng!", error: error.message }, { status: 500 });
    }
}

// Thêm dữ liệu vào bảng ve_nguoi_dung
async function insertVeNguoiDung(veId, tenVe, soLuong) {
    try {
        // Xác định ngày mua và ngày hết hạn (ví dụ: vé có thời hạn 30 ngày kể từ ngày mua)
        const ngayMua = new Date();
        const ngayHetHan = new Date();
        ngayHetHan.setDate(ngayMua.getDate() + 30); // Giả định vé hết hạn sau 30 ngày

        // Thêm thông tin vào bảng ve_nguoi_dung
        await pool.execute(
            "INSERT INTO ve_nguoi_dung (ve_id, ten_ve, ngay_mua, ngay_het_han, so_luong) VALUES (?, ?, ?, ?, ?)",
            [veId, tenVe, ngayMua.toISOString().split('T')[0], ngayHetHan.toISOString().split('T')[0], soLuong]
        );

        console.log("Dữ liệu vé đã được thêm vào bảng ve_nguoi_dung thành công!");
    } catch (error) {
        console.error("Lỗi khi thêm dữ liệu vào bảng ve_nguoi_dung:", error.message);
        throw new Error("Không thể thêm dữ liệu vào bảng ve_nguoi_dung!");
    }
}



// Thanh toán bằng điểm
async function thanhToanBangPoint(userId, theId, diemSuDung) {
    try {
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

        const diemDaSuDungMoi = parseInt(diem_da_su_dung) + parseInt(diemSuDung);
        const diemConLaiMoi = parseInt(diem_con_lai) - parseInt(diemSuDung);

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

// Gửi email xác nhận
async function sendEmail(to, subject, message) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "your-email@gmail.com",
            pass: "your-email-password",
        },
    });

    const mailOptions = {
        from: "your-email@gmail.com",
        to,
        subject,
        text: message,
    };

    await transporter.sendMail(mailOptions);
}
