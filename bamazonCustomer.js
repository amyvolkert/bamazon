// Requiring npm packages, incl console.table in case used
var mysql = require("mysql");
var inquirer = require("inquirer");
// var table = require("console.table");
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
	console.log("Welcome to BAMazon!");
	start();
});

// Prompting user to choose between two options - INQUIRE or EXIT
var start = function(){
	inquirer.prompt({
		name: "inquireOrExit",
		type: "rawlist",
		message: "Would you like to inquire about a BAMazon product or say good-bye for now?",
		choices: ["INQUIRE", "EXIT"]
	}).then(function(answerChoice){
		if(answerChoice.inquireOrExit.toUpperCase()=="INQUIRE") {
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
	connection.query("SELECT * FROM products", function(err, products){
		// todo: list only ids, names prices
			// example: {
				//console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
			//}
			inquirer.prompt(
				[{
				name: "choice",
				type: "list",
				choices: function(value){
					var choiceArray = [];
					for (var i=0; i < products.length; i++){
						choiceArray.push(products[i].product_name);
					}
					return choiceArray;
				// choices:... ends
				},
				message: "Selected item:",
							// Ensuring the user enters a number
							validate: function(value) {
								if (value === "" || !value) {
									return false;
								} else {
									return true;
								}
								// validate:... ends
							}
				},

				{
					name: "quantity",
					type: "input",
					message: "How many would you like to purchase?"
					//*TA*: Will the above "validate: function(value)..." work here to ensure user enters a number?
				}
		// Next steps
		// -- Access the item in the db that matches the user's choice, and compare the quantity based on the item_id
	// inquirer.prompt ends
	]).then(function(answer){
				console.log("Answer: ", answer);
	// xxx
				// var quantity = parseInt(answer.quantity);
				var quantity = parseInt(answer.quantity);
				var nameOfTheProductWeWant = answer.choice;
				var selectedProduct = findProductByName(products,
					nameOfTheProductWeWant);

				if (answer.quantity > selectedProduct.stock_quantity) {
					console.log("We're sorry. The quantity you entered is not available.")
					start();
				}
				else {
					completePurchase(selectedProduct, quantity);
				}
			});

			function findProductByName(products, nameOfTheProductWeWant) {
				for (var i = 0; i < products.length; i++) {
					var currentProduct = products[i];
					if (currentProduct.product_name === nameOfTheProductWeWant) {
						return currentProduct;
					}
				}
				throw new Error(
					"Sorry, we couldn't find the product '" + nameOfTheProductWeWant +
					"'."
				);
			}


			function completePurchase(product, quantity) {
				connection.query(
					"UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
					[quantity, product.item_id],
					function(err, response) {
						console.log(
							"Thank you! Your order has been submitted: " + quantity + " " + product.product_name + "(s)"
						);
					}
				);
			}

				// connection query ends
})
// function inquireProduct ends
}
