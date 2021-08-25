CREATE DATABASE IF NOT EXISTS `peterest_db`;

USE peterest_db;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `name` varchar(50) NULL,
  `location` varchar(50) DEFAULT NULL,
  `gender` bool DEFAULT NULL,
  `cover_pic` varchar(255) DEFAULT NULL,
  `profile_pic` varchar(255) DEFAULT NULL,
  `date_created` BIGINT DEFAULT NULL,
  `date_last_login` BIGINT DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `posts` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT, 
  `author_id` int NOT NULL, 
  `caption` VARCHAR(255) NULL,
  `postType` VARCHAR(255) NOT NULL,
  `contentSrc` VARCHAR(255) NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;