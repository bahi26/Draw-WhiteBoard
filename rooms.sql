-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 05, 2018 at 02:48 PM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `os_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `creation_time` datetime DEFAULT '0000-00-00 00:00:00',
  `state` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `creator_id`, `creation_time`, `state`) VALUES
(1, 'barca', 1, '2018-04-19 00:00:00', 1),
(2, 'arsenal', 1, '2018-04-10 04:24:12', 1),
(5, 'ahly', 1, '2018-04-17 08:24:15', 1),
(6, 'manchester', 1, '0000-00-00 00:00:00', 1),
(40, 'valnacia', 1, '0000-00-00 00:00:00', 1),
(41, '90', 4, '0000-00-00 00:00:00', 1),
(42, 'yasmine', 4, '2018-05-02 15:07:47', 0),
(43, 'lyon', 4, '2018-05-02 15:11:13', 1),
(44, 'yy', 4, '2018-05-02 15:15:45', 1),
(45, 'bahi', 4, '2018-05-02 15:21:21', 1),
(46, 'y', 4, '2018-05-02 15:27:28', 1),
(47, 'bahi2', 4, '2018-05-02 15:29:27', 1),
(48, 'yasmin', 4, '2018-05-02 15:33:21', 0),
(55, '', 4, '2018-05-05 10:51:58', 1),
(56, 'knjj', 4, '2018-05-05 11:02:33', 1),
(57, 'Room1', 1, '2018-05-05 11:06:36', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `creator_id` (`creator_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
