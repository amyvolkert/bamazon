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
	connection.query("SELECT * FROM products", function(err,response){
		console.log(response);
		// todo: list only ids, names prices
			// example: {
				//console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
			//}
			inquirer.prompt(
				[{
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
			connection.query("SELECT stock_quantity WHERE item_id = choice", function (err,response){
				if (stock_quantity < answers.quantity){
					console.log("We're sorry. The quantity you entered is not available.");
				}
				else {
						console.log("Thank you for your order!");
				}
			// connection.query ends
			})
		// then(function... ends
		})
	})
}
