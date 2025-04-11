import pool from "@/db.js";

export async function POST(req) {
    try {
        const price = await req.json();

        // Kiểm tra nếu 'diem_tngo' và 'phi_nap' đã tồn tại trong cơ sở dữ liệu
        const [rows] = await pool.execute(
            "SELECT * FROM `bang_gia` WHERE diem_tngo = ? OR phi_nap = ?",
            [price.diem_tngo, price.phi_nap]
        );

        if (rows.length > 0) {
            // Nếu một trong hai hoặc cả hai giá trị đã tồn tại, trả về lỗi
            return new Response(
                JSON.stringify({ message: "Không thể thêm bảng giá: bảng giá này đã tồn tại!" }),
                { status: 400 }
            );
        }

        // Chèn dữ liệu bảng giá mới vào cơ sở dữ liệu
        const [result] = await pool.execute(
            "INSERT INTO `bang_gia` (diem_tngo, phi_nap) VALUES (?, ?)",
            [price.diem_tngo, price.phi_nap]
        );

        // Trả về thông báo thành công
        return new Response(
            JSON.stringify({ message: "Bảng giá mới đã được thêm!" }),
            { status: 200 }
        );
    } catch (error) {
        // Nếu có lỗi xảy ra trong quá trình thêm
        console.error("Error adding ticket:", error.message);
        return new Response(
            JSON.stringify({ message: "Lỗi thêm bảng giá mới!", error: error.message }),
            { status: 500 }
        );
    }
}
