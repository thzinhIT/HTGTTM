import pool from "@/db.js";

export async function GET(req) {
    try {

        
    const currentMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const currentMonthEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
  
    const [veNguoiDungStats] = await pool.execute(
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
      
      const [theNguoiDungStats] = await pool.execute(
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
      
  
      return new Response(
        JSON.stringify({
          data: {
            veNguoiDung: {
              statisticsByVe: veNguoiDungStats,
            },
            theNguoiDung: {
              statisticsByThe: theNguoiDungStats,
            },
          },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
  
  
      
    } catch (error) {
        console.error("Error fetching cards:", error.message);
        return new Response(
            JSON.stringify({ message: "Lỗi thống kê!", error: error.message }),
            { status: 500 }
        );
    }
}
