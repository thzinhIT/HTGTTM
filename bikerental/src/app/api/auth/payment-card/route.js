import pool from "@/db.js";

export const GET = async (req) => {
    let connection;
    try {
        // Lấy thông tin theId từ query params
        const { searchParams } = new URL(req.url);
        const theId = searchParams.get("theId");

        // Kiểm tra thông tin đầu vào
        if (!theId) {
            return new Response(JSON.stringify({ message: "Thiếu thông tin theId!" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Bắt đầu kết nối đến cơ sở dữ liệu
        connection = await pool.getConnection();

        // Lấy thông tin user_id từ token trong bảng user_tokens
        const [tokenRows] = await connection.execute(
            "SELECT user_id FROM user_tokens ORDER BY created_at DESC LIMIT 1"
        );

        if (tokenRows.length === 0) {
            return new Response(JSON.stringify({ message: "Không tìm thấy token!" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        const nguoiDungId = tokenRows[0]?.user_id || null;

        if (!nguoiDungId) {
            return new Response(JSON.stringify({ message: "Không xác định được người dùng từ token!" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Lấy thông tin người dùng từ bảng users
        const [userRows] = await connection.execute(
            "SELECT username FROM users WHERE id = ?", [nguoiDungId]
        );

        if (userRows.length === 0) {
            return new Response(JSON.stringify({ message: "Người dùng không tồn tại!" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        const tenNguoiDung = userRows[0]?.username || null;

        if (!tenNguoiDung) {
            return new Response(JSON.stringify({ message: "Dữ liệu người dùng không hợp lệ!" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Lấy thông tin thẻ từ bảng the
        const [theRows] = await connection.execute("SELECT * FROM the WHERE the_id = ?", [theId]);

        if (theRows.length === 0) {
            return new Response(JSON.stringify({ message: "Thẻ không tồn tại!" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        const [userIdRows] = await connection.execute(
            "SELECT id FROM users WHERE username = ?", [tenNguoiDung]
        );
        const id = userIdRows[0]?.id || null;
        
        if (!id) {
            return new Response(JSON.stringify({ message: "ID người dùng không tồn tại!" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }
        

        const { loai_the, phi_kich_hoat, diem_thuong } = theRows[0];
        const diemConLai = diem_thuong || 0;

        // Tính toán ngày mua và ngày hết hạn
        const ngayMua = new Date().toISOString().split("T")[0]; // Ngày hiện tại
        const ngayHetHan = new Date();
        ngayHetHan.setFullYear(ngayHetHan.getFullYear() + 1); // Hết hạn sau 1 năm
        const formattedNgayHetHan = ngayHetHan.toISOString().split("T")[0];

        // Thêm thông tin vào bảng the_nguoi_dung
        await connection.execute(
            "INSERT INTO the_nguoi_dung (id, ten_nguoi_dung, the_id, loai_the, so_du_diem, diem_da_su_dung, diem_con_lai, ngay_mua, ngay_het_han) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [id, tenNguoiDung, theId, loai_the, phi_kich_hoat, 0, diemConLai, ngayMua, formattedNgayHetHan]
        );
        
        

        // Trả về thông tin thanh toán thành công
        return new Response(
            JSON.stringify({
                message: "Thanh toán thẻ thành công!",
                data: {
                    nguoiDungId,
                    tenNguoiDung,
                    theId,
                    loai_the,
                    phi_kich_hoat,
                    diemConLai,
                    ngayMua,
                    ngayHetHan: formattedNgayHetHan,
                },
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Lỗi:", error.message);
        return new Response(JSON.stringify({ message: "Lỗi xử lý!", error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    } finally {
        if (connection) {
            connection.release();
        }
    }
};
