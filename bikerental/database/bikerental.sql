-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 14, 2025 lúc 06:19 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `bikerental`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bang_gia`
--

CREATE TABLE `bang_gia` (
  `id` int(11) NOT NULL,
  `diem_tngo` int(11) NOT NULL,
  `phi_nap` int(11) NOT NULL,
  `imgMoney` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `bang_gia`
--

INSERT INTO `bang_gia` (`id`, `diem_tngo`, `phi_nap`, `imgMoney`) VALUES
(1, 12000, 10000, 'https://www.sbv.gov.vn/webcenter/cs/groups/cucphathanhkhoquy/documents/noidungtinh/c2j2/mdcy/~edisp/~export/SBVWEBAPP01SBV072320~3/338348-10.jpg'),
(2, 25000, 20000, 'https://www.sbv.gov.vn/webcenter/cs/groups/cucphathanhkhoquy/documents/noidungtinh/c2j2/mdcy/~edisp/~export/SBVWEBAPP01SBV072320~3/338348-08.jpg'),
(3, 55000, 50000, 'https://www.sbv.gov.vn/webcenter/cs/groups/cucphathanhkhoquy/documents/noidungtinh/c2j2/mdcy/~edisp/~export/SBVWEBAPP01SBV072320~3/338348-06.jpg'),
(4, 120000, 100000, 'https://www.sbv.gov.vn/webcenter/cs/groups/cucphathanhkhoquy/documents/noidungtinh/c2j2/mdcy/~edisp/~export/SBVWEBAPP01SBV072320~3/338348-04.jpg'),
(5, 230000, 200000, 'https://www.sbv.gov.vn/webcenter/cs/groups/cucphathanhkhoquy/documents/noidungtinh/c2j2/mdcy/~edisp/~export/SBVWEBAPP01SBV072320~3/338348-02.jpg'),
(6, 550000, 500000, 'https://www.sbv.gov.vn/webcenter/cs/groups/cucphathanhkhoquy/documents/noidungtinh/c2j2/mdcy/~edisp/~export/SBVWEBAPP01SBV072320~3/338348.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dia_diem`
--

