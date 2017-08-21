# bamazon
Author: Amy Volkert
Created:  2017 Aug 17
Modified: 2017 Aug 21


# Overview
The purpose of this application is to allow the user to view, select, and purchase items from a storefront.

The application utilizes Node, MySQL, and Inquirer.

# Functionality
The user first receives a prompt to either inquire about a product or exit the storefront.
![inquire or exit](images/inquire-exit.JPG)

If the user chooses to exit, then the following is displayed:
![exit](images/exit.JPG)

If the user chooses to inquire about a product, then a list of products is displayed. The user may scroll through the products using the up and down arrow keys.
![inquire](images/inquire.JPG)

After the user selects a product, he is prompted to enter a desired quantity.
![quantity](images/quantity.JPG)

If the MySQL database contains enough product of the chosen item, then the user's order is submitted.
![order received](images/order-received.JPG)
