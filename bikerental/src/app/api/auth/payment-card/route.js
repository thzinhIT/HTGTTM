import pool from "@/db.js";

export default async function handler(req, res) {
    let connection;
    try {
        // Kiểm tra phương thức HTTP
        if (req.method !== "GET") {
            return res.status(405).json({ message: "Chỉ hỗ trợ phương thức GET" });
        }

        // Lấy thông tin theId từ dynamic route (query params)
        const { theId } = req.query;

        // Kiểm tra thông tin đầu vào
        if (!theId) {
            return res.status(400).json({ message: "Thiếu thông tin theId!" });
        }

        // Bắt đầu kết nối đến cơ sở dữ liệu
        connection = await pool.getConnection();

        // Lấy token mới nhất từ bảng user_tokens (xác định người dùng hiện tại)
        const [tokenRows] = await connection.execute(
            "SELECT user_id FROM user_tokens ORDER BY created_at DESC LIMIT 1"
        );

        if (tokenRows.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy token!" });
        }

        const nguoiDungId = tokenRows[0]?.user_id || null;

        if (!nguoiDungId) {
            return res.status(404).json({ message: "Không xác định được người dùng từ token!" });
        }

        // Lấy thông tin người dùng từ bảng users
        const [userRows] = await connection.execute(
            "SELECT username FROM users WHERE id = ?", [nguoiDungId]
        );

        if (userRows.length === 0) {
            return res.status(404).json({ message: "Người dùng không tồn tại!" });
        }

        const tenNguoiDung = userRows[0]?.username || null;

        if (!tenNguoiDung) {
            return res.status(404).json({ message: "Dữ liệu người dùng không hợp lệ!" });
        }

        // Lấy thông tin thẻ từ bảng `the`
        const [theRows] = await connection.execute("SELECT * FROM the WHERE the_id = ?", [theId]);

        if (theRows.length === 0) {
            return res.status(404).json({ message: "Thẻ không tồn tại!" });
        }

        const { loai_the, phi_kich_hoat, diem_thuong } = theRows[0];
        const diemConLai = diem_thuong || 0;

        // Trả về thông tin thanh toán thành công
        return res.status(200).json({
            message: "Thông tin thẻ được lấy thành công!",
            data: {
                nguoiDungId,
                tenNguoiDung,
                theId,
                loai_the,
                phi_kich_hoat,
                diemConLai,
            },
        });
    } catch (error) {
        console.error("Lỗi:", error.message);
        return res.status(500).json({ message: "Lỗi xử lý!", error: error.message });
    } finally {
        if (connection) {
            connection.release();
        }
    }
}
