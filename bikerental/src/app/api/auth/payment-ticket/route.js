import pool from "@/db.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"; // Cần thiết để gửi email

const SECRET_KEY = "mysecretkey"; // Nên đặt vào biến môi trường trong thực tế

export const POST = async (req) => {
    let connection;
    try {
        const { searchParams } = new URL(req.url);
        const ve_id = searchParams.get("ve_id");

        if (!ve_id) {
            return new Response(JSON.stringify({ message: "Thiếu thông tin vé!" }), {
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

        const Id = decoded.id;
        const email = decoded.email;

        const { soLuong } = await req.json();

        if (!soLuong || parseInt(soLuong) <= 0) {
            return new Response(JSON.stringify({ message: "Số lượng không hợp lệ!" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [userRows] = await connection.execute(
            "SELECT id, ten_nguoi_dung, so_du_diem, diem_da_su_dung, loai_the FROM the_nguoi_dung WHERE id = ?",
            [Id]
        );

        if (userRows.length === 0)  return new Response(
            JSON.stringify({
                message: `Bạn chưa có thẻ để thanh toán!`,
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );


        const { ten_nguoi_dung, so_du_diem, diem_da_su_dung, loai_the } = userRows[0];

        const [veRows] = await connection.execute(
            "SELECT ten_ve, loai_xe, diem_tngo, thoi_han FROM ve WHERE ve_id = ?",
            [ve_id]
        );

        if (veRows.length === 0) throw new Error("Không tìm thấy vé!");

        const { ten_ve, loai_xe, diem_tngo, thoi_han } = veRows[0];
        const tongDiemThanhToan = diem_tngo * soLuong;

        const [balanceRows] = await connection.execute(
            "SELECT loai_the, so_du_toi_thieu FROM the"
        );
        if (balanceRows.length === 0) throw new Error("Không tìm thấy thông tin thẻ!");

        const minBalance = balanceRows.reduce((acc, row) => {
            acc[row.loai_the] = row.so_du_toi_thieu; // ánh xạ loai_the vào so_du_toi_thieu
            return acc;
        }, {});


        const minRequiredBalance = minBalance[loai_the] || 0;

        if (so_du_diem - tongDiemThanhToan < minRequiredBalance) {
            return new Response(
                JSON.stringify({
                    message: `Thẻ của bạn chưa đủ số dư tối thiểu để mở thẻ!`,
                }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }


        const diemConLai = so_du_diem - tongDiemThanhToan;
        const diemDaSuDungMoi = diem_da_su_dung + tongDiemThanhToan;

        await connection.execute(
            "UPDATE the_nguoi_dung SET so_du_diem = ?, diem_da_su_dung = ? WHERE id = ?",
            [diemConLai, diemDaSuDungMoi, Id]
        );

        const ngayMua = new Date().toISOString().split("T")[0];

        await connection.execute(
            "INSERT INTO ve_nguoi_dung (users_id, ten_nguoi_dung, ve_id, loai_xe, ten_ve, ngay_mua, thoi_han, so_luong) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [Id, ten_nguoi_dung, ve_id, loai_xe, ten_ve, ngayMua, thoi_han, soLuong]
        );

        // ✅ Gửi email xác nhận
        await sendEmail({
            toEmail: email,
            username: ten_nguoi_dung,
            theId: ve_id,
            loai_the: loai_the,
            phi_kich_hoat: `${tongDiemThanhToan} điểm`,
            diemConLai,
            ngayMua,
            ngayHetHan: thoi_han,
        });

        await connection.commit();
        return new Response(JSON.stringify({ message: "Thanh toán vé thành công!" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        if (connection) await connection.rollback();
        console.error("Lỗi:", error.message);
        return new Response(JSON.stringify({ message: "Bạn không có thẻ để thanh toán, vui lòng mua thẻ để tiếp tục!", error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });

    } finally {
        if (connection) connection.release();
    }
};

async function sendEmail({ toEmail, username, ve_id, ngayMua, ngayHetHan }) {
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
        subject: "🎉 Bạn đã thanh toán vé thành công!",
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; background-color: #f9fafb;">
            <h2 style="color: #1d4ed8; text-align: center;font-size: 26px;">📩 Cảm ơn bạn đã mua vé!</h2>
            <p style="font-size: 20px; color: #334155;">Xin chào <strong>${username}</strong>,</p>
            <p style="font-size: 20px; color: #334155;">Dưới đây là thông tin vé của bạn:</p>
            <ul style="list-style: none; padding: 0;font-size: 20px;">
              <li><strong>📌 Mã vé:</strong> ${ve_id}</li>
              <li><strong>📅 Ngày mua:</strong> ${ngayMua}</li>
              <li><strong>⏳ Hạn sử dụng:</strong> ${ngayHetHan}</li>
            </ul>
            <hr style="margin: 24px 0;">
            <p style="font-size: 14px; color: #6b7280;">Nếu có bất kỳ thắc mắc nào, hãy phản hồi lại email này nhé.</p>
          </div>
        `,
    };

    await transporter.sendMail(mailOptions);
}
