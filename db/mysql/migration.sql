CREATE DATABASE IF NOT EXISTS `peterest_db`;

USE kennely;

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

INSERT INTO `users` VALUES 
  (7,'admin@admin.com','$2b$12$OzvCYmHZ1WODQfh3nsBNnOuyObCWnIMNPwGN0mQCjgz/Eawz/tFkq',0,'admin','adminville, tx',1,NULL,'/Assets/img/userPlaceholder.jpg',1629833599,1630283644),
  (8,'yael@yael.com','$2b$12$lHe9kddcbcXe792JAosn1u9rumjYp2WohVDcJ8LCBWNvnKXElXcda',0,'yael','Baltimore, MD',1,NULL,'/Assets/img/userPlaceholder.jpg',1630355779,0);

CREATE TABLE IF NOT EXISTS `posts` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT, 
  `users_id` int NOT NULL, 
  `caption` VARCHAR(255) NULL,
  `post_type` VARCHAR(255) NOT NULL,
  `content_src` VARCHAR(255) NULL,
  `date` BIGINT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `posts` VALUES 
  (7,1,'inserted post from sql','text','',1630018848),
  (8,1,'new post, new post, new post','text','',1630019466);

CREATE TABLE IF NOT EXISTS `comments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `users_id` int NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `date` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `likes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `posts_id` int DEFAULT NULL,
  `comment_id` int DEFAULT NULL,
  `users_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci