import pool from "@/db.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"; // Nếu bạn muốn gửi email thật
import { sendEmail } from "@/app/api/auth/sendEmail"; // Nếu bạn muốn gửi email thật


export const POST = async (req) => {
    let connection;
    try {
        const { searchParams } = new URL(req.url);
        const theId = searchParams.get("theId");

        if (!theId) {
            return new Response(JSON.stringify({ message: "Thiếu thông tin theId!" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Lấy email và password từ body
        const { email, password } = await req.json();

        if (!email || !password) {
            return new Response(JSON.stringify({ message: "Vui lòng nhập email và mật khẩu!" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        connection = await pool.getConnection();

        // Kiểm tra người dùng trong DB
        const [rows] = await connection.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return new Response(JSON.stringify({ message: "Email hoặc mật khẩu không đúng!" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        const user = rows[0];

        // Kiểm tra mật khẩu mã hóa
        let isMatch = false;
        if (user.password.startsWith("$2a$") || user.password.startsWith("$2b$")) {
            isMatch = await bcrypt.compare(password, user.password);
        }

        if (!isMatch) {
            // Hoặc kiểm tra mật khẩu gốc nếu bạn đang test
            isMatch = password === "mypassword";
        }

        if (!isMatch) {
            return new Response(JSON.stringify({ message: "Email hoặc mật khẩu không đúng!" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        const nguoiDungId = user.id;
        const tenNguoiDung = user.username;

        // Lấy thông tin thẻ
        const [theRows] = await connection.execute(
            "SELECT * FROM the WHERE the_id = ?",
            [theId]
        );

        if (theRows.length === 0) {
            return new Response(JSON.stringify({ message: "Thẻ không tồn tại!" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        const { loai_the, phi_kich_hoat, diem_thuong } = theRows[0];
        const diemConLai = diem_thuong || 0;

        // Ngày mua & hết hạn
        const ngayMua = new Date().toISOString().split("T")[0];
        const ngayHetHan = new Date();
        ngayHetHan.setFullYear(ngayHetHan.getFullYear() + 1);
        const formattedNgayHetHan = ngayHetHan.toISOString().split("T")[0];

        // Ghi vào bảng the_nguoi_dung
        await connection.execute(
            "INSERT INTO the_nguoi_dung (id, ten_nguoi_dung, the_id, loai_the, so_du_diem, diem_da_su_dung, diem_con_lai, ngay_mua, ngay_het_han) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [nguoiDungId, tenNguoiDung, theId, loai_the, phi_kich_hoat, 0, diemConLai, ngayMua, formattedNgayHetHan]
        );

        // Gửi email nếu cần (đang để comment nếu bạn muốn bật sau)
        await sendEmail({
            toEmail: email,
            username: tenNguoiDung,
            theId,
          });
          

        return new Response(
            JSON.stringify({
                message: "Thanh toán thẻ thành công!",
                data: {
                    nguoiDungId,
                    tenNguoiDung,
                    theId,
                    loai_the,
                    phi_kich_hoat,
                    diemConLai,
                    ngayMua,
                    ngayHetHan: formattedNgayHetHan,
                },
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Lỗi:", error.message);
        return new Response(JSON.stringify({ message: "Lỗi xử lý!", error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    } finally {
        if (connection) connection.release();
    }
};
