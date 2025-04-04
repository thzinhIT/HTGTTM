import pool from "@/db.js";
import nodemailer from "nodemailer";

// Xử lý thanh toán giỏ hàng (bằng chuyển khoản hoặc điểm)
export async function POST(req) {
    let connection;
    try {
        const { nguoiDungId, email, phuongThucThanhToan, theId, veId, diemSuDung } = await req.json();

        // Kiểm tra thông tin bắt buộc
        if (!nguoiDungId || !email || !phuongThucThanhToan || !veId) {
            return Response.json({ message: "Thiếu thông tin cần thiết!" }, { status: 400 });
        }

        // Kiểm tra thêm cho thanh toán bằng điểm
        if (phuongThucThanhToan === "diem" && (!theId || !diemSuDung || diemSuDung <= 0)) {
            return Response.json({ message: "Thông tin điểm hoặc thẻ không hợp lệ!" }, { status: 400 });
        }

        // Bắt đầu transaction
        connection = await pool.getConnection();
        await connection.beginTransaction();

        let trangThaiGiaoDich = "thanh_cong";

        if (phuongThucThanhToan === "chuyen_khoan" || phuongThucThanhToan === "diem") {
            // Ghi giao dịch vào bảng giao_dich
            await connection.execute(
                "INSERT INTO giao_dich (nguoi_dung_id, email, phuong_thuc_thanh_toan, trang_thai_giao_dich) VALUES (?, ?, ?, ?)",
                [nguoiDungId, email, phuongThucThanhToan, trangThaiGiaoDich]
            );

            // Nếu thanh toán bằng điểm, trừ điểm trong thẻ
            if (phuongThucThanhToan === "diem") {
                await thanhToanBangPoint(nguoiDungId, theId, diemSuDung, connection);
            }

            // Lấy thông tin vé từ bảng ve
            const [veRows] = await connection.execute("SELECT ten_ve FROM ve WHERE ve_id = ?", [veId]);
            if (veRows.length === 0) {
                throw new Error("Vé không tồn tại!");
            }
            const { ten_ve } = veRows[0];

            // Thêm dữ liệu vào bảng ve_nguoi_dung (thay insertGioHang)
            await insertVeNguoiDung(veId, ten_ve, 1, connection);

            // Commit transaction trước khi gửi email
            await connection.commit();

            // Gửi email xác nhận giao dịch
            await sendEmail(email, "Xác nhận giao dịch giỏ hàng", `Giao dịch giỏ hàng của bạn đã được thực hiện thành công!`);

            return Response.json({ message: "Thanh toán giỏ hàng thành công!" }, { status: 201 });
        } else {
            return Response.json({ message: "Phương thức thanh toán không hợp lệ!" }, { status: 400 });
        }
    } catch (error) {
        // Nếu có lỗi, rollback transaction
        if (connection) {
            await connection.rollback();
        }
        return Response.json({ message: "Lỗi khi xử lý thanh toán giỏ hàng!", error: error.message }, { status: 500 });
    } finally {
        // Đảm bảo giải phóng connection
        if (connection) {
            connection.release();
        }
    }
}

// Thêm dữ liệu vào bảng ve_nguoi_dung
async function insertVeNguoiDung(nguoiDungId, veId, tenVe, soLuong, connection) {
    try {
        const ngayMua = new Date();
        const ngayHetHan = new Date();
        ngayHetHan.setDate(ngayMua.getDate() + 30);

        await connection.execute(
            "INSERT INTO ve_nguoi_dung (id, ve_id, ten_ve, ngay_mua, ngay_het_han, so_luong) VALUES (?, ?, ?, ?, ?, ?)",
            [nguoiDungId, veId, tenVe, ngayMua.toISOString().split('T')[0], ngayHetHan.toISOString().split('T')[0], soLuong]
        );

        console.log("Dữ liệu vé đã được thêm vào bảng ve_nguoi_dung thành công!");
    } catch (error) {
        console.error("Lỗi khi thêm dữ liệu vào bảng ve_nguoi_dung:", error.message);
        throw new Error("Không thể thêm dữ liệu vào bảng ve_nguoi_dung!");
    }
}


// Thanh toán bằng điểm
async function thanhToanBangPoint(userId, theId, diemSuDung, connection) {
    try {
        const [rows] = await connection.execute(
            "SELECT diem_da_su_dung, diem_con_lai FROM the_nguoi_dung WHERE the_id = ? AND id = ?",
            [theId, userId]
        );

        if (rows.length === 0) {
            throw new Error("Thẻ không tồn tại hoặc không thuộc về người dùng này!");
        }

        const { diem_da_su_dung, diem_con_lai } = rows[0];
        if (diem_con_lai < diemSuDung) {
            throw new Error("Số điểm không đủ để thanh toán!");
        }

        const diemDaSuDungMoi = parseInt(diem_da_su_dung) + parseInt(diemSuDung);
        const diemConLaiMoi = parseInt(diem_con_lai) - parseInt(diemSuDung);

        await connection.execute(
            "UPDATE the_nguoi_dung SET diem_da_su_dung = ?, diem_con_lai = ? WHERE the_id = ? AND id = ?",
            [diemDaSuDungMoi, diemConLaiMoi, theId, userId]
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
            user: process.env.EMAIL_USER || "your-email@gmail.com",
            pass: process.env.EMAIL_PASS || "your-email-password",
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER || "your-email@gmail.com",
        to,
        subject,
        text: message,
    };

    await transporter.sendMail(mailOptions);
}