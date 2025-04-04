import pool from "@/db.js";

// Hàm nạp điểm vào thẻ
export async function napDiem(userId, theId, soDiemNap) {
    try {
        if (!userId || !theId || !soDiemNap) {
            throw new Error("Thiếu thông tin cần thiết để nạp điểm!");
        }

        // Lấy thông tin loại thẻ và số dư hiện tại
        const [rows] = await pool.execute(
            "SELECT loai_the, so_du_diem FROM the_nguoi_dung WHERE the_id = ?",
            [theId]
        );

        if (rows.length === 0) {
            throw new Error("Thẻ không tồn tại!");
        }

        const { loai_the, so_du_diem } = rows[0];
        let soDuToiThieu;

        // Xác định số dư tối thiểu dựa trên loại thẻ
        switch (loai_the.toLowerCase()) {
            case "rideup":
                soDuToiThieu = 100000;
                break;
            case "premium":
                soDuToiThieu = 1000000;
                break;
            case "vip":
                soDuToiThieu = 5000000;
                break;
            default:
                throw new Error("Loại thẻ không hợp lệ!");
        }

        // Kiểm tra nếu số dư sau khi nạp không đạt tối thiểu
        const soDuMoi = parseFloat(so_du_diem) + parseFloat(soDiemNap);
        if (soDuMoi < soDuToiThieu) {
            throw new Error(
                `Số dư sau khi nạp không đạt yêu cầu tối thiểu (${soDuToiThieu} điểm) cho thẻ ${loai_the}.`
            );
        }

        // Cập nhật số dư mới vào cơ sở dữ liệu
        await pool.execute(
            "UPDATE the_nguoi_dung SET so_du_diem = ? WHERE the_id = ?",
            [soDuMoi, theId]
        );

        console.log(
            `Nạp điểm thành công! Tổng số dư hiện tại: ${soDuMoi} điểm. Loại thẻ: ${loai_the}, Thẻ ID: ${theId}`
        );
        return { message: "Nạp điểm thành công!", soDuMoi, loai_the };
    } catch (error) {
        console.error("Lỗi khi nạp điểm:", error.message);
        throw new Error("Không thể thực hiện nạp điểm!");
    }
}

// Xử lý API POST: Nạp điểm
export async function POST(req) {
    try {
        const { userId, theId, soDiemNap } = await req.json();

        if (!userId || !theId || !soDiemNap) {
            return Response.json({ message: "Thiếu thông tin cần thiết!" }, { status: 400 });
        }

        // Thực hiện nạp điểm
        const result = await napDiem(userId, theId, soDiemNap);

        return Response.json({ message: result.message, soDuMoi: result.soDuMoi, loaiThe: result.loai_the }, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Lỗi khi nạp điểm!", error: error.message }, { status: 500 });
    }
}
