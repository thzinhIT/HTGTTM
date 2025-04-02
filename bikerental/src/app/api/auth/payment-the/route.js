import pool from "@/db.js";
import nodemailer from "nodemailer";

// Xử lý thanh toán thẻ
export async function POST(req) {
    try {
        const { nguoiDungId, email, theId } = await req.json();

        if (!nguoiDungId || !email || !theId) {
            return Response.json({ message: "Thiếu thông tin cần thiết!" }, { status: 400 });
        }

        let trangThaiGiaoDich = "thanh_cong";

        // Lấy thông tin thẻ từ bảng the
        const [the] = await pool.execute("SELECT * FROM the WHERE the_id = ?", [theId]);

        if (the.length === 0) {
            return Response.json({ message: "Thẻ không tồn tại!" }, { status: 404 });
        }

        const { phi_kich_hoat, diem_thuong } = the[0];

        // Ghi giao dịch vào bảng giao_dich
        await pool.execute(
            "INSERT INTO giao_dich (nguoi_dung_id, email, phuong_thuc_thanh_toan, trang_thai_giao_dich) VALUES (?, ?, 'chuyen_khoan', ?)",
            [nguoiDungId, email, trangThaiGiaoDich]
        );

        // Thêm dữ liệu vào bảng the_nguoi_dung
        await insertTheNguoiDung(theId, phi_kich_hoat, diem_thuong, nguoiDungId);

        // Gửi email xác nhận giao dịch
        await sendEmail(email, "Xác nhận giao dịch thẻ", `Giao dịch thẻ của bạn (ID: ${theId}) đã được thực hiện thành công!`);
        return Response.json({ message: "Thanh toán thẻ thành công!" }, { status: 201 });
    } catch (error) {
        return Response.json({ message: "Lỗi khi xử lý thanh toán thẻ!", error: error.message }, { status: 500 });
    }
}

// Thêm dữ liệu vào bảng the_nguoi_dung
async function insertTheNguoiDung(theId, loaiThe, soDuDiem, diemThuong) {
    try {
        // Xác định ngày mua và ngày hết hạn (giả định thẻ có thời hạn 1 năm)
        const ngayMua = new Date();
        const ngayHetHan = new Date();
        ngayHetHan.setFullYear(ngayMua.getFullYear() + 1);

        // Tính toán điểm còn lại
        const diemConLai = parseInt(diemThuong);

        // Thêm dữ liệu vào bảng the_nguoi_dung
        await pool.execute(
            "INSERT INTO the_nguoi_dung (the_id, loai_the, so_du_diem, diem_da_su_dung, diem_con_lai, ngay_mua, ngay_het_han) VALUES (?, ?, ?, 0, ?, ?, ?)",
            [theId, loaiThe, soDuDiem, diemConLai, ngayMua.toISOString().split('T')[0], ngayHetHan.toISOString().split('T')[0]]
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
