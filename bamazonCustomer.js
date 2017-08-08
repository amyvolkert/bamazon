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

// Prompting user to choose between two options - INQUIRE or EXIT
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
			exitBAMazon();
		}
	})
}

// Running function if user chooses EXIT
function exitBAMazon() {
	console.log("Thank you. Come back soon!")
}

// Running query to display available products if user chooses INQUIRE
var inquireProduct = function() {
	connection.query("SELECT item_id, product_name, price FROM products", function(err,response){
		console.log(response);
			inquirer.prompt({
				name: "choice",
				type: "rawlist",
					choices: function(value){
						var choiceArray = [];
						for (var i=0; i < response.length; i++){
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
			// Displaying users' choice and running inquireQuantity function
			}).then(function(answer){
					inquireQuantity();
			// .then(function... ends
			})
	// connection.query ends
	// }) ***
		// Running quantity function inside of inquireProduct function
		var products = ("SELECT * FROM products");
		var inquireQuantity = function() {
			inquirer.prompt({
				name: "quantity",
				type: "input",
				message: "How many would you like to purchase?",
// TA			// Ensuring the user enters a number
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
				// Retrieveing data of the item selected
				var selectedItem;
					for (var i = 0; i < response.length; i++) {
						if (response(i).item_id === answer.choice) {
							selectedItem = response[i];
						}
					}

			// .then(function... ends
			})
			// Determining if the item is in stock
			if (selectedItem.stock_quantity > parseInt(answer.quantity)) {
				// Item is in stock
				connection.query(
					"UPDATE products SET stock_quantity = stock_quantity MINUS answer.quantity WHERE item_id = answer.id"
				)
				console.log("Your order is complete!")
					else {
						console.log("We're sorry, the product you've requested has " + stock_quantity + "available.")
						inquireProduct();
					}
				}
			)
		})
