-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 07, 2025 lúc 06:24 AM
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
-- Cấu trúc bảng cho bảng `gio_hang`
--

CREATE TABLE `gio_hang` (
  `nguoi_dung_id` int(11) NOT NULL,
  `ten_ve` varchar(50) NOT NULL,
  `so_luong` int(11) NOT NULL,
  `gia` int(11) NOT NULL,
  `ngay_tao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `phi_kich_hoat` decimal(10,2) NOT NULL,
  `so_du_toi_thieu` decimal(10,2) NOT NULL,
  `diem_thuong` int(11) NOT NULL,
  `so_xe_toi_da` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `the`
--

INSERT INTO `the` (`the_id`, `loai_the`, `img`, `phi_kich_hoat`, `so_du_toi_thieu`, `diem_thuong`, `so_xe_toi_da`) VALUES
(1, 'RideUp', 'https://tngo.vn/image/Rectangle%20669.jpg', 20000.00, 100000.00, 10000, 3),
(2, 'Prenium', 'https://tngo.vn/image/Rectangle%20670.jpg', 20000.00, 1000000.00, 50000, 10),
(3, 'VIP', 'https://tngo.vn/image/Rectangle%20671.jpg', 200000.00, 10000000.00, 500000, 100000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `the_nguoi_dung`
--

CREATE TABLE `the_nguoi_dung` (
  `id` int(11) NOT NULL,
  `ten_nguoi_dung` varchar(100) NOT NULL,
  `the_id` int(11) NOT NULL,
  `loai_the` varchar(50) NOT NULL,
  `so_du_diem` decimal(10,2) NOT NULL,
  `diem_da_su_dung` int(11) NOT NULL DEFAULT 0,
  `diem_con_lai` int(11) NOT NULL,
  `ngay_mua` date NOT NULL,
  `ngay_het_han` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `the_nguoi_dung`
--

INSERT INTO `the_nguoi_dung` (`id`, `ten_nguoi_dung`, `the_id`, `loai_the`, `so_du_diem`, `diem_da_su_dung`, `diem_con_lai`, `ngay_mua`, `ngay_het_han`) VALUES
(21, 'Đặng Minh Tiến', 1, 'RideUp', 3780000.00, 240000, 10000, '2025-04-06', '2026-04-06');

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
(4, 'thanhvinh123@gmail.com', '$2b$10$pXAfNKwQZ6GcBPRL8vRZZuuhHd7zlFXNKlViL4svtmR9X.4bottwC', 'exampleuser', '123456789', 'User'),
(5, 'user2@example.com', '$2b$10$8Dgw0Ks6pcxdd3c40CLakuxkRICG2eOkwl.ATRmUtDJm236atNuN.', 'binh', '012345678', 'User'),
(9, 'user123456@example.com', '$2b$10$3jFo93A7tBH3LjvTCjlGBOfQuY861Z3BFaWw21QpDeGjkn3O266r6', 'vinh123', '0886485440', 'User'),
(10, 'tes123t@example.com', '$2b$10$LnzYHjKIoSjoZLcEOzvmT.f9DXq2d7GB4nLhdYB0oGVo1hK8AsdTK', 'vinh1', '0888312227', 'User'),
(11, 'example@example.com', '$2b$10$8l8Xr6HEP35Rf8/u7HIUXuZ4O9lOFYmWNYmZBB2si9sKAuZEXmuyO', 'exampleuser', '1234567890', 'User'),
(21, 'tien632004@gmail.com', '$2b$10$SmiIfQ8ejkb6MOMEOBWcBulBJoYrwoumwITliwY4/jROtoyXU0vtG', 'Đặng Minh Tiến', '0886485440', 'User'),
(23, 'tien4@gmail.com', '$2b$10$9Dgv9xXPEtF3iDv17BixKejXwdW5189YDYgrSsiOI2HWhagfA8PXy', 'Đặng Tiến Minh', '0886485440', 'User');

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
(21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIxLCJlbWFpbCI6InRpZW42MzIwMDRAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkU21pSWZROGVqa2I2TU9NRU9CV2NCdWxCSm9ZcndvdW13SVRsaXdZNC9qUk90b3lYVTB2dEcifQ.b2joG-slMLzkUSLf4axGtU-X2V0jI8XGj8B6HkMB4xk', '2025-04-06 10:35:43'),
(23, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRpZW40QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJDlEZ3Y5eFhQRXRGM2lEdjE3Qml4S2VqWHdkVzUxODlZRFlnclNzaU9JMkhXaGFnZkE4UFh5Iiwicm9sZSI6IlVzZXIifQ.aNQAsQ5zgxeDuSYEFBC_dIXPnMz8p7DP1XhUMlHvZ2E', '2025-04-06 15:09:23');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ve`
--

CREATE TABLE `ve` (
  `ve_id` int(11) NOT NULL,
  `ten_ve` varchar(50) DEFAULT NULL,
  `diem_tngo` int(11) DEFAULT NULL,
  `thoi_gian_hieu_luc` varchar(50) DEFAULT NULL,
  `hieu_luc` varchar(50) DEFAULT NULL,
  `phi_phat_sinh` varchar(50) DEFAULT NULL,
  `ghi_chu` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `ve`
--

INSERT INTO `ve` (`ve_id`, `ten_ve`, `diem_tngo`, `thoi_gian_hieu_luc`, `hieu_luc`, `phi_phat_sinh`, `ghi_chu`) VALUES
(1, 'Vé lượt', 10000, '60 phút', '60 phút', '3.000 điểm/15 phút', 'Bạn phải có số dư tối thiểu 20.000 điểm TNGO'),
(2, 'Vé ngày', 50000, '450 phút', '24h ngày đăng ký', '3.000 điểm/15 phút', 'Bạn phải có số dư tối thiểu 20.000 điểm TNGO'),
(3, 'Vé tháng', 79000, 'Miễn phí tất cả chuyến đi dưới 45 phút', '30 ngày kể từ ngày đăng ký', '3.000 điểm/15 phút', 'Bạn phải có số dư tối thiểu 20.000 điểm TNGO');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ve_nguoi_dung`
--

CREATE TABLE `ve_nguoi_dung` (
  `id` int(11) NOT NULL,
  `ten_nguoi_dung` varchar(100) NOT NULL,
  `ve_id` int(11) NOT NULL,
  `ten_ve` varchar(50) NOT NULL,
  `ngay_mua` date NOT NULL,
  `thoi_han` varchar(50) NOT NULL,
  `so_luong` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `ve_nguoi_dung`
--

INSERT INTO `ve_nguoi_dung` (`id`, `ten_nguoi_dung`, `ve_id`, `ten_ve`, `ngay_mua`, `thoi_han`, `so_luong`) VALUES
(21, 'Đặng Minh Tiến', 2, 'Vé ngày', '2025-04-06', '24h ngày đăng ký', 2);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `gio_hang`
--
ALTER TABLE `gio_hang`
  ADD PRIMARY KEY (`nguoi_dung_id`);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ve` (`ve_id`),
  ADD KEY `ten_nguoi_dung` (`ten_nguoi_dung`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `ve`
--
ALTER TABLE `ve`
  MODIFY `ve_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `gio_hang`
--
ALTER TABLE `gio_hang`
  ADD CONSTRAINT `gio_hang_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `users` (`id`);

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
  ADD CONSTRAINT `fk_ve` FOREIGN KEY (`ve_id`) REFERENCES `ve` (`ve_id`),
  ADD CONSTRAINT `fk_ve_nguoi_dung_users` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
