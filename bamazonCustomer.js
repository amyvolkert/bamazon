// Requiring npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");

var password = require("./password");

// Creating a connection to the database
var connection = mysql.createConnection({
	host: "127.0.0.1",
  	port: 3306,

  	user: "root",

  	password: password,
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
			// inquirer.prompt ends, and users' choice is displayed
			}).then(function(answer){
					// Running inquireQuantity function
					inquireQuantity();
			// .then(function... ends
			})
	// connection.query ends
	// })
		// Running quantity function inside of inquireProduct function
		var inquireQuantity = function() {
			connection.query("SELECT * FROM products", function(err,response){
				inquirer.prompt({
				name: "quantity",
				type: "input",
				message: "How many would you like to purchase?"
// Q: This is not working but works fine for the above function
					// Ensuring the user enters a number
					// validate: function(value) {
					// 	if (isNAN (value) === false) {
					// 		return true;
					// 	} else {
					// 		return false;
					// 	}
					// validate:... ends
					// }
// Q: It breaks here. The table is products; the column headings in SQL are item_id and stock_quantity. I used ' " based on an example, but not sure why...
			// inquirer.prompt ends
			}).then(function(answer){
				if((response[inquireProduct.item_id].inquireQuantity.stock_quantity-answer.quantity)>0){
					connection.query("UPDATE products SET stock_quantity= '"
						+ (response[inquireProduct.item_id].inquireQuantity.stock_quantity-answer.quantity)
						+ "' WHERE product_name = '" + product + " ' ", function(err, response){
						console.log("Your order is complete!");
					})
				// connection.query ends
				}
			// then(function... ends
			})
			// inquireQuantity function ends
		})
		}
		// inquireProduct function ends
	})
}
