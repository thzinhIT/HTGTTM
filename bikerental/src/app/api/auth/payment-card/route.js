// Các import ở đầu file
import pool from "@/db.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"; // Cần thiết để gửi email
const SECRET_KEY = "mysecretkey"; // Dùng biến môi trường thực tế


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

        const authHeader = req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return new Response(JSON.stringify({ message: "Thiếu hoặc sai định dạng token!" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        const token = authHeader.split(" ")[1];
        let decoded;
        try {
            decoded = jwt.verify(token, SECRET_KEY);
        } catch (err) {
            return new Response(JSON.stringify({ message: "Token không hợp lệ!" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        const email = decoded.email;
        connection = await pool.getConnection();
        const [userRows] = await connection.execute(
            "SELECT id, username FROM users WHERE email = ?",
            [email]
        );

        if (userRows.length === 0) {
            return new Response(JSON.stringify({ message: "Không tìm thấy người dùng!" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        const user = userRows[0];
        const nguoiDungId = user.id;
        const tenNguoiDung = user.username;

        

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

        const ngayMua = new Date().toISOString().split("T")[0];
        const ngayHetHan = new Date();
        ngayHetHan.setFullYear(ngayHetHan.getFullYear() + 1);
        const formattedNgayHetHan = ngayHetHan.toISOString().split("T")[0];

        await connection.execute(
            "INSERT INTO the_nguoi_dung (id, ten_nguoi_dung, the_id, loai_the, so_du_diem, diem_da_su_dung, ngay_mua, ngay_het_han) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [nguoiDungId, tenNguoiDung, theId, loai_the, phi_kich_hoat, 0, ngayMua, formattedNgayHetHan]
        );

        // ✅ Gửi email sau khi lưu thành công
        await sendEmail({
            toEmail: email,
            username: tenNguoiDung,
            theId,
            loai_the,
            phi_kich_hoat,
            diemConLai,
            ngayMua,
            ngayHetHan: formattedNgayHetHan,
        });

        return new Response(
            JSON.stringify({
                message: "Thanh toán thẻ thành công!",
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Lỗi:", error.message);
        return new Response(JSON.stringify({ message: "Thẻ của bạn đã tồn tại, bạn không thể mua thêm nữa!", error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    } finally {
        if (connection) connection.release();
    }
};

// =============================
// ======= sendEmail() ========
// =============================
async function sendEmail({ toEmail, username, theId, loai_the, phi_kich_hoat, diemConLai, ngayMua, ngayHetHan }) {
    const transporter = nodemailer.createTransport({
        service: "zoho",
        host: "smtpro.zoho.in",
        port: 465,
        secure: true,
        auth: {
            user: "thanhvinh@zohomail.com",
            pass: "Vinh12@6",
        },
    });

    const mailOptions = {
        from: '"Bike App" <thanhvinh@zohomail.com>',
        to: toEmail,
        subject: "🎉 Bạn đã thanh toán thẻ thành công!",
        html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; background-color: #f9fafb;">
            <style>
                li { margin-bottom: 3rem;} 
            </style>
                <h2 style="color: #1d4ed8; text-align: center;font-size: 30px;">📩 Cảm ơn bạn đã mua thẻ!</h2>
                    <p style="font-size: 20px; color: #334155;">Xin chào <strong>${username}</strong>,</p>
                    <p style="font-size: 20px; color: #334155;">Dưới đây là thông tin thẻ của bạn:</p>
                <ul style="list-style: none; padding: 0; font-size: 20px;">
                    <li><strong>📌 Mã thẻ:</strong> ${theId}</li>
                    <li><strong>💳 Loại thẻ:</strong> ${loai_the}</li>
                    <li><strong>💰 Phí kích hoạt:</strong> ${phi_kich_hoat}</li>
                    <li><strong>🎯 Điểm tặng ban đầu mua thẻ:</strong> ${diemConLai}</li>
                    <li><strong>📅 Ngày mua:</strong> ${ngayMua}</li>
                    <li><strong>⏳ Hạn sử dụng:</strong> ${ngayHetHan}</li>
                </ul>
            <hr style="margin: 24px 0;">
        <p style="font-size: 22px; color: #6b7280;">Nếu có bất kỳ thắc mắc nào, hãy phản hồi lại email này nhé.</p>
        </div>
        `,
    };

    await transporter.sendMail(mailOptions);
}
