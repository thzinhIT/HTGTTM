import pool from "@/db.js";

export async function POST(req) {
    try {
        const contract = await req.json();

        const [result] = await pool.execute(
            `INSERT INTO lien_he (ho_va_ten, email, sdt, tieu_de, noi_dung) VALUES (?, ?, ?, ?, ?)`,
            [contract.ho_va_ten, contract.email, contract.sdt, contract.tieu_de, contract.noi_dung]
        );

        // Phản hồi thành công bằng cách sử dụng Response từ Next.js
        return new Response(
            JSON.stringify({
                message: 'Thông tin liên hệ đã được lưu!',
                data: {
                    id: result.insertId,
                    ho_va_ten: contract.ho_va_ten,
                    email: contract.email,
                    sdt: contract.sdt,
                    tieu_de: contract.tieu_de,
                    noi_dung: contract.noi_dung
                },
            }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error("Error adding contact:", error.message);

        // Phản hồi lỗi
        return new Response(
            JSON.stringify({ message: "Lỗi thêm thông tin mới!", error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
