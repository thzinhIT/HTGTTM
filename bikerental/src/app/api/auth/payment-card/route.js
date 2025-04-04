import pool from "@/db.js";
import nodemailer from "nodemailer";

// Xử lý thanh toán thẻ
export async function POST(req) {
    let connection;
    try {
        const { token, theId } = await req.json();

        // Kiểm tra thông tin bắt buộc
        if (!token || !theId) {
            return Response.json({ message: "Thiếu thông tin cần thiết!" }, { status: 400 });
        }

        // Bắt đầu transaction
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Xác thực token và lấy thông tin người dùng
        const [tokenRows] = await connection.execute("SELECT user_id FROM user_tokens WHERE token = ?", [token]);
        if (tokenRows.length === 0) {
            throw new Error("Token không hợp lệ hoặc đã hết hạn!");
        }

        const nguoiDungId = tokenRows[0].user_id;

        // Lấy thông tin người dùng từ bảng users
        const [userRows] = await connection.execute("SELECT user_name FROM users WHERE id = ?", [nguoiDungId]);
        if (userRows.length === 0) {
            throw new Error("Người dùng không tồn tại!");
        }

        const tenNguoiDung = userRows[0].user_name;

        // Lấy thông tin thẻ từ bảng `the`
        const [theRows] = await connection.execute("SELECT * FROM the WHERE the_id = ?", [theId]);
        if (theRows.length === 0) {
            throw new Error("Thẻ không tồn tại!");
        }

        const { loai_the, phi_kich_hoat, diem_thuong } = theRows[0];

        // Tính toán điểm còn lại
        const diemConLai = diem_thuong; // Giả định điểm thưởng ban đầu = điểm còn lại

        // Chèn dữ liệu vào bảng `the_nguoi_dung`
        await connection.execute(
            "INSERT INTO the_nguoi_dung (id, ten_nguoi_dung, the_id, loai_the, so_du_diem, diem_da_su_dung, diem_con_lai, ngay_mua, ngay_het_han) VALUES (?, ?, ?, ?, ?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 YEAR))",
            [Id ,tenNguoiDung, theId, loai_the, phi_kich_hoat, 0, diemConLai]
        );

        // Commit transaction
        await connection.commit();

        // Gửi email xác nhận giao dịch
        await sendEmail(
            tokenRows[0].email,
            "Xác nhận giao dịch thẻ",
            `Thẻ của bạn (ID: ${theId}) đã được kích hoạt thành công!`
        );

        return Response.json({ message: "Kích hoạt thẻ thành công!" }, { status: 201 });
    } catch (error) {
        // Nếu có lỗi, rollback transaction
        if (connection) {
            await connection.rollback();
        }
        return Response.json({ message: "Lỗi khi xử lý kích hoạt thẻ!", error: error.message }, { status: 500 });
    } finally {
        // Đảm bảo giải phóng connection
        if (connection) {
            connection.release();
        }
    }
}

// Hàm gửi email xác nhận giao dịch

async function sendEmail(to, subject, text) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@example.com',
            pass: 'your-email-password',
        },
    });

    const mailOptions = {
        from: 'your-email@example.com',
        to,
        subject,
        text,
    };

    return transporter.sendMail(mailOptions);
}
