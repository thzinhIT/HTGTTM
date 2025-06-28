-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 24, 2025 lúc 12:55 PM
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
('Nguyen Van A', 'example@example.com', '0123456789', 'Yêu cầu hỗ trợ', 'Tôi cần trợ giúp về việc mua vé nhưng mà không đủ tiền.', '2025-04-06 07:57:58'),
('Nguyen Van B', 'example@example.com', '0123456789', 'Yêu cầu hỗ trợ', 'Tôi cần trợ giúp về việc mua vé nhưng mà không đủ tiền.', '2025-04-17 06:09:29'),
('Nguyen Van B', 'example@example.com', '0123456789', 'Yêu cầu hỗ trợ', 'Tôi cần trợ giúp về việc mua vé nhưng mà không đủ tiền.', '2025-04-17 06:09:50');

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
(2, 'Prenium', 'https://tngo.vn/image/rfid-premium.jpg', 20000, 500000, 50000, 10),
(3, 'VIP', 'https://tngo.vn/image/rfid-vip.jpg', 20000, 1000000, 300000, 100);

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
(21, 'Tiến', 3, 'VIP', 11852000, 210000, '2025-04-14', '2026-04-14'),
(29, 'Tiến', 3, 'VIP', 500000, 0, '2025-04-08', '2026-04-08'),
(36, 'Aoba', 3, 'VIP', 1035000, 70000, '2025-04-24', '2026-04-24');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tram`
--

CREATE TABLE `tram` (
  `id_tram` int(11) NOT NULL,
  `thanh_pho` varchar(50) NOT NULL,
  `ten_tram` varchar(255) DEFAULT NULL,
  `dia_chi` text DEFAULT NULL,
  `vi_do` double DEFAULT NULL,
  `kinh_do` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tram`
--

