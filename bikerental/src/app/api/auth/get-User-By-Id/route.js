import pool from "@/db.js";

export default async function getUserById(req, res) {
  // Kiểm tra phương thức HTTP
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Phương thức không được hỗ trợ." });
  }

  // Lấy ID từ query parameters
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Thiếu thông tin id của user." });
  }

  let connection;

  try {
    // Kết nối đến cơ sở dữ liệu
    connection = await pool.getConnection();

    // Truy vấn thông tin user từ bảng `users`
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    // Kiểm tra xem user có tồn tại không
    if (rows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy người dùng." });
    }

    // Trả về thông tin của user
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã xảy ra lỗi hệ thống.", error: error.message });
  } finally {
    if (connection) {
      connection.release(); // Giải phóng kết nối
    }
  }
}
