"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { FaUser, FaTicketAlt, FaCreditCard } from "react-icons/fa";
import useFetchGetData from "@/hooks/useFecthGetData";
import { useEffect, useState } from "react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BE6"];

const DashboardPage = () => {
  const [dataJSON, setDataJSON] = useState();
  const url = "http://localhost:3000/api/auth/thongke";
  const { data, error, loading } = useFetchGetData(url);

  useEffect(() => {
    if (data) {
      setDataJSON(data);
    }
  }, [data]);

  const lineChartData = [
    {
      name: "Tháng 4",
      Ve: dataJSON?.veNguoiDungList.reduce(
        (acc, item) => acc + item.soVeBanTrongThang,
        0
      ),
      The: dataJSON?.theNguoiDung.reduce(
        (acc, item) => acc + item.soTheBanTrongThang,
        0
      ),
    },
  ];

  // Tính tổng điểm nạp
  const totalPoints = dataJSON?.topNguoiDungNapNhieuDiem.reduce(
    (total, user) => total + parseInt(user.tong_diem_nap),
    0
  );

  // Tạo dữ liệu cho Pie chart với tỷ lệ phần trăm
  const pieData = dataJSON?.topNguoiDungNapNhieuDiem.map((user) => ({
    name: user.ten_nguoi_dung,
    value: (user.tong_diem_nap / totalPoints) * 100, // Tính tỷ lệ phần trăm
  }));

  return (
    <div className="p-6 space-y-6">
      {/* Tổng quan */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl shadow p-4 bg-white flex gap-30 items-center  ">
          <FaUser size={24} className="text-blue-500" />
          <div>
            <p>Tổng người đăng ký</p>
            <p className="text-2xl font-bold text-center">
              {dataJSON?.soNguoiDangKy?.so_nguoi_dang_ky}
            </p>
          </div>
        </div>
        <div className="rounded-2xl shadow p-4 bg-white flex gap-30 items-center">
          <FaTicketAlt size={24} className="text-green-500" />
          <div>
            <p>Tổng vé được mua</p>
            <p className="text-2xl font-bold text-center">
              {dataJSON?.tongSoVeDuocMua}
            </p>
          </div>
        </div>
        <div className="rounded-2xl shadow p-4 bg-white flex gap-30 items-center">
          <FaCreditCard size={24} className="text-yellow-500" />
          <div>
            <p>Tổng thẻ được mua</p>
            <p className="text-2xl font-bold  text-center">
              {dataJSON?.tongSoTheDuocMua}
            </p>
          </div>
        </div>
      </div>

      {/* Biểu đồ đường */}
      {/* <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Thống kê vé và thẻ</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={lineChartData}>
            <defs>
              <linearGradient id="colorVe" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#00C49F" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorThe" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Ve"
              stroke="#00C49F"
              fillOpacity={1}
              fill="url(#colorVe)"
            />
            <Area
              type="monotone"
              dataKey="The"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorThe)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div> */}

      {/* Biểu đồ cột vé */}
      <div className="bg-white rounded-2xl shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Thống kê vé</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={lineChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Bar dataKey="Ve" fill="#00C49F" barSize={20} />{" "}
            {/* Điều chỉnh barSize */}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ cột thẻ */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Thống kê thẻ</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={lineChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Bar dataKey="The" fill="#8884d8" barSize={20} />{" "}
            {/* Điều chỉnh barSize */}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ tròn */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Top người dùng nạp điểm</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ percent }) => `${percent.toFixed(2) * 100 + "%"}`} // Hiển thị tỷ lệ phần trăm
            >
              {pieData?.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardPage;
