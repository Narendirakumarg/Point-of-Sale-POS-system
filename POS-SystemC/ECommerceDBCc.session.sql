-- Step 1: Create the Database
CREATE DATABASE ECommerceDBC;

-- Step 2: Use the Created Database
USE ECommerceDBC;


CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10, 2),
  offer_type VARCHAR(50),
  offer_value VARCHAR(100)
);

INSERT INTO products (name, price, offer_type, offer_value)
VALUES
  ('Laptop', 1000.00, 'Flat', '100'),
  ('Phone', 500.00, 'Percentage', '10'),
  ('Tablet', 300.00, 'BOGO', '1'),
  ('Headphones', 100.00, 'Flat', '20'),
  ('Camera', 600.00, 'Percentage', '15');

CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  details JSON,
  total DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS transactions;

-- Step 6: Verify Table Creation (Optional)
-- Show structure of tables
DESCRIBE Products;
DESCRIBE Transactions;

-- Step 7: Verify Sample Data (Optional)
-- Query Products table
SELECT * FROM Products;
SELECT * FROM Transactions;

CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  products JSON NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE transactions MODIFY COLUMN total DECIMAL(15,2);

ALTER TABLE transactions ADD COLUMN products JSON;

INSERT INTO transactions (products, total, created_at) 
VALUES ('[{"name":"Laptop","quantity":1,"price":1000}]', 2000.00, NOW());

