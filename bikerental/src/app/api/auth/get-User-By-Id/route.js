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
    const [userRows] = await connection.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    // Kiểm tra xem user có tồn tại không
    if (userRows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy người dùng." });
    }

    // Truy vấn thông tin token và created_at từ bảng `user_tokens`
    const [tokenRows] = await connection.execute(
      "SELECT token, created_at FROM user_tokens WHERE user_id = ?",
      [id]
    );

    // Kiểm tra xem token có tồn tại không
    if (tokenRows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy token của người dùng." });
    }

    // Kiểm tra thời gian `created_at` của token
    const tokenCreatedAt = new Date(tokenRows[0].created_at);
    const currentTime = new Date();
    const timeDifferenceInHours = (currentTime - tokenCreatedAt) / (1000 * 60 * 60);

    if (timeDifferenceInHours > 2) {
      return res.status(400).json({ message: "Token đã hết hạn." });
    }

    // Trả về thông tin của user cùng với token
    res.status(200).json({
      ...userRows[0],
      token: tokenRows[0].token,
      created_at: tokenRows[0].created_at,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã xảy ra lỗi hệ thống.", error: error.message });
  } finally {
    if (connection) {
      connection.release(); // Giải phóng kết nối
    }
  }
}
