// MORE item_id, product_name, price

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
	})

// Connecting to the database
connection.connect(function(err) {
	if (err) throw err;
	// Checking if connection is successful
	else 
		console.log("Welcome to BAMazon!");
	start();
})

// Upon successful connection, comment out "Welcome..." and run query to display data
var start = function(){
	inquirer.prompt({
		name: "inquireOrExit",
		type: "rawlist",
		message: "Would you like to inquire about a BAMazon product or say good-bye for now?",
		choices: ["INQUIRE", "EXIT"]
	}).then(function(answer){
		if(answer.inquireOrExit.toUpperCase()=="INQUIRE") {
			inquireProduct();
		} else {
			// exitBAMazon();
		}
	})
}

//Running query to display available products
var inquireProduct = function() {
	connection.query("SELECT item_id, product_name, price FROM products", function(err,response){
		console.log(response);
			inquirer.prompt({
				name: "choice",
				type: "rawlist",
					choices: function(value){
						var choiceArray = [];
						for (var i=0; i<response.length; i++){
							choiceArray.push(response[i].product_name);
						}
						return choiceArray;
					// choices:... ends
					},
						message: "Enter the ID number of the item you'd like to purchase.",
							// Ensuring the user enters a number
							validate: function(value) {
								if (isNAN (value) === false) {
									return true;
								} else {
									return false;
								}
							// validate:... ends
							}
			// inquirer.prompt ends
			}).then(function(answer){
					inquireQuantity();
			// .then(function... ends
			})
	// connection.query ends
	})
		// Running quantity function inside of inquireProduct function
		var products = ("SELECT * FROM products");
		var inquireQuantity = function() {
			inquirer.prompt({
				name: "quantity",
				type: "input",
				message: "How many would you like to purchase?",
					// Ensuring the user enters a number
					// validate: function(value) {
					// 	if (isNAN (value) === false) {
					// 		return true;
					// 	} else {
					// 		return false;
					// 	}
					// validate:... ends
					// }
			// inquirer.prompt ends
			}).then(function(answer){
				if(products.stock_quantity > parseInt(answer.quantity)){
					console.log("The item(s) has been added to your cart.")

			}
			// .then(function... ends
			})
		// inquireQuantity function ends
		}
// inquireProduct function ends
}



	