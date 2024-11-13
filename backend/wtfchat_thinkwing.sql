-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 13, 2024 lúc 10:26 AM
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
-- Cấu trúc bảng cho bảng `banbe`
--

CREATE TABLE `banbe` (
  `id` int(11) NOT NULL,
  `useroneid` int(11) DEFAULT NULL,
  `usertwoid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `banbe`
--

INSERT INTO `banbe` (`id`, `useroneid`, `usertwoid`) VALUES
(1, 861, 868),
(2, 638, 868),
(3, 868, 873);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `baocao`
--

CREATE TABLE `baocao` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `type` int(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoidung`
--

CREATE TABLE `nguoidung` (
  `id` int(11) NOT NULL,
  `firstname` varchar(30) DEFAULT NULL,
  `lastname` varchar(30) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `gender` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nguoidung`
--

INSERT INTO `nguoidung` (`id`, `firstname`, `lastname`, `email`, `avatar`, `birthdate`, `gender`) VALUES
(638, 'TRAN', 'F', 'NGJ@GMAIL.COM', 'https://i.pinimg.com/236x/90/f9/cb/90f9cb5a242a89fbe620a07078753c7b.jpg', NULL, NULL),
(861, 'Nguyễn Bình', 'Minhs', 'binhminh19112003@gmail.com', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcDMDZc1HHcAYvyIkdPhqiGzN79WaFPPU8-Q&s', '2003-09-22', 0),
(862, 'Nguyễn Bình', 'Minh', 'binhminh18112003@gmail.com', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcDMDZc1HHcAYvyIkdPhqiGzN79WaFPPU8-Q&s', '2003-10-18', 0),
(863, '', 'admin', 'admin', NULL, '2003-10-18', 0),
(868, 'nguyen', 'dragonccm', 'nguyenngoclong5511@gmail.com', 'https://avatars.akamai.steamstatic.com/02c5625098085f4fc668f3a28f8fcff83501ae27_full.jpg', '2003-09-30', 0),
(869, '', 'ktring', 'ktring18102003@gmail.com', NULL, '2003-10-27', 0),
(870, 'Hoang', 'Longg', 'hlon16102003@gmail.com', NULL, '2003-10-18', 1),
(871, '', 'v', 'nguyencongthang 1541@gmail.com', NULL, '2006-05-07', 0),
(872, 'Nguyễn Bình', 'Minh', 'nbminh2101381@student.ctuet.edu.vn', NULL, '2003-10-18', 0),
(873, '', 'ddddd', 'nguyencongthang1541@gmail.com', NULL, '2003-01-20', 0),
(874, '', 'nht', 'hungthinhh2003@gmail.com', NULL, '2003-04-25', 0),
(875, '', 'nht2', 'nhthinh2101518@student.ctuet.edu.vn', NULL, '2003-04-25', 0);

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

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `report_type`
--

CREATE TABLE `report_type` (
  `id` int(11) NOT NULL,
  `content` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `report_type`
--

INSERT INTO `report_type` (`id`, `content`) VALUES
(1, 'Spam'),
(2, 'Bạo lực'),
(3, 'Ngược đãi trẻ em '),
(4, 'Khiêu dâm'),
(5, 'Chất cấm');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thanhvien`
--

CREATE TABLE `thanhvien` (
  `id` int(11) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `idRoom` int(11) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `notify` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `thanhvien`
--

INSERT INTO `thanhvien` (`id`, `userid`, `idRoom`, `role`, `notify`) VALUES
(1, 874, 1, NULL, 1),
(2, 868, 1, NULL, 1),
(3, 874, 2, 1, 1),
(4, 870, 2, 1, 1),
(5, 874, 3, 1, 1),
(6, 862, 3, 1, 1),
(7, 874, 4, 1, 1),
(8, 875, 4, 1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tinnhan`
--

CREATE TABLE `tinnhan` (
  `id` int(11) NOT NULL,
  `idRoom` int(11) NOT NULL,
  `idThanhvien` int(11) DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  `time` datetime NOT NULL,
  `numlike` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tinnhan`
--

INSERT INTO `tinnhan` (`id`, `idRoom`, `idThanhvien`, `content`, `time`, `numlike`) VALUES
(1, 1, 1, 'ok', '2024-11-06 10:44:38', NULL),
(2, 2, 4, 'sao', '2024-11-06 14:52:52', NULL),
(3, 3, 5, 't là ai', '2024-11-06 14:52:52', NULL),
(4, 2, 1, 'sao là sao', '2024-11-06 23:42:45', NULL),
(5, 2, 3, 'có gì đâu', '2024-11-07 07:52:52', NULL),
(6, 2, 3, 'aaa', '2024-11-07 10:23:27', NULL),
(7, 2, 3, 'a', '2024-11-07 10:26:10', NULL),
(8, 2, 3, 'a', '2024-11-07 10:26:53', NULL),
(9, 2, 3, 'sao', '2024-11-07 11:07:22', NULL),
(10, 2, 3, 'a', '2024-11-07 11:21:24', NULL),
(11, 3, 5, 'ok', '2024-11-07 11:24:56', NULL),
(12, 3, 5, 'cc', '2024-11-07 11:29:17', NULL),
(13, 3, 5, 'kh dc', '2024-11-07 11:33:55', NULL),
(14, 1, 1, 'ê', '2024-11-07 11:40:17', NULL),
(15, 1, 1, 'thoi mà', '2024-11-07 11:49:54', NULL),
(16, 1, 1, 'sao', '2024-11-07 11:53:53', NULL),
(17, 1, 1, 'um', '2024-11-07 11:54:02', NULL),
(18, 1, 1, 'a', '2024-11-07 11:54:26', NULL),
(19, 1, 1, 'um', '2024-11-07 11:58:07', NULL),
(20, 1, 1, 'um', '2024-11-07 11:58:21', NULL),
(21, 1, 1, 'a', '2024-11-07 11:58:32', NULL),
(22, 1, 1, 'a', '2024-11-07 12:00:04', NULL),
(23, 1, 1, 'a', '2024-11-07 12:02:34', NULL),
(24, 1, 1, 'a', '2024-11-07 12:03:12', NULL),
(25, 1, 1, 'a', '2024-11-07 12:04:57', NULL),
(26, 1, 1, 'haha', '2024-11-07 12:06:14', NULL),
(27, 1, 1, 'a', '2024-11-07 12:07:08', NULL),
(28, 1, 1, 's', '2024-11-07 12:07:25', NULL),
(29, 1, 1, 'd', '2024-11-07 12:08:50', NULL),
(30, 1, 1, 's', '2024-11-07 12:10:56', NULL),
(31, 1, 1, 'a', '2024-11-07 12:17:12', NULL),
(32, 1, 1, 'woww', '2024-11-07 12:17:59', NULL),
(33, 1, 1, 'a\\', '2024-11-07 12:18:47', NULL),
(34, 1, 1, 'sao', '2024-11-07 12:19:31', NULL),
(35, 2, 3, 'sao', '2024-11-07 12:21:00', NULL),
(36, 2, 3, 'haha', '2024-11-07 12:23:01', NULL),
(37, 2, 3, 'aaaaa', '2024-11-07 12:23:26', NULL),
(38, 2, 3, 'tuổi', '2024-11-07 12:24:11', NULL),
(39, 2, 3, 'sao', '2024-11-07 12:25:05', NULL),
(40, 2, 3, 'a', '2024-11-07 15:02:21', NULL),
(41, 2, 3, 'a', '2024-11-07 15:02:52', NULL),
(42, 2, 3, 'ass', '2024-11-07 15:04:56', NULL),
(43, 2, 3, 'hay', '2024-11-07 15:06:27', NULL),
(44, 2, 3, 'why', '2024-11-07 15:07:17', NULL),
(45, 2, 3, 'lol', '2024-11-07 15:07:57', NULL),
(46, 2, 3, 'may', '2024-11-07 15:08:19', NULL),
(47, 2, 3, 'Bản giao hưởng đang phát thực sự là một tác phẩm âm nhạc tuyệt vời. Giai điệu của bản nhạc mang đến một cảm giác nhẹ nhàng, êm dịu, như một làn gió mát lành thổi qua tâm hồn. Những nốt nhạc du dương, kết hợp với giọng hát trong trẻo, ngọt ngào, tạo nên một bức tranh âm nhạc đầy màu sắc và cảm xúc.  Lời của bản giao hưởng không chỉ đơn thuần là những câu từ, mà còn chứa đựng những thông điệp sâu sắc về tình yêu thương, sự quan tâm và chăm sóc. Những hình ảnh con cò, cánh đồng, dòng sông được miêu', '2024-11-07 15:09:56', NULL),
(48, 2, 3, '🧨', '2024-11-07 15:10:19', NULL),
(49, 2, 3, 'yes', '2024-11-07 15:12:09', NULL),
(50, 2, 3, 'a', '2024-11-08 04:06:00', NULL),
(51, 4, 7, 'ok r đó', '2024-11-10 16:48:34', NULL),
(52, 4, 7, '寂し犬', '2024-11-10 16:50:01', NULL),
(53, 4, 8, 'nà ní', '2024-11-11 03:40:27', NULL),
(54, 4, 7, 'sao nào', '2024-11-11 04:17:10', NULL),
(55, 4, 7, 'ê', '2024-11-11 04:19:51', NULL),
(56, 4, 7, 'lỗi kìa', '2024-11-11 04:22:38', NULL),
(57, 4, 7, '?', '2024-11-11 04:23:24', NULL),
(58, 4, 7, 'đó', '2024-11-11 04:23:48', NULL),
(59, 4, 7, 'dc', '2024-11-11 04:24:18', NULL),
(60, 4, 8, 'chắc chưa', '2024-11-11 04:24:37', NULL),
(61, 4, 8, 'ha', '2024-11-11 04:26:23', NULL),
(62, 4, 7, '???', '2024-11-11 04:39:53', NULL),
(63, 4, 8, '寂し犬', '2024-11-11 04:40:03', NULL),
(64, 4, 8, 'mà sao lỗi kìa', '2024-11-11 04:40:19', NULL),
(65, 4, 7, 'lỗi gì', '2024-11-11 04:40:25', NULL),
(66, 4, 8, '寂し犬', '2024-11-12 01:35:29', NULL),
(67, 4, 7, 'siuuuu', '2024-11-12 01:36:16', NULL),
(68, 1, 1, 'cặt', '2024-11-12 01:37:16', NULL),
(69, 1, 2, 'mà sao lỗi kìa', '2024-11-12 01:37:54', NULL),
(70, 4, 7, 'sai', '2024-11-13 03:42:03', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `xacthuc`
--

CREATE TABLE `xacthuc` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` tinyint(4) DEFAULT 1,
  `role` tinyint(4) DEFAULT 1,
  `time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `xacthuc`
--

INSERT INTO `xacthuc` (`id`, `email`, `password`, `status`, `role`, `time`) VALUES
(861, 'binhminh19112003@gmail.com', '$2a$10$LC7rmxXPqu6A2zWISFYdnOmlMmmTOTPEy66FoJ8rUvm2XMWt3AqSu', 1, 1, NULL),
(862, 'binhminh18112003@gmail.com', '$2a$10$DB6rpzSHqc8/IGa2JsbYcegzNUluq1fWuHUQDG95hwlfVrwPcgx9q', 1, 1, NULL),
(863, 'admin', '$2a$10$nUrVIHowPOeoitzezFxZK.JyGEyOraf0nLFxaMi.fLohVDD.v3tq.', 1, 0, NULL),
(868, 'nguyenngoclong5511@gmail.com', '$2a$10$2GcNdwuHsDECoc3uUKLbpOz9zHTd8T0Ql5fXdJvRzHEmND7jWWIui', 1, 1, NULL),
(869, 'ktring18102003@gmail.com', '$2a$10$SN9H/wnzcNakcOh1Pw8vLO.kH3ZDfGrY6WfIkPpyNmvLeNSF.maHW', 1, 1, NULL),
(870, 'hlon16102003@gmail.com', '$2a$10$cAv8KRUzWycsyuxU8zGLCet5P5i07xHFV6fpqleCQnvJQtu/5gwIK', 1, 1, '2024-10-19 11:12:33'),
(871, 'nguyencongthang 1541@gmail.com', '$2a$10$EPddcdPzl25ml0yb44HKSumxkfGoBg4wTajQFYBl4YcPgsjDrwWJ2', 1, 1, '2024-10-21 09:42:47'),
(872, 'nbminh2101381@student.ctuet.edu.vn', '$2a$10$5CceZQmetIxLVBZ1ALapHu2RX8u3k8hZOzU/4F1SXhqh0ScB1dJf6', 1, 1, '2024-10-22 22:47:02'),
(873, 'nguyencongthang1541@gmail.com', '$2a$10$xxtXq.cuWFwz2i9rIG89T.KDpxekf5jypxA1wKdfuMCSSWn5r/Jd.', 1, 1, '2024-10-26 10:34:03'),
(874, 'hungthinhh2003@gmail.com', '$2a$10$UfEOuIKZgQZ/F43cJCvH/.hMlWLIaPULHKFowkvd.DIjCfp642rGy', 1, 1, '2024-11-06 16:41:25'),
(875, 'nhthinh2101518@student.ctuet.edu.vn', '$2a$10$gaOUlslOzfQaqV2k/HzHsuYRDEzowBLF7SdyJ/Bb0LD10E48pfrHq', 1, 1, '2024-11-08 00:17:14');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `banbe`
--
ALTER TABLE `banbe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser1` (`useroneid`),
  ADD KEY `idUser2` (`usertwoid`);

--
-- Chỉ mục cho bảng `baocao`
--
ALTER TABLE `baocao`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `fk_htk_id_baocao` (`type`);

--
-- Chỉ mục cho bảng `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `phongchat`
--
ALTER TABLE `phongchat`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `report_type`
--
ALTER TABLE `report_type`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `thanhvien`
--
ALTER TABLE `thanhvien`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`),
  ADD KEY `idRoom` (`idRoom`);

--
-- Chỉ mục cho bảng `tinnhan`
--
ALTER TABLE `tinnhan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idRoom` (`idRoom`),
  ADD KEY `idThanhvien` (`idThanhvien`);

--
-- Chỉ mục cho bảng `xacthuc`
--
ALTER TABLE `xacthuc`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `banbe`
--
ALTER TABLE `banbe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `baocao`
--
ALTER TABLE `baocao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `nguoidung`
--
ALTER TABLE `nguoidung`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=876;

--
-- AUTO_INCREMENT cho bảng `phongchat`
--
ALTER TABLE `phongchat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `report_type`
--
ALTER TABLE `report_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `thanhvien`
--
ALTER TABLE `thanhvien`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `tinnhan`
--
ALTER TABLE `tinnhan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `banbe`
--
ALTER TABLE `banbe`
  ADD CONSTRAINT `banbe_ibfk_1` FOREIGN KEY (`useroneid`) REFERENCES `nguoidung` (`id`),
  ADD CONSTRAINT `banbe_ibfk_2` FOREIGN KEY (`usertwoid`) REFERENCES `nguoidung` (`id`);

--
-- Các ràng buộc cho bảng `baocao`
--
ALTER TABLE `baocao`
  ADD CONSTRAINT `baocao_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `nguoidung` (`id`),
  ADD CONSTRAINT `fk_htk_id_baocao` FOREIGN KEY (`type`) REFERENCES `report_type` (`id`);

--
-- Các ràng buộc cho bảng `thanhvien`
--
ALTER TABLE `thanhvien`
  ADD CONSTRAINT `thanhvien_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `nguoidung` (`id`),
  ADD CONSTRAINT `thanhvien_ibfk_2` FOREIGN KEY (`idRoom`) REFERENCES `phongchat` (`id`);

--
-- Các ràng buộc cho bảng `tinnhan`
--
ALTER TABLE `tinnhan`
  ADD CONSTRAINT `tinnhan_ibfk_1` FOREIGN KEY (`idRoom`) REFERENCES `phongchat` (`id`),
  ADD CONSTRAINT `tinnhan_ibfk_2` FOREIGN KEY (`idThanhvien`) REFERENCES `thanhvien` (`id`);

--
-- Các ràng buộc cho bảng `xacthuc`
--
ALTER TABLE `xacthuc`
  ADD CONSTRAINT `xacthuc_ibfk_1` FOREIGN KEY (`id`) REFERENCES `nguoidung` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
