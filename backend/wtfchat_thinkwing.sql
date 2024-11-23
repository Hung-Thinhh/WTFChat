-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 23, 2024 lúc 05:13 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `wtfchat_thinkwing`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phongchat`
--

CREATE TABLE `phongchat` (
  `id` int(11) NOT NULL,
  `groupName` varchar(255) NOT NULL,
  `avt` varchar(255) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `update_time` datetime NOT NULL,
  `createdAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `phongchat`
--

INSERT INTO `phongchat` (`id`, `groupName`, `avt`, `type`, `update_time`, `createdAt`) VALUES
(1, '', NULL, 0, '2024-11-12 01:37:54', NULL),
(2, '', NULL, 0, '2024-11-08 04:06:00', NULL),
(3, '', NULL, 0, '2024-11-07 11:33:55', NULL),
(4, '', NULL, 0, '2024-11-13 03:42:03', NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `phongchat`
--
ALTER TABLE `phongchat`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `phongchat`
--
ALTER TABLE `phongchat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
