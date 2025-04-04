import pool from "@/db.js";

export default async function getAllUsersInfo(req, res) {
  // Kiểm tra phương thức HTTP
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Phương thức không được hỗ trợ." });
  }

  let connection;

  try {
    // Kết nối đến cơ sở dữ liệu
    connection = await pool.getConnection();

    // Truy vấn tất cả thông tin từ bảng `the_nguoi_dung`
    const [theNguoiDungRows] = await connection.execute("SELECT * FROM the_nguoi_dung");

    // Truy vấn tất cả thông tin từ bảng `ve_nguoi_dung`
    const [veNguoiDungRows] = await connection.execute("SELECT * FROM ve_nguoi_dung");

    // Kết hợp và trả về dữ liệu từ cả hai bảng
    res.status(200).json({
      the_nguoi_dung: theNguoiDungRows,
      ve_nguoi_dung: veNguoiDungRows,
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
