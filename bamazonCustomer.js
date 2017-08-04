// Requiring npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// Creating a connection to the database
var connection = mysql.createConnection({
	host: "127.0.0.1",
  	port: 3306,

  	user: "root",

  	password: "0live3932",
  	database: "bamazon"
	});

// Connecting to the database
connection.connect(function(err) {
	if (err) throw err;
	// Checking if connection is successful
	// else 
	// 	console.log("connected");
	// Upon successful connection, comment out "connected" and run query for data
	connection.query("SELECT item_id, product_name, price FROM products", function(err, response) {
		if (err) throw err;
		console.log(response);
	}); 
});
