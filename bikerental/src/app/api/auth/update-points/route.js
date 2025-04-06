import pool from "@/db.js";

// Hàm xử lý logic nạp điểm
export async function napDiem(id, soDiemNap) {
    try {
        // Kiểm tra thông tin đầu vào
        if (!id || !soDiemNap || isNaN(soDiemNap) || parseFloat(soDiemNap) <= 0) {
            throw new Error("Thông tin không hợp lệ! Vui lòng kiểm tra lại.");
        }

        // Truy vấn thông tin thẻ của người dùng theo ID
        const [rows] = await pool.execute(
            "SELECT id, the_id, loai_the, so_du_diem FROM the_nguoi_dung WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            throw new Error("Không tìm thấy thông tin thẻ của người dùng.");
        }

        // Lấy dữ liệu thẻ từ kết quả truy vấn
        const { the_id, loai_the, so_du_diem } = rows[0];

        // Xác định số dư tối thiểu dựa trên loại thẻ
        let soDuToiThieu;
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
                throw new Error(`Loại thẻ không hợp lệ: ${loai_the}`);
        }

        // Tính số dư mới sau khi nạp
        const soDuMoi = parseFloat(so_du_diem) + parseFloat(soDiemNap);

        if (soDuMoi < soDuToiThieu) {
            throw new Error(
                `Số dư sau khi nạp (${soDuMoi} điểm) không đạt yêu cầu tối thiểu (${soDuToiThieu} điểm) cho thẻ ${loai_the}.`
            );
        }

        // Cập nhật số dư mới vào bảng `the_nguoi_dung`
        await pool.execute(
            "UPDATE the_nguoi_dung SET so_du_diem = ? WHERE id = ?",
            [soDuMoi, id]
        );

        return { message: "Nạp điểm thành công!", soDuMoi, loai_the, userId: id };
    } catch (error) {
        console.error("Lỗi khi nạp điểm:", error.message);
        throw new Error(error.message || "Không thể thực hiện nạp điểm!");
    }
}

// Xử lý API POST
export async function POST(req) {
    try {
        // Lấy thông tin từ URL query parameters
        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        // Lấy thông tin từ body request
        const { soDiemNap } = await req.json();

        if (!id || !soDiemNap) {
            return new Response(
                JSON.stringify({ message: "Thiếu thông tin ID người dùng hoặc số điểm cần nạp!" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Thực hiện logic nạp điểm với ID động
        const result = await napDiem(id, soDiemNap);

        return new Response(
            JSON.stringify({
                message: result.message,
                soDuMoi: result.soDuMoi,
                loaiThe: result.loai_the,
                userId: result.userId,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Lỗi khi nạp điểm!", error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
