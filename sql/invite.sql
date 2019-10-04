-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 04, 2019 at 08:20 PM
-- Server version: 5.7.21
-- PHP Version: 7.1.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `invite`
--

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `name`, `lastname`, `email`, `password`) VALUES
(1, 'Ezequiel', 'Estigarribia', 'ezequielestigarribia@gmail.com', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `gifts`
--

DROP TABLE IF EXISTS `gifts`;
CREATE TABLE IF NOT EXISTS `gifts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `gifts`
--

INSERT INTO `gifts` (`id`, `description`) VALUES
(6, 'Microondas'),
(2, 'Plancha'),
(3, 'Tostadora'),
(4, 'Cafetera'),
(5, 'Microondas'),
(7, 'Acolchados');

-- --------------------------------------------------------

--
-- Table structure for table `gift_list`
--

DROP TABLE IF EXISTS `gift_list`;
CREATE TABLE IF NOT EXISTS `gift_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gift_id` int(11) NOT NULL,
  `gifted` int(1) NOT NULL DEFAULT '0',
  `gifted_by` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `gift_list`
--

INSERT INTO `gift_list` (`id`, `gift_id`, `gifted`, `gifted_by`) VALUES
(1, 1, 0, 1),
(2, 1, 0, 4);

-- --------------------------------------------------------

--
-- Table structure for table `guest`
--

DROP TABLE IF EXISTS `guest`;
CREATE TABLE IF NOT EXISTS `guest` (
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `confirm` int(1) NOT NULL DEFAULT '0',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `guest`
--

INSERT INTO `guest` (`name`, `lastname`, `confirm`, `id`) VALUES
('Juan', 'Plomito', 0, 2);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
