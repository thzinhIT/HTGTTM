import pool from "@/db.js";

export async function GET(req) {
    try {
        const currentMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const currentMonthEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

        // Đếm số người đăng ký trong tháng
        const [usersRegistered] = await pool.execute(
          `SELECT COUNT(*) as so_nguoi_dang_ky 
           FROM users
          `,
          [currentMonthStart, currentMonthEnd]
      );
      
        // Đếm số vé được bán trong tháng
        const [ticketsSold] = await pool.execute(
           `SELECT 
              ten_ve, 
              COUNT(*) as so_ve_duoc_ban_trong_thang, 
              SUM(so_luong) as tong_so_ve_duoc_mua,
              MONTH(ngay_mua) as thang, 
              YEAR(ngay_mua) as nam
          FROM ve_nguoi_dung
          WHERE ngay_mua BETWEEN ? AND ?
          GROUP BY ten_ve, thang, nam`,
          [currentMonthStart, currentMonthEnd]
        );

        // Đếm số thẻ được mua trong tháng
        const [cardsPurchased] = await pool.execute(
            `SELECT 
              loai_the, 
              COUNT(*) as so_the_duoc_ban_trong_thang, 
              SUM(so_du_diem) as tong_so_diem_da_duoc_nap,
              MONTH(ngay_mua) as thang, 
              YEAR(ngay_mua) as nam
            FROM the_nguoi_dung
            WHERE ngay_mua BETWEEN ? AND ?
            GROUP BY loai_the, thang, nam`,
          [currentMonthStart, currentMonthEnd]
        );

      

        // Chuẩn bị dữ liệu trả về
        const [topUsersByPoints] = await pool.execute(
          `SELECT id, ten_nguoi_dung, 
                  SUM(so_du_diem) as tong_diem_nap 
           FROM the_nguoi_dung 
           GROUP BY id 
           ORDER BY tong_diem_nap DESC 
           LIMIT 3`,
      );

      // Tách dữ liệu trả về thành các thống kê riêng biệt
      const data = {
          soNguoiDangKy: usersRegistered[0]?.so_nguoi_dang_ky || 0,
          veNguoiDung: {
              soVeDuocBan: ticketsSold[0]?.so_ve_duoc_ban || 0,
              tongSoVeDuocMua: ticketsSold[0]?.tong_so_ve_duoc_mua || 0,
              thang: ticketsSold[0]?.thang || null,
              nam: ticketsSold[0]?.nam || null,
          },
          theNguoiDung: {
              soTheDuocMua: cardsPurchased[0]?.so_the_duoc_mua || 0,
              tongDiemTNgoDuocNap: cardsPurchased[0]?.tong_diem_tngo_duoc_nap || 0,
              thang: cardsPurchased[0]?.thang || null,
              nam: cardsPurchased[0]?.nam || null,

          },
          topNguoiDungNapNhieuDiem: topUsersByPoints || [],
  
      };

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Lỗi khi lấy thống kê:", error.message);
        return new Response(
            JSON.stringify({ message: "Lỗi thống kê!", error: error.message }),
            { status: 500 }
        );
    }
}
