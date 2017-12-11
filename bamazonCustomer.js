// Require npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var password = require("./password");

// Create a connection to the database
var connection = mysql.createConnection({
	host: "127.0.0.1",
	port: 3306,
	user: "root",
	database: "bamazon_db"
})

// Connect to the database
connection.connect(function(err) {
	if (err) throw err;
	// Successful connection
	console.log("Welcome to Bamazon!");
	start();
});

// Prompt user to choose between two options - INQUIRE or EXIT
var start = function() {
	inquirer.prompt({
		name: "inquireOrExit",
		type: "rawlist",
		message: "Would you like to inquire about a Bamazon product or say good-bye for now?",
		choices: ["INQUIRE", "EXIT"]
	})
	// inquire prompt ends
	.then(function(answerChoice) {
		if(answerChoice.inquireOrExit.toUpperCase()=="INQUIRE") {
			inquireProduct();
		}
		else {
			exitBamazon();
		}
	})
}
// start function ends

// User chooses EXIT
function exitBamazon() {
	console.log("Thank you. Come back soon!")
}

// User chooses INQUIRE
var inquireProduct = function() {
	connection.query("SELECT * FROM products", function(err, products) {
		inquirer.prompt([{
			name: "choice",
			type: "list",
			choices: function(value) {
				var choiceArray = [];
				for (var i=0; i < products.length; i++) {
					choiceArray.push(products[i].product_name);
				}
				return choiceArray;
			},
			message: "Selected item:",
			// Ensure the user enters a number
			validate: function(value) {
				if (value === "" || !value) {
					return false;
				}
				else {
					return true;
				}
			}
			// validate ends
		},
			{
				name: "quantity",
				type: "input",
				message: "How many would you like to purchase?"
			}
		])
		// inquire.prompt ends
		.then(function(answer) {
			console.log("Answer: ", answer);
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
	})
// connection query ends
}
// inquireProduct function ends
