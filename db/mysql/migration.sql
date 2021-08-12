CREATE DATABASE IF NOT EXISTS `peterest_db`;

USE peterest_db;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `name` varchar(50) NULL,
  `location` varchar(50) DEFAULT NULL,
  `gender` bool DEFAULT NULL,
  `coverPic` varchar(255) DEFAULT NULL,
  `profilePic` varchar(255) DEFAULT NULL,
  `dateCreated` BIGINT DEFAULT NULL,
  `dateLastLogin` BIGINT DEFAULT NULL,
  `optionsId` BIGINT DEFAULT NULL,
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