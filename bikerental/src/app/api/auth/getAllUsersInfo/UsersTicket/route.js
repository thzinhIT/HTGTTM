import pool from "@/db";

export default async function handler(req, res) {
  try {
    // Kiểm tra phương thức HTTP
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Chỉ hỗ trợ phương thức GET" });
    }

    // Truy vấn dữ liệu từ bảng ve
    const query = "SELECT * FROM ve";
    const [rows] = await pool.query(query);

    // Kiểm tra kết quả
    if (!rows.length) {
      return res.status(404).json({ message: "Không tìm thấy dữ liệu" });
    }

    // Trả về dữ liệu
    res.status(200).json(rows);
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}
