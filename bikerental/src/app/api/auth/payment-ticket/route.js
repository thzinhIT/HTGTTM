import pool from "@/db.js";

export const POST = async (req) => {
    let connection;
    try {
        // Lấy `ve_id` từ URL query parameters
        const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
        const ve_id = searchParams.get("ve_id") || "1";

        if (!ve_id) {
            return new Response(JSON.stringify({ message: "Thiếu thông tin vé!" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
            });
        }

        // Lấy thông tin từ body request
        const { soLuong, token } = await req.json();

        if (!soLuong || parseInt(soLuong) <= 0) {
            return new Response(JSON.stringify({ message: "Thông tin không hợp lệ!" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Gửi yêu cầu tới API để truy vấn thông tin người dùng
        const apiUrl = `http://localhost:3000/api/auth/payment-ticket?ve_Id=${ve_id}`;
        const response = await fetch(apiUrl, {
            method: "POST",
                headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                },
    });

if (!response.ok) {
    throw new Error("Không thể truy vấn thông tin người dùng!");
}

const userData = await response.json();

// Tiến hành xử lý thông tin người dùng
connection = await pool.getConnection();
await connection.beginTransaction();

const [userRows] = await connection.execute(
    "SELECT id, ten_nguoi_dung, so_du_diem, diem_da_su_dung, loai_the FROM the_nguoi_dung WHERE id = ?",
    [userData.id]
);

if (userRows.length === 0) {
    throw new Error("Không tìm thấy người dùng!");
}


        const { id, ten_nguoi_dung, so_du_diem, diem_da_su_dung, loai_the } = userRows[0];

        // 🔍 **Truy vấn thông tin vé từ `ve`**
        const [veRows] = await connection.execute(
            "SELECT ten_ve, diem_tngo, hieu_luc FROM ve WHERE ve_id = ?",
            [ve_id]
        );

        if (veRows.length === 0) {
            throw new Error("Không tìm thấy vé!");
        }

        const { ten_ve, diem_tngo, hieu_luc } = veRows[0];
        const tongDiemThanhToan = diem_tngo * soLuong;

        // ⚠️ **Kiểm tra số dư tối thiểu**
        const minBalance = {
            RideUp: 100000,
            Prenium: 1000000,
            VIP: 5000000,
        };

        const minRequiredBalance = minBalance[loai_the] || 0;

        if (so_du_diem - tongDiemThanhToan < minRequiredBalance) {
            throw new Error(`Số dư thấp hơn mức tối thiểu (${minRequiredBalance.toLocaleString()})!`);
        }

        // ✅ **Cập nhật số dư và điểm đã sử dụng**
        const diemConLai = so_du_diem - tongDiemThanhToan;
        const diemDaSuDungMoi = diem_da_su_dung + tongDiemThanhToan;

        await connection.execute(
            "UPDATE the_nguoi_dung SET so_du_diem = ?, diem_da_su_dung = ? WHERE id = ?",
            [diemConLai, diemDaSuDungMoi, userId]
        );

        // ✅ **Ghi thông tin vé vào `ve_nguoi_dung`**
        const ngayMua = new Date().toISOString().split("T")[0];

         // Xác định giá trị 'thoi_han' dựa trên 've_id'
         let thoi_han = "";
         if (ve_id === "1") {
             thoi_han = "60 phut";
         } else if (ve_id === "2") {
             thoi_han = "1 ngay";
         } else if (ve_id === "3") {
             thoi_han = "30 ngay";
         } else {
             thoi_han = "Không xác định";
         }
         
        await connection.execute(
            "INSERT INTO ve_nguoi_dung (id, ve_id, ten_nguoi_dung, ten_ve, ngay_mua, thoi_han, so_luong) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [userId, ve_id, ten_nguoi_dung, ten_ve, ngayMua, hieu_luc, soLuong]
        );

        await connection.commit(); // 🔥 Xác nhận giao dịch
        return new Response(JSON.stringify({ message: "Thanh toán vé thành công!" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        if (connection) {
            await connection.rollback(); // 🔥 Hoàn tác giao dịch khi lỗi
        }
        console.error("Lỗi:", error.message);
        return new Response(JSON.stringify({ message: "Lỗi xử lý!", error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });

    } finally {
        if (connection) {
            connection.release(); // 🔥 Giải phóng kết nối
        }
    }
};