CREATE TABLE `dia_diem` (
  `dia_diem_id` int(11) NOT NULL,
  `quan_phuong` varchar(50) NOT NULL,
  `thanh_pho` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `dia_diem`
--

INSERT INTO `dia_diem` (`dia_diem_id`, `quan_phuong`, `thanh_pho`) VALUES
(1, 'Quận 1', 'TP. Hồ Chí Minh'),
(2, 'Phường Bến Nghé', 'TP. Hồ Chí Minh'),
(3, 'Phường 1', 'TP. Vũng Tàu'),
(4, 'Phường 2', 'TP. Vũng Tàu');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lien_he`
--

CREATE TABLE `lien_he` (
  `ho_va_ten` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `sdt` varchar(20) NOT NULL,
  `tieu_de` varchar(255) NOT NULL,
  `noi_dung` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `lien_he`
--

INSERT INTO `lien_he` (`ho_va_ten`, `email`, `sdt`, `tieu_de`, `noi_dung`, `created_at`) VALUES
('Nguyen Van A', 'example@example.com', '0123456789', 'Yêu cầu hỗ trợ', 'Tôi cần trợ giúp về việc mua vé nhưng mà không đủ tiền.', '2025-04-06 07:57:58');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `the`
--

CREATE TABLE `the` (
  `the_id` int(11) NOT NULL,
  `loai_the` varchar(50) NOT NULL,
  `img` varchar(250) NOT NULL,
  `phi_kich_hoat` int(11) NOT NULL,
  `so_du_toi_thieu` int(11) NOT NULL,
  `diem_thuong` int(11) NOT NULL,
  `so_xe_toi_da` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `the`
--

INSERT INTO `the` (`the_id`, `loai_the`, `img`, `phi_kich_hoat`, `so_du_toi_thieu`, `diem_thuong`, `so_xe_toi_da`) VALUES
(1, 'RideUp', 'https://tngo.vn/image/rfid-rideup.jpg', 20000, 100000, 10000, 3),
(2, 'Prenium', 'https://tngo.vn/image/rfid-premium.jpg', 20000, 1000000, 50000, 10),
(3, 'VIP', 'https://tngo.vn/image/rfid-vip.jpg', 200000, 10000000, 500000, 100000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `the_nguoi_dung`
--

CREATE TABLE `the_nguoi_dung` (
  `id` int(11) NOT NULL,
  `ten_nguoi_dung` varchar(100) NOT NULL,
  `the_id` int(11) NOT NULL,
  `loai_the` varchar(50) NOT NULL,
  `so_du_diem` int(11) NOT NULL,
  `diem_da_su_dung` int(11) NOT NULL DEFAULT 0,
  `ngay_mua` date NOT NULL,
  `ngay_het_han` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `the_nguoi_dung`
--

INSERT INTO `the_nguoi_dung` (`id`, `ten_nguoi_dung`, `the_id`, `loai_the`, `so_du_diem`, `diem_da_su_dung`, `ngay_mua`, `ngay_het_han`) VALUES
(21, 'Tiến', 3, 'VIP', 12150000, 50000, '2025-04-14', '2026-04-14'),
(28, 'A Vinh Cờ Tướng', 1, 'RideUp', 20000, 0, '2025-04-08', '2026-04-08'),
(29, 'Tiến', 3, 'VIP', 500000, 0, '2025-04-08', '2026-04-08');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thong_tin_tram`
--

CREATE TABLE `thong_tin_tram` (
  `tram_id` varchar(10) NOT NULL,
  `ten_tram` varchar(100) NOT NULL,
  `ten_duong` varchar(100) DEFAULT NULL,
  `dia_chi_tram` varchar(255) NOT NULL,
  `dia_diem_id` int(11) DEFAULT NULL,
  `thanh_pho` varchar(50) NOT NULL,
  `kinh_do` decimal(9,6) NOT NULL,
  `vi_do` decimal(9,6) NOT NULL,
  `so_luong_xe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `thong_tin_tram`
--

INSERT INTO `thong_tin_tram` (`tram_id`, `ten_tram`, `ten_duong`, `dia_chi_tram`, `dia_diem_id`, `thanh_pho`, `kinh_do`, `vi_do`, `so_luong_xe`) VALUES
('001', 'Hầm Nghi', 'Đường Lê Lợi', 'Phường Bến Nghé - Quận 1', 2, 'TP. Hồ Chí Minh', 106.704000, 10.771500, 10),
('002', 'Trường Cao đẳng Kỹ thuật Cao Thắng', 'Đường Huỳnh Thúc Kháng', 'Phường Bến Thành - Quận 1', 1, 'TP. Hồ Chí Minh', 106.686500, 10.779500, 126),
('003', 'Công ty Cổ phần Vận tải Bưu vận Sài Gòn', 'Đường Lê Thánh Tôn', 'Phường Bến Thành - Quận 1', 1, 'TP. Hồ Chí Minh', 106.695000, 10.773000, 136),
('004', 'Nguyệt Hạ', 'Đường Nguyễn Huệ', 'Phường Bến Nghé - Quận 1', 2, 'TP. Hồ Chí Minh', 106.704000, 10.771500, 1),
('005', 'Nguyệt Huế', 'Đường Tôn Đức Thắng', 'Phường Bến Nghé - Quận 1', 2, 'TP. Hồ Chí Minh', 106.704000, 10.771500, 1),
('006', 'Sân vận động Lam Sơn', 'Đường Lê Lợi', '15 Lê Lợi - Phường 1 - TP. Vũng Tàu', 3, 'TP. Vũng Tàu', 107.077000, 10.346500, 0),
('007', 'Công viên Tam Giác', 'Đường Lê Lợi', 'Góc đường Lê Lợi và Quang Trung - Phường 1 - TP. Vũng Tàu', 3, 'TP. Vũng Tàu', 107.078000, 10.347000, 0),
('008', 'Nhà văn hóa Thanh Niên', 'Đường Hà Long', 'Đối diện 160 Hà Long - Phường 1 - TP. Vũng Tàu', 3, 'TP. Vũng Tàu', 107.080000, 10.345000, 0),
('009', 'Thái Văn Lung', 'Đường Thái Văn Lung', 'Thái Văn Lung - Phường 2 - TP. Vũng Tàu', 4, 'TP. Vũng Tàu', 107.075000, 10.355000, 0),
('010', 'Tương Chùa Dâng Tay', 'Đường Tương Chùa Dâng Tay', 'Đối diện Tương Chùa Dâng Tay - Phường 2 - TP. Vũng Tàu', 4, 'TP. Vũng Tàu', 107.076000, 10.356000, 0),
('011', 'Công viên Tao Phùng', 'Đường Thùy Vân', 'Đối diện 83 Thùy Vân - Phường 2 - TP. Vũng Tàu', 4, 'TP. Vũng Tàu', 107.085000, 10.335000, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `username`, `phone`, `role`) VALUES
(1, '2505@example.com', '$2a$10$8iGu6ouD7.DjvhXZGicV7eT3qk7Wh0UdP5nWRAFG7f/a9vC1u4mjW', 'newusername', '0123456789', 'User'),
(2, 'admin@example.com', '$2a$10$wZ2fsJMTb7x2Xl5E/EHgJOhLfB9G.G3IV4Z1eGc0PBM5zAfhy5Q8O', 'Admin User', '0123456789', 'User'),
(3, 'lebinh@gmail.com', '$2b$10$lri3Su1RFntkKcUraf91V.evioKP15l7cHIDQKuz3E/4/0ii/1EKK', 'Admin User', '098765432', 'User'),
(4, 'thanhvinh123@gmail.com', '$2b$10$eEVAJcFSaJlJ2qqcBPyEW.Flku7EL6G5MQsDu.oy4Qwa0LKD3uyAu', 'user', '098765432', 'User'),
(5, 'user2@example.com', '$2b$10$8Dgw0Ks6pcxdd3c40CLakuxkRICG2eOkwl.ATRmUtDJm236atNuN.', 'binh', '012345678', 'User'),
(9, 'user123456@example.com', '$2b$10$3jFo93A7tBH3LjvTCjlGBOfQuY861Z3BFaWw21QpDeGjkn3O266r6', 'vinh123', '0886485440', 'User'),
(10, 'tes123t@example.com', '$2b$10$LnzYHjKIoSjoZLcEOzvmT.f9DXq2d7GB4nLhdYB0oGVo1hK8AsdTK', 'vinh1', '0888312227', 'User'),
(11, 'example@example.com', '$2b$10$8l8Xr6HEP35Rf8/u7HIUXuZ4O9lOFYmWNYmZBB2si9sKAuZEXmuyO', 'exampleuser', '1234567890', 'User'),
(21, 'tien632004@gmail.com', '$2b$10$BMdzU/Y9XjkjH0K.r5j4cOFDf35f9RJOZEMU/GrHj2iFw8Gj/McvK', 'Tiến', '098765432', 'User'),
(23, 'tien4@gmail.com', '$2b$10$9Dgv9xXPEtF3iDv17BixKejXwdW5189YDYgrSsiOI2HWhagfA8PXy', 'Đặng Tiến Minh', '0886485440', 'User'),
(26, '12345@gmail.com', '$2b$10$tZJLWKNia3Yd0ou18zIINe2WrdqFpxG9A1iQiA9csIAuVWnzck7MS', 'User 123', '0987654321', 'User'),
(28, 'vinhthanhnguyen12122004@gmail.com', '$2b$10$BPn.yRUAvk3jPVm44eTjiePDcDJMnq8MH.HG3/V..6zdMe8Q8fzIi', 'A Vinh Cờ Tướng', '0987654321', 'User'),
(29, 'kiritanitaiyo@gmail.com', '$2b$10$TVqqjid/L72DS96WZ21ECO37GAWSWC5Roo/WEyhsBgSX9tSyZxAxa', 'Tiến', '0987654321', 'User'),
(30, '2251120118@ut.edu.vn', '$2b$10$LdTtjX6lJvhB.TuBAhf60.RwY0poK.92v41JZuHsD56jSJfLgHRny', 'Tiến 123', '0987654321', 'User');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_tokens`
--

CREATE TABLE `user_tokens` (
  `user_id` int(11) NOT NULL,
  `token` varchar(500) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `user_tokens`
--

INSERT INTO `user_tokens` (`user_id`, `token`, `created_at`) VALUES
(4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ0aGFuaHZpbmgxMjNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkZUVWQUpjRlNhSmxKMnFxY0JQeUVXLkZsa3U3RUw2RzVNUXNEdS5veTRRd2EwTEtEM3V5QXUiLCJyb2xlIjoiVXNlciJ9.iTURW-h-rM4yZloUgOtS1RE-o7z0nGF4qtFc7xllvlU', '2025-04-14 22:46:14'),
(21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImVtYWlsIjoidGllbjYzMjAwNEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRCTWR6VS9ZOVhqa2pIMEsucjVqNGNPRkRmMzVmOVJKT1pFTVUvR3JIajJpRnc4R2ovTWN2SyIsInJvbGUiOiJVc2VyIn0.aS6majQYMX7sy25C76sxzhHyBdYu42oNGcL2y0wl5ow', '2025-04-06 10:35:43'),
(23, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRpZW40QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJDlEZ3Y5eFhQRXRGM2lEdjE3Qml4S2VqWHdkVzUxODlZRFlnclNzaU9JMkhXaGFnZkE4UFh5Iiwicm9sZSI6IlVzZXIifQ.aNQAsQ5zgxeDuSYEFBC_dIXPnMz8p7DP1XhUMlHvZ2E', '2025-04-06 15:09:23'),
(28, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImVtYWlsIjoidmluaHRoYW5obmd1eWVuMTIxMjIwMDRAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkQlBuLnlSVUF2azNqUFZtNDRlVGppZVBEY0RKTW5xOE1ILkhHMy9WLi42emRNZThROGZ6SWkiLCJyb2xlIjoiVXNlciJ9.qK6NpQpVHsc1cr6OyEJB48X3EoR7Y7FqeowvzFXiG9A', '2025-04-08 22:28:08'),
(29, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksImVtYWlsIjoia2lyaXRhbml0YWl5b0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRUVnFxamlkL0w3MkRTOTZXWjIxRUNPMzdHQVdTV0M1Um9vL1dFeWhzQmdTWDl0U3laeEF4YSIsInJvbGUiOiJVc2VyIn0.NGXvwgxK2zffM_3TFdOcOy4FuwAsIqdj_DfwiQ95YCA', '2025-04-08 22:38:21'),
(30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImVtYWlsIjoiMjI1MTEyMDExOEB1dC5lZHUudm4iLCJwYXNzd29yZCI6IiQyYiQxMCRMZFR0alg2bEp2aEIuVHVCQWhmNjAuUndZMHBvSy45MnY0MUpadUhzRDU2alNKZkxnSFJueSIsInJvbGUiOiJVc2VyIn0.m3vWVj3X9bQDJ1v4vqy6hnc8XeDP8SKgCoasM4Odr6w', '2025-04-08 23:27:26');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ve`
--

CREATE TABLE `ve` (
  `ve_id` int(11) NOT NULL,
  `ten_ve` varchar(50) DEFAULT NULL,
  `loai_xe` varchar(50) NOT NULL,
  `diem_tngo` int(11) DEFAULT NULL,
  `thoi_luong` varchar(50) DEFAULT NULL,
  `thoi_han` varchar(50) DEFAULT NULL,
  `phi_phat_sinh` varchar(50) DEFAULT NULL,
  `ghi_chu` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `ve`
--

INSERT INTO `ve` (`ve_id`, `ten_ve`, `loai_xe`, `diem_tngo`, `thoi_luong`, `thoi_han`, `phi_phat_sinh`, `ghi_chu`) VALUES
(1, 'Vé lượt', 'Xe đạp cơ', 10000, '60 phút', '60 phút', '3.000 điểm/15 phút', 'Bạn phải có số dư tối thiểu 20.000 điểm TNGO'),
(2, 'Vé ngày', 'Xe đạp cơ', 50000, '450 phút', '24h ngày đăng ký', '3.000 điểm/15 phút', ''),
(3, 'Vé Tháng', 'Xe đạp cơ', 89000, 'Miễn phí tất cả chuyến đi dưới 60 phút', '60 ngày kể từ ngày đăng ký', '0 điểm', 'Bạn phải nạp 10 triệu điểm tngo'),
(4, 'Vé lượt', 'Xe đạp điện', 20000, '60 phút', '60 phút', '3.000 điểm/15 phút', 'Bạn phải có số dư tối thiểu 40.000 điểm TNGO'),
(5, 'Vé ngày', 'Xe đạp điện', 100000, '450 phút', '24h ngày đăng ký', '6.000 điểm/15 phút', ''),
(7, 'Vé Tháng', 'xe đạp điện', 200000, 'Miễn phí tất cả chuyến đi dưới 60 phút', '60 ngày kể từ ngày đăng ký', 'Không có', 'Bạn sẽ được miễn phí vé nếu đánh cờ tướng thắng anh Vinh');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ve_nguoi_dung`
--

CREATE TABLE `ve_nguoi_dung` (
  `id_donhang` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `ten_nguoi_dung` varchar(100) NOT NULL,
  `ve_id` int(11) NOT NULL,
  `ten_ve` varchar(50) NOT NULL,
  `loai_xe` varchar(50) NOT NULL,
  `ngay_mua` date NOT NULL,
  `thoi_han` varchar(50) NOT NULL,
  `so_luong` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `ve_nguoi_dung`
--

INSERT INTO `ve_nguoi_dung` (`id_donhang`, `users_id`, `ten_nguoi_dung`, `ve_id`, `ten_ve`, `loai_xe`, `ngay_mua`, `thoi_han`, `so_luong`) VALUES
(6, 21, 'Tiến', 1, 'Vé lượt', 'Xe đạp cơ', '2025-04-14', '60 phút', 1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bang_gia`
--
ALTER TABLE `bang_gia`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `dia_diem`
--
ALTER TABLE `dia_diem`
  ADD PRIMARY KEY (`dia_diem_id`);

--
-- Chỉ mục cho bảng `lien_he`
--
ALTER TABLE `lien_he`
  ADD PRIMARY KEY (`ho_va_ten`);

--
-- Chỉ mục cho bảng `the`
--
ALTER TABLE `the`
  ADD PRIMARY KEY (`the_id`);

--
-- Chỉ mục cho bảng `the_nguoi_dung`
--
ALTER TABLE `the_nguoi_dung`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_the` (`the_id`),
  ADD KEY `fk_user_name` (`ten_nguoi_dung`);

--
-- Chỉ mục cho bảng `thong_tin_tram`
--
ALTER TABLE `thong_tin_tram`
  ADD PRIMARY KEY (`tram_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `user_tokens`
--
ALTER TABLE `user_tokens`
  ADD PRIMARY KEY (`user_id`);

--
-- Chỉ mục cho bảng `ve`
--
ALTER TABLE `ve`
  ADD PRIMARY KEY (`ve_id`);

--
-- Chỉ mục cho bảng `ve_nguoi_dung`
--
ALTER TABLE `ve_nguoi_dung`
  ADD PRIMARY KEY (`id_donhang`),
  ADD KEY `fk_ve` (`ve_id`),
  ADD KEY `ten_nguoi_dung` (`ten_nguoi_dung`),
  ADD KEY `fk_users` (`users_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bang_gia`
--
ALTER TABLE `bang_gia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `dia_diem`
--
ALTER TABLE `dia_diem`
  MODIFY `dia_diem_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT cho bảng `ve`
--
ALTER TABLE `ve`
  MODIFY `ve_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `ve_nguoi_dung`
--
ALTER TABLE `ve_nguoi_dung`
  MODIFY `id_donhang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `the_nguoi_dung`
--
ALTER TABLE `the_nguoi_dung`
  ADD CONSTRAINT `fk_the` FOREIGN KEY (`the_id`) REFERENCES `the` (`the_id`),
  ADD CONSTRAINT `fk_the_nguoi_dung_users` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `user_tokens`
--
ALTER TABLE `user_tokens`
  ADD CONSTRAINT `fk_user_tokens_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `ve_nguoi_dung`
--
ALTER TABLE `ve_nguoi_dung`
  ADD CONSTRAINT `fk_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
