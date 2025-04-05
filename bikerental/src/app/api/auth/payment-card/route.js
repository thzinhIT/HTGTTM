import pool from "@/db.js";
import nodemailer from "nodemailer";
import crypto from "crypto"; // Để giải mã mật khẩu nếu được mã hóa

// Xử lý thanh toán thẻ
export async function POST(req) {
    let connection;
    try {
        const { theId } = await req.json();

        // Kiểm tra thông tin đầu vào
        if (!theId) {
            return Response.json({ message: "Thiếu thông tin theId!" }, { status: 400 });
        }

        // Bắt đầu transaction
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Lấy token mới nhất từ bảng user_tokens
        const [tokenRows] = await connection.execute(
            "SELECT user_id FROM user_tokens ORDER BY created_at DESC LIMIT 1"
        );

        if (tokenRows.length === 0) {
            throw new Error("Không tìm thấy token!");
        }

        const nguoiDungId = tokenRows[0]?.user_id || null; // Đảm bảo không bị undefined

        // Kiểm tra nếu `nguoiDungId` bị null
        if (!nguoiDungId) {
            throw new Error("Không xác định được người dùng từ token!");
        }

        // Lấy thông tin người dùng từ bảng users
        const [userRows] = await connection.execute(
            "SELECT username, email FROM users WHERE id = ?",
            [nguoiDungId]
        );

        if (userRows.length === 0) {
            throw new Error("Người dùng không tồn tại!");
        }

        const tenNguoiDung = userRows[0]?.username || null;
        const email = userRows[0]?.email || null;

        // Kiểm tra nếu `tenNguoiDung` hoặc `email` bị null
        if (!tenNguoiDung || !email) {
            throw new Error("Dữ liệu người dùng không hợp lệ!");
        }

        // Lấy thông tin thẻ từ bảng `the`
        const [theRows] = await connection.execute("SELECT * FROM the WHERE the_id = ?", [theId]);
        if (theRows.length === 0) {
            throw new Error("Thẻ không tồn tại!");
        }

        const { loai_the, phi_kich_hoat, diem_thuong } = theRows[0];

        // Tính toán điểm còn lại
        const diemConLai = diem_thuong || 0; // Đảm bảo không bị undefined

        // Chèn dữ liệu vào bảng `the_nguoi_dung`
        await connection.execute(
            "INSERT INTO the_nguoi_dung (id, ten_nguoi_dung, the_id, loai_the, so_du_diem, diem_da_su_dung, diem_con_lai, ngay_mua, ngay_het_han) VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 YEAR))",
            [nguoiDungId, tenNguoiDung, theId, loai_the, phi_kich_hoat || 0, 0, diemConLai]
        );


        // Commit transaction
        await connection.commit();

        // Gửi email xác nhận giao dịch
        await sendEmail(
            email,
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



async function sendEmail(userId, to, subject, text) {
    if (!to) {
        console.error("Địa chỉ email không hợp lệ!");
        return Promise.reject(new Error("Địa chỉ email không hợp lệ"));
    }

    let connection;

    try {
        // Kết nối tới cơ sở dữ liệu
        connection = await pool.getConnection();

        // Lấy thông tin email và mật khẩu (mã hóa) từ bảng `users`
        const [userRows] = await connection.execute(
            "SELECT email, encrypted_password FROM users WHERE id = ?",
            [userId]
        );

        if (userRows.length === 0) {
            throw new Error("Không tìm thấy thông tin người dùng!");
        }

        const { email: senderEmail, encrypted_password: encryptedPassword } = userRows[0];

        if (!senderEmail || !encryptedPassword) {
            throw new Error("Email hoặc mật khẩu gửi đi không hợp lệ!");
        }

        // Giải mã mật khẩu (ví dụ sử dụng AES hoặc các phương thức mã hóa an toàn)
        const decipher = crypto.createDecipheriv(
            "aes-256-cbc", // Thuật toán mã hóa
            "YOUR_SECRET_KEY", // Khóa bí mật dùng khi mã hóa
            "YOUR_IV" // Vector khởi tạo (Initialization Vector)
        );
        let decryptedPassword = decipher.update(encryptedPassword, "hex", "utf8");
        decryptedPassword += decipher.final("utf8");

        // Tạo transporter sử dụng email và mật khẩu đã giải mã
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: senderEmail, // Email gửi đi
                pass: decryptedPassword, // Mật khẩu đã giải mã
            },
        });

        // Thiết lập nội dung email
        const mailOptions = {
            from: senderEmail, // Địa chỉ email gửi
            to, // Địa chỉ email nhận
            subject, // Tiêu đề email
            text, // Nội dung email
        };

        // Gửi email
        const info = await transporter.sendMail(mailOptions);
        console.log("Email đã được gửi thành công:", info.response);
        return info;
    } catch (error) {
        console.error("Lỗi khi gửi email:", error.message);
        return Promise.reject(new Error("Không thể gửi email. Vui lòng thử lại sau."));
    } finally {
        // Đảm bảo giải phóng connection
        if (connection) {
            connection.release();
        }
    }
}
