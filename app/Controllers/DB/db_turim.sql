DROP DATABASE IF EXISTS `turim`;
CREATE DATABASE  IF NOT EXISTS `turim` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `turim`;
DROP TABLE IF EXISTS `father`;
CREATE TABLE `father` (
	id INT auto_increment PRIMARY KEY,
	`name` varchar(50) NOT NULL
);
DROP TABLE IF EXISTS `children`;
CREATE TABLE `children` (
	id INT auto_increment PRIMARY KEY,
	`father_id` varchar(50) NOT NULL,
    `name` varchar(50) NOT NULL
);
