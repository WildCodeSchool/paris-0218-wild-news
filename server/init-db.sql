DROP DATABASE IF EXISTS wildnews;
CREATE DATABASE wildnews;
USE wildnews;

CREATE TABLE category (
	id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(50),
	description TEXT,
	imageURL VARCHAR(2083),
	PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE user (
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(50),
	firstName VARCHAR(50),
	lastName VARCHAR(50),
	email VARCHAR(50),
	password VARCHAR(50),
	imageURL VARCHAR(2083),
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	deletedAt TIMESTAMP NULL,
	PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE post (
	id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(250),
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	deletedAt TIMESTAMP NULL,
	description TEXT,
	imageURL VARCHAR(2083),
	source TEXT,
	category INT NOT NULL,
	author INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (category)		
		REFERENCES category(id),
	FOREIGN KEY (author)
		REFERENCES user(id)
) ENGINE=INNODB;

CREATE TABLE comment (
	id INT NOT NULL AUTO_INCREMENT,
	author INT NOT NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	deletedAt TIMESTAMP NULL,
	content TEXT,
	parent INT,
	FOREIGN KEY (author)		
		REFERENCES user(id)
		ON DELETE CASCADE,
	FOREIGN KEY (parent)
		REFERENCES comment(id),
	PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE favposts (
	userId INT NOT NULL,
	postId INT NOT NULL,
	FOREIGN KEY (userId)		
		REFERENCES user(id)
		ON DELETE CASCADE,
	FOREIGN KEY (postId)		
		REFERENCES post(id)
		ON DELETE CASCADE
) ENGINE=INNODB;

CREATE TABLE favcat (
	userId INT NOT NULL,
	catId INT NOT NULL,
	FOREIGN KEY (userId)		
		REFERENCES user(id)
		ON DELETE CASCADE,
	FOREIGN KEY (catId)		
		REFERENCES category(id)
		ON DELETE CASCADE
) ENGINE=INNODB;





-- SERVER 36:25