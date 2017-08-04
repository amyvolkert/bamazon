CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INTEGER(10) AUTO_INCREMENT NOT NULL,

product_name VARCHAR(100) NOT NULL,

department_name VARCHAR(100),

price DECIMAL(4,2) NOT NULL,

stock_quantity INTEGER(100) NOT NULL,

PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("2-inch D-ring Binder", "School Supplies", "17.99", "5");

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Dry Erase Markers", "School Supplies", "6.99", "12");

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Nike Pitch Soccer Ball", "Sporting Goods", "20.00", "6");

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Penn Tennis Balls", "Sporting Goods", "4.99", "7");

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Fancy Stitched Padded Halter", "Horse Tack", "99.95", "2");

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Saddle Pad", "Horse Tack", "23.95", "39");

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Clue", "Toys and Games", "9.95", "5");

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Wooden Shut the Box", "Toys and Games", "59.99", "6");

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Mosquito Repellent Bracelet", "Camping Gear", "15.98", "52");

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("REI Cot", "Camping Gear", "49.95", "20");








