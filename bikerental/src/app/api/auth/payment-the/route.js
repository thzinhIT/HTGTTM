import pool from "@/db.js";
import nodemailer from "nodemailer";

// Xử lý thanh toán thẻ
export async function POST(req) {
    let connection;
    try {
        const { nguoiDungId, email, theId } = await req.json();

        // Kiểm tra thông tin bắt buộc
        if (!nguoiDungId || !email || !theId) {
            return Response.json({ message: "Thiếu thông tin cần thiết!" }, { status: 400 });
        }

        // Bắt đầu transaction
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Kiểm tra người dùng tồn tại
        const [userRows] = await connection.execute("SELECT id FROM users WHERE id = ?", [nguoiDungId]);
        if (userRows.length === 0) {
            throw new Error("Người dùng không tồn tại!");
        }

        // Lấy thông tin thẻ từ bảng the
        const [theRows] = await connection.execute("SELECT * FROM the WHERE the_id = ?", [theId]);
        if (theRows.length === 0) {
            throw new Error("Thẻ không tồn tại!");
        }

        const { loai_the, phi_kich_hoat, diem_thuong } = theRows[0];

        let trangThaiGiaoDich = "thanh_cong";

        // Ghi giao dịch vào bảng giao_dich
        await connection.execute(
            "INSERT INTO giao_dich (nguoi_dung_id, email, phuong_thuc_thanh_toan, trang_thai_giao_dich) VALUES (?, ?, 'chuyen_khoan', ?)",
            [nguoiDungId, email, trangThaiGiaoDich]
        );

        // Thêm dữ liệu vào bảng the_nguoi_dung
        await insertTheNguoiDung(nguoiDungId, theId, loai_the, phi_kich_hoat, diem_thuong, connection);

        // Commit transaction trước khi gửi email
        await connection.commit();

        // Gửi email xác nhận giao dịch
        await sendEmail(email, "Xác nhận giao dịch thẻ", `Giao dịch thẻ của bạn (ID: ${theId}) đã được thực hiện thành công!`);

        return Response.json({ message: "Thanh toán thẻ thành công!" }, { status: 201 });
    } catch (error) {
        // Nếu có lỗi, rollback transaction
        if (connection) {
            await connection.rollback();
        }
        return Response.json({ message: "Lỗi khi xử lý thanh toán thẻ!", error: error.message }, { status: 500 });
    } finally {
        // Đảm bảo giải phóng connection
        if (connection) {
            connection.release();
        }
    }
}

// Thêm dữ liệu vào bảng the_nguoi_dung
async function insertTheNguoiDung(nguoiDungId, theId, loaiThe, phiKichHoat, diemThuong, connection) {
    try {
        // Xác định ngày mua và ngày hết hạn (thẻ có thời hạn 1 năm)
        const ngayMua = new Date();
        const ngayHetHan = new Date();
        ngayHetHan.setFullYear(ngayMua.getFullYear() + 1);

        // Tính toán điểm còn lại và số dư điểm
        const diemConLai = parseInt(diemThuong);
        const soDuDiem = parseFloat(phiKichHoat).toFixed(2); // Đảm bảo kiểu DECIMAL(10,2)

        // Thêm dữ liệu vào bảng the_nguoi_dung
        await connection.execute(
            "INSERT INTO the_nguoi_dung (id, the_id, loai_the, so_du_diem, diem_da_su_dung, diem_con_lai, ngay_mua, ngay_het_han) VALUES (?, ?, ?, ?, 0, ?, ?, ?)",
            [nguoiDungId, theId, loaiThe, soDuDiem, diemConLai, ngayMua.toISOString().split('T')[0], ngayHetHan.toISOString().split('T')[0]]
        );

        console.log("Dữ liệu thẻ đã được thêm vào bảng the_nguoi_dung thành công!");
    } catch (error) {
        console.error("Lỗi khi thêm dữ liệu vào bảng the_nguoi_dung:", error.message);
        throw new Error("Không thể thêm dữ liệu vào bảng the_nguoi_dung!");
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