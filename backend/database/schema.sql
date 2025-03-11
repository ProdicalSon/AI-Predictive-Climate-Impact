CREATE DATABASE IF NOT EXISTS climate_db;
USE climate_db;

CREATE TABLE IF NOT EXISTS predictions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    location VARCHAR(255),
    temperature FLOAT,
    rainfall FLOAT,
    impact_level VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
