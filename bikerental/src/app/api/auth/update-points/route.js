import pool from "@/db.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"; // Cần thiết để gửi email

const SECRET_KEY = "mysecretkey"; // Nên đặt vào biến môi trường trong thực tế

export const POST = async (req) => {
    let connection;
    try {
        const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
        const id = searchParams.get("id") || "1";

        if (!id) {
            return new Response(JSON.stringify({ message: "Thiếu thông tin điểm TNGO!" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const { soLuong } = await req.json();

        if (!soLuong || parseInt(soLuong) <= 0) {
            return new Response(JSON.stringify({ message: "Số lượng không hợp lệ!" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Lấy dữ liệu nạp từ bảng bang_gia
        const [rows] = await pool.execute(
            "SELECT diem_tngo FROM bang_gia WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy thông tin thẻ." });
        }

        const { diem_tngo } = rows[0];

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

        const userId = decoded.id;
        const email = decoded.email;

        // Lấy số dư người dùng
        const [userRows] = await pool.execute(
            "SELECT so_du_diem FROM the_nguoi_dung WHERE id = ?",
            [userId]
        );

        if (userRows.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy người dùng." });
        }

        const so_du_diem = parseFloat(userRows[0].so_du_diem) + parseFloat(diem_tngo) * parseInt(soLuong);
        // Cập nhật số dư
        await pool.execute(
            "UPDATE the_nguoi_dung SET so_du_diem = ? WHERE id = ?",
            [so_du_diem, userId]
        );

        // ✅ Gửi email xác nhận
        await sendEmail({
            toEmail: email,
        });

        await connection.commit();
        return new Response(JSON.stringify({ message: "Nạp thẻ thành công!" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        if (connection) await connection.rollback();
        console.error("Lỗi:", error.message);
        return new Response(JSON.stringify({ message: "Lỗi xử lý!", error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });

    } finally {
        if (connection) connection.release();
    }
};

async function sendEmail({ toEmail, username }) {
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
        subject: "🎉 Bạn đã nạp điểm tngo cho thẻ thành công!",
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; background-color: #f9fafb;">
            <p style="font-size: 26px; color: #334155;">Cảm ơn bạn vì đã sử dụng dịch vụ nạp điểm thẻ RFID của website,</p>
            <hr style="margin: 24px 0;">
            <p style="font-size: 14px; color: #6b7280;">Nếu có bất kỳ thắc mắc nào, hãy phản hồi lại email này nhé.</p>
          </div>
        `,
    };

    await transporter.sendMail(mailOptions);
}