INSERT INTO `tram` (`id_tram`, `thanh_pho`, `ten_tram`, `dia_chi`, `vi_do`, `kinh_do`) VALUES
(1, 'Hồ Chí Minh', 'Hàm Nghi', '10 Hàm Nghi - Phường Bến Nghé - Quận 1 - TP Hồ Chí Minh', 10.77126325, 106.70536099149533),
(2, 'Hồ Chí Minh', 'Trường Cao đẳng Kỹ thuật Cao Thắng', '126 Hàm Nghi - Phường Nguyễn Thái Bình - Quận 1 - TP Hồ Chí Minh', 10.770864675695108, 106.70018914147266),
(3, 'Hồ Chí Minh', 'Công ty Cổ phần Vận tải Đường sắt Sài Gòn', '136 Hàm Nghi - Phường Bến Thành - Quận 1 - TP Hồ Chí Minh', 10.77146085, 106.69927382070756),
(4, 'Hồ Chí Minh', 'Thương xá Tax', '102 Nguyễn Huệ - Phường Bến Nghé - Quận 1 - TP Hồ Chí Minh', 10.77223185, 106.70485524502303),
(5, 'Hồ Chí Minh', 'Nguyễn Huệ', '1 Nguyễn Huệ - Phường Bến Nghé - Quận 1 - TP Hồ Chí Minh', 10.77223185, 106.70485524502303),
(6, 'Hồ Chí Minh', 'Phạm Hồng Thái', '46 Phạm Hồng Thái - Phường Bến Thành - Quận 1 - TP Hồ Chí Minh', 10.771250926217633, 106.6950395623589),
(7, 'Hồ Chí Minh', 'Công viên 23/9 (đường Phạm Ngũ Lão)', '111-103 Phạm Ngũ Lão - Phường Phạm Ngũ Lão - Quận 1 - TP Hồ Chí Minh', 10.768103427771809, 106.69187887887976),
(8, 'Hồ Chí Minh', 'Tòa nhà Kumho', '39 Lê Duẩn - Phường Bến Nghé - Quận 1 - TP Hồ Chí Minh', 10.7811561, 106.70066312566205),
(9, 'Hồ Chí Minh', 'Thảo Cầm Viên', '2 Nguyễn Bỉnh Khiêm - Phường Bến Nghé - Quận 1 - TP Hồ Chí Minh', 10.7884429, 106.70404215499451),
(10, 'Hồ Chí Minh', 'Công viên Tao Đàn', 'Trương Định - Phường Bến Thành - Quận 1 - TP Hồ Chí Minh', 10.7767426, 106.70324823258863),
(11, 'Hồ Chí Minh', 'Tổng công ty xây dựng Số 6', '111A Pasteur, Phường Bến Nghé, Quận 1, TP Hồ Chí Minh', 10.775646153355103, 106.70043655277057),
(12, 'Hồ Chí Minh', 'Nhà hát Thành Niên', '4 Phạm Ngọc Thạch - Phường Bến Nghé - Quận 1 - TP Hồ Chí Minh', 10.7813773, 106.6974479),
(13, 'Hồ Chí Minh', 'Mạc Đĩnh Chi', '22 Nguyễn Thị Minh Khai - Phường Đa Kao - Quận 1 - TP Hồ Chí Minh', 10.786522999999999, 106.70149645000001),
(14, 'Hồ Chí Minh', 'Trung tâm TDTT Hoa Lư', '2 Đinh Tiên Hoàng, Phường Đa Kao - Quận 1 - TP Hồ Chí Minh', 10.787560213109177, 106.70057798875487),
(15, 'Hồ Chí Minh', 'Công viên Paris', '1 Công xã Paris - Phường Bến Nghé - Quận 1 - TP Hồ Chí Minh', 10.77995565, 106.6999920762309),
(16, 'Hồ Chí Minh', 'Khách sạn Le Meridien Saigon', '3C Tôn Đức Thắng - Phường Bến Nghé - Quận 1 - TP Hồ Chí Minh', 10.779937199999999, 106.70730615979153),
(17, 'Hồ Chí Minh', 'Trung tâm thương mại Sài Gòn', '37 Đường Tôn Đức Thắng - Phường Bến Nghé - Quận 1 - TP Hồ Chí Minh', 10.779675316436851, 106.70778531592748),
(18, 'Hồ Chí Minh', 'Bảo tàng Tôn Đức Thắng', '5 Tôn Đức Thắng - Phường Bến Nghé - Quận 1 - TP Hồ Chí Minh', 10.7781086, 106.7061218),
(19, 'Hồ Chí Minh', 'Lễ Thành Tôn', '2 Lê Thánh Tôn - Phường Bến Nghé - Quận 1 - TP Hồ Chí Minh', 10.7821981, 106.7059216),
(20, 'Hồ Chí Minh', 'Sơ kế hoạch Đầu tư', '32 Lê Thánh Tôn - Phường Bến Nghé - Quận 1 - TP Hồ Chí Minh', 10.775173972748437, 106.69998253846506),
(21, 'Hồ Chí Minh', 'Công viên Chi Lăng', '1 Lê Thánh Tôn - Phường Bến Nghé - Quận 1 - TP Hồ Chí Minh', 10.7765867, 106.70091770254902),
(22, 'Hồ Chí Minh', 'Bảo tàng Hồ Chí Minh', '65 Lý Tự Trọng - Phường Bến Nghé - Quận 1 - TP Hồ Chí Minh', 10.778569486821247, 106.7015995871049),
(23, 'Vũng Tàu', 'Sân vận động Lam Sơn', '15 Lê Lợi - Phường 1 - TP Vũng Tàu', 10.3523688, 107.07364687600037),
(24, 'Vũng Tàu', 'Thái Văn Lung', 'Thái Văn Lung - Phường 2 - TP Vũng Tàu', 10.336265219465934, 107.08331051657349),
(25, 'Vũng Tàu', 'Công viên Thỏ Trắng', '169 Thùy Vân - Phường 2 - TP Vũng Tàu', 10.33189595783426, 107.08901697047396),
(26, 'Vũng Tàu', 'Mạc Thanh Đàm', '28 Thùy Vân - Phường 8 - TP Vũng Tàu', 10.352101446067453, 107.10173229405203),
(27, 'Vũng Tàu', 'Khối thư viện Nam', '16 Mạc Thanh Đàm - Phường 8 - TP Vũng Tàu', 10.35377840789935, 107.10040202127416),
(28, 'Vũng Tàu', 'Cao ốc Sưu', '110 Thùy Vân - Phường Thắng Tam - TP Vũng Tàu', 10.342740369123886, 107.09468811629014),
(29, 'Vũng Tàu', 'Trung tâm hội chợ TP Vũng Tàu', '242 Nguyễn An Ninh - Phường 8 - TP Vũng Tàu', 10.356478647915443, 107.1006461698097),
(30, 'Vũng Tàu', 'Hồ quang lý độ thuyết 1', '83 Lý Thường Kiệt - Phường 1 - TP Vũng Tàu', 10.34806437436481, 107.07721231887622),
(47, 'Vũng Tàu', 'Bưu Điện Vũng Tàu', '408 Lê Hồng Phong - Phường Thắng Tam - TP Vũng Tàu', 10.35062224127925, 107.09043809635773),
(48, 'Vũng Tàu', 'Chung cư Melody', '149 Võ Thị Sáu - Phường Thắng Tam - TP Vũng Tàu', 10.341941946197846, 107.08935734537378),
(49, 'Vũng Tàu', 'Công an Phường 3', '76 Trương Công Định - Phường 3 - TP Vũng Tàu', 10.346194350000001, 107.08106870872781),
(50, 'Hà Nội', 'Trạm Số 289 Kim Mã', 'Số 289 Kim Mã - Phường Giảng Võ - Quận Ba Đình - TP Hà Nội', 21.03078104493945, 105.81896475073061),
(51, 'Hà Nội', 'Trạm Công Viên Bách Thảo', 'Số 3 Đường Hoàng Hoa Thám - Phường Ngọc Hà - Quận Ba Đình - TP Hà Nội', 21.040819834654233, 105.82448526416333),
(52, 'Hà Nội', 'Trạm Số 289 Kim Mã', 'Số 289 Kim Mã - Phường Giảng Võ - Quận Ba Đình - TP Hà Nội', 21.03078104493945, 105.81896475073061),
(53, 'Hà Nội', 'Trạm Công Viên Bách Thảo', 'Số 3 Đường Hoàng Hoa Thám - Phường Ngọc Hà - Quận Ba Đình - TP Hà Nội', 21.040819834654233, 105.82448526416333),
(54, 'Hà Nội', 'Trạm Số 30 Phan Đình Phùng', 'Số 30 Phan Đình Phùng - Phường Quán Thánh - Quận Ba Đình - TP Hà Nội', 21.041337778866616, 105.83811634407652),
(55, 'Hà Nội', 'Trạm Số 34 Trần Phú', 'Số 34 Trần Phú - Phường Điện Biên - Quận Ba Đình - TP Hà Nội', 21.0302309, 105.8437626),
(56, 'Hà Nội', 'Trạm Nhà Hát Chèo Việt Nam', 'Số 71 Kim Mã - Phường Kim Mã - Quận Ba Đình - TP Hà Nội', 21.031906990460495, 105.82578486331751),
(57, 'Hà Nội', 'Trạm Số 30 Văn Cao', 'Số 30 Văn Cao - Phường Liễu Giai - Quận Ba Đình - TP Hà Nội', 21.0403168, 105.8157537),
(58, 'Hà Nội', 'Trạm Số 380 Lạc Long Quân', 'Số 380 Lạc Long Quân - Phường Xuân La - Quận Tây Hồ - TP Hà Nội', 21.0677594, 105.8112678),
(59, 'Hài Phòng', 'Trạm Bưu Điện TP Hải Phòng', 'Số 5a Hoàng Văn Thụ - Phường Minh Khai - Quận Hồng Bàng - TP Hải Phòng', 20.866290910852236, 106.6810042200941),
(60, 'Đà Nẵng', 'Trạm Công Viên Đường Hùng Vương', 'Công Viên Đường Hùng Vương - Quận Hải Châu - TP Đà Nẵng', 16.0685454, 108.2218698),
(61, 'Đà Nẵng', 'Trạm Đại Học Đông Á Đường Xô Viết Nghệ Tĩnh', 'Số 26 Đường Xô Viết Nghệ Tĩnh - Phường Hòa Cường Bắc - Quận Hải Châu - TP Đà Nẵng', 16.03368257925975, 108.22726028896354),
(62, 'Đà Nẵng', 'Trạm THPT Nguyễn Hiền Đường Phan Đăng Lưu', 'Số 6 Đường Phan Đăng Lưu - Phường Hòa Cường Bắc - Quận Hải Châu - TP Đà Nẵng', 16.0371706163831, 108.22020965033427),
(63, 'Đà Nẵng', 'Trạm Siêu Thị Lotte Mart Đường Vũ Duy Thanh', 'Đường Vũ Duy Thanh - Phường Hòa Cường Bắc - Quận Hải Châu - TP Đà Nẵng', 16.036730797727135, 108.22939381185132);

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
(1, '2505@example.com', '$2a$10$8iGu6ouD7.DjvhXZGicV7eT3qk7Wh0UdP5nWRAFG7f/a9vC1u4mjW', 'newusername', '0123456789', 'user'),
(2, 'admin@example.com', '$2a$10$wZ2fsJMTb7x2Xl5E/EHgJOhLfB9G.G3IV4Z1eGc0PBM5zAfhy5Q8O', 'Admin User', '0123456789', 'user'),
(3, 'lebinh@gmail.com', '$2b$10$lri3Su1RFntkKcUraf91V.evioKP15l7cHIDQKuz3E/4/0ii/1EKK', 'Admin User', '098765432', 'user'),
(4, 'thanhvinh123@gmail.com', '$2b$10$eEVAJcFSaJlJ2qqcBPyEW.Flku7EL6G5MQsDu.oy4Qwa0LKD3uyAu', 'user', '098765432', 'user'),
(5, 'user2@example.com', '$2b$10$8Dgw0Ks6pcxdd3c40CLakuxkRICG2eOkwl.ATRmUtDJm236atNuN.', 'binh', '012345678', 'user'),
(9, 'user123456@example.com', '$2b$10$3jFo93A7tBH3LjvTCjlGBOfQuY861Z3BFaWw21QpDeGjkn3O266r6', 'vinh123', '0886485440', 'user'),
(10, 'tes123t@example.com', '$2b$10$LnzYHjKIoSjoZLcEOzvmT.f9DXq2d7GB4nLhdYB0oGVo1hK8AsdTK', 'vinh1', '0888312227', 'user'),
(11, 'example@example.com', '$2b$10$8l8Xr6HEP35Rf8/u7HIUXuZ4O9lOFYmWNYmZBB2si9sKAuZEXmuyO', 'exampleuser', '1234567890', 'user'),
(21, 'tien632004@gmail.com', '$2b$10$BMdzU/Y9XjkjH0K.r5j4cOFDf35f9RJOZEMU/GrHj2iFw8Gj/McvK', 'Tiến', '098765432', 'user'),
(23, 'tien4@gmail.com', '$2b$10$9Dgv9xXPEtF3iDv17BixKejXwdW5189YDYgrSsiOI2HWhagfA8PXy', 'Đặng Tiến Minh', '0886485440', 'user'),
(26, '12345@gmail.com', '$2b$10$tZJLWKNia3Yd0ou18zIINe2WrdqFpxG9A1iQiA9csIAuVWnzck7MS', 'User 123', '0987654321', 'user'),
(28, 'vinhthanhnguyen12122004@gmail.com', '$2b$10$BPn.yRUAvk3jPVm44eTjiePDcDJMnq8MH.HG3/V..6zdMe8Q8fzIi', 'A Vinh Cờ Tướng', '0987654321', 'user'),
(29, 'kiritanitaiyo@gmail.com', '$2b$10$TVqqjid/L72DS96WZ21ECO37GAWSWC5Roo/WEyhsBgSX9tSyZxAxa', 'Tiến', '0987654321', 'user'),
(32, 'adminTNGO@gmail.com', '$2b$10$rqngEqbYju7OSIAipYW3P.iIhJ.TQv48QibPeXuUp0xdrHNLGR3Ii', 'Admin123', '073281352', 'admin'),
(34, 'tienbi63543@gmail.com', '$2b$10$1yozPp/RDM8bZ3N/rdxtC.EwDi4C.5xm0Njz.7BBvg43.FhUjn332', 'Tiến Minh', '0886485440', 'user'),
(35, '2251120118@ut.edu.vn', '$2b$10$QGVzckFLSstNUkSatV7S9ui4eNNBJygzUAaLvlLelVipH4fAioJp.', 'Tiến 123', '0886485440', 'user'),
(36, 'arcgenshin2505@gmail.com', '$2b$10$HnVDgafS4MSJ8u9BzTN2jOQseRuRU4Uup.DKtGdxNcppQ5H6TUh6u', 'Aoba', '0988312227', 'user');

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
(21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImVtYWlsIjoidGllbjYzMjAwNEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRCTWR6VS9ZOVhqa2pIMEsucjVqNGNPRkRmMzVmOVJKT1pFTVUvR3JIajJpRnc4R2ovTWN2SyIsInJvbGUiOiJ1c2VyIn0.9nwemE2x-LGMHVX5lw8x6oA5gvzElBEMmN6_GQNfp-U', '2025-04-06 10:35:43'),
(23, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRpZW40QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJDlEZ3Y5eFhQRXRGM2lEdjE3Qml4S2VqWHdkVzUxODlZRFlnclNzaU9JMkhXaGFnZkE4UFh5Iiwicm9sZSI6IlVzZXIifQ.aNQAsQ5zgxeDuSYEFBC_dIXPnMz8p7DP1XhUMlHvZ2E', '2025-04-06 15:09:23'),
(28, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImVtYWlsIjoidmluaHRoYW5obmd1eWVuMTIxMjIwMDRAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkQlBuLnlSVUF2azNqUFZtNDRlVGppZVBEY0RKTW5xOE1ILkhHMy9WLi42emRNZThROGZ6SWkiLCJyb2xlIjoiVXNlciJ9.qK6NpQpVHsc1cr6OyEJB48X3EoR7Y7FqeowvzFXiG9A', '2025-04-08 22:28:08'),
(29, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksImVtYWlsIjoia2lyaXRhbml0YWl5b0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRUVnFxamlkL0w3MkRTOTZXWjIxRUNPMzdHQVdTV0M1Um9vL1dFeWhzQmdTWDl0U3laeEF4YSIsInJvbGUiOiJVc2VyIn0.NGXvwgxK2zffM_3TFdOcOy4FuwAsIqdj_DfwiQ95YCA', '2025-04-08 22:38:21'),
(32, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoiYWRtaW5UTkdPQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHJxbmdFcWJZanU3T1NJQWlwWVczUC5pSWhKLlRRdjQ4UWliUGVYdVVwMHhkckhOTEdSM0lpIiwicm9sZSI6ImFkbWluIn0.6CzvDliZNTK91n-t1Q8TwotQSSyXECzKAax4O0EoJIs', '2025-04-14 23:46:21'),
(34, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImVtYWlsIjoidGllbmJpNjM1NDNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkMXlvelBwL1JETThiWjNOL3JkeHRDLkV3RGk0Qy41eG0wTmp6LjdCQnZnNDMuRmhVam4zMzIiLCJyb2xlIjoidXNlciJ9.mVLCxIwo3JxhXtwScchJPO-qeqMIft9fdu89yC2ltUE', '2025-04-22 09:57:13'),
(35, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUsImVtYWlsIjoiMjI1MTEyMDExOEB1dC5lZHUudm4iLCJwYXNzd29yZCI6IiQyYiQxMCRRR1Z6Y2tGTFNzdE5Va1NhdFY3Uzl1aTRlTk5CSnlnelVBYUx2bExlbFZpcEg0ZkFpb0pwLiIsInJvbGUiOiJ1c2VyIn0.HWRKE-jzO81_AYtg8kYpdTEgl3QjlJ9g0u6sndnO730', '2025-04-24 14:08:27'),
(36, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImVtYWlsIjoiYXJjZ2Vuc2hpbjI1MDVAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkSG5WRGdhZlM0TVNKOHU5QnpUTjJqT1FzZVJ1UlU0VXVwLkRLdEdkeE5jcHBRNUg2VFVoNnUiLCJyb2xlIjoidXNlciJ9.zMEp7ye2CBcxWJkii0tGT4AhoLxT7xblnb0_Tzr0wN8', '2025-04-24 14:23:44');

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
(4, 'Vé lượt', 'Xe đạp điện', 20000, '60 phút', '60 phút', '3.000 điểm/15 phút', 'Bạn phải có số dư tối thiểu 40.000 điểm TNGO'),
(5, 'Vé ngày', 'Xe đạp điện', 100000, '450 phút', '24h ngày đăng ký', '6.000 điểm/15 phút', ''),
(7, 'Vé Tháng', 'xe đạp điện', 200000, 'Miễn phí tất cả chuyến đi dưới 60 phút', '60 ngày kể từ ngày đăng ký', 'Không có', 'Bạn sẽ được miễn phí vé nếu đánh cờ tướng thắng anh Vinh'),
(8, 'Vé tháng', 'Xe đạp cơ', 89000, 'Miễn phí tất cả chuyến đi dưới 60 phút', '60 ngày kể từ ngày đăng ký', '0 điểm', 'Bạn phải là thành viên lâu năm');

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
(9, 21, 'Tiến', 1, 'Vé lượt', 'Xe đạp cơ', '2025-04-22', '60 phút', 21),
(10, 34, 'Tiến Minh', 1, 'Vé lượt', 'Xe đạp cơ', '2025-04-22', '60 phút', 10),
(11, 36, 'Aoba', 1, 'Vé lượt', 'Xe đạp cơ', '2025-04-24', '60 phút', 2),
(12, 36, 'Aoba', 2, 'Vé ngày', 'Xe đạp cơ', '2025-04-24', '24h ngày đăng ký', 1),
(13, 36, 'Aoba', 2, 'Vé ngày', 'Xe đạp cơ', '2025-04-24', '24h ngày đăng ký', 1);

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
-- Chỉ mục cho bảng `tram`
--
ALTER TABLE `tram`
  ADD PRIMARY KEY (`id_tram`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT cho bảng `ve`
--
ALTER TABLE `ve`
  MODIFY `ve_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `ve_nguoi_dung`
--
ALTER TABLE `ve_nguoi_dung`
  MODIFY `id_donhang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
