DROP DATABASE IF EXISTS project2;
CREATE DATABASE IF NOT EXISTS project2;
USE project2;
CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    online BOOLEAN ,
    username : VARCHAR(60) ,
    firstName : VARCHAR(60),
    lastName : VARCHAR(60),
    email : VARCHAR(254),
    password : VARCHAR(254),
    image : VARCHAR(2083),
    createdAt : TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    favPosts : array of post,
    favCategory : array of category,
    admin : BOOLEAN
    )
