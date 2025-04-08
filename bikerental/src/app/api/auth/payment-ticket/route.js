import pool from "@/db.js";
import jwt from "jsonwebtoken";

const SECRET_KEY = "mysecretkey"; // Nên đặt vào biến môi trường trong thực tế

export const POST = async (req) => {
    let connection;
    try {
        const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
        const ve_id = searchParams.get("ve_id") || "1";

        if (!ve_id) {
            return new Response(JSON.stringify({ message: "Thiếu thông tin vé!" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // ✅ Lấy token từ header: "Authorization: Bearer TOKEN"
        const authHeader = req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return new Response(JSON.stringify({ message: "Thiếu hoặc sai định dạng token!" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        const token = authHeader.split(" ")[1]; // Lấy phần TOKEN phía sau "Bearer"

        // ✅ Giải mã token
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

        // ✅ Lấy body (vẫn cần `soLuong`)
        const { soLuong } = await req.json();

        if (!soLuong || parseInt(soLuong) <= 0) {
            return new Response(JSON.stringify({ message: "Số lượng không hợp lệ!" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // 🔁 Xử lý logic giống như cũ (giao dịch DB, cập nhật điểm, v.v.)
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [userRows] = await connection.execute(
            "SELECT id, ten_nguoi_dung, so_du_diem, diem_da_su_dung, loai_the FROM the_nguoi_dung WHERE id = ?",
            [Id]
        );

        if (userRows.length === 0) throw new Error("Không tìm thấy người dùng!");

        const { ten_nguoi_dung, so_du_diem, diem_da_su_dung, loai_the } = userRows[0];

        const [veRows] = await connection.execute(
            "SELECT ten_ve, diem_tngo, thoi_han FROM ve WHERE ve_id = ?",
            [ve_id]
        );

        if (veRows.length === 0) throw new Error("Không tìm thấy vé!");

        const { ten_ve, diem_tngo, thoi_han } = veRows[0];
        const tongDiemThanhToan = diem_tngo * soLuong;

        const minBalance = {
            RideUp: 100000,
            Prenium: 1000000,
            VIP: 5000000,
        };

        const minRequiredBalance = minBalance[loai_the] || 0;

        if (so_du_diem - tongDiemThanhToan < minRequiredBalance) {
            throw new Error(`Số dư thấp hơn mức tối thiểu (${minRequiredBalance.toLocaleString()})!`);
        }

        const diemConLai = so_du_diem - tongDiemThanhToan;
        const diemDaSuDungMoi = diem_da_su_dung + tongDiemThanhToan;

        await connection.execute(
            "UPDATE the_nguoi_dung SET so_du_diem = ?, diem_da_su_dung = ? WHERE id = ?",
            [diemConLai, diemDaSuDungMoi, Id]
        );

        const ngayMua = new Date().toISOString().split("T")[0];

        await connection.execute(
            "INSERT INTO ve_nguoi_dung (id, ve_id, ten_nguoi_dung, ten_ve, ngay_mua, thoi_han, so_luong) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [Id, ve_id, ten_nguoi_dung, ten_ve, ngayMua, thoi_han, soLuong]
        );

        await connection.commit();
        return new Response(JSON.stringify({ message: "Thanh toán vé thành công!" }), {
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
