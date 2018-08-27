# Bamazon - Command Line Ordering Interface
Bamazon is a fictitious store front that allows customers to place orders for products via a command line interface.

To get started, run npm install to load the required packages.

From there, run node bamazonCustomer.js in your terminal.

You will be presented with the entire list of products available for purchase as well as a prompt for the ID of the item you would like to purchase and the quantity.

Here is an example of the CLI:
<img src="https://github.com/ricardobentin/bamazon/blob/master/Bamazon%20CLI.png" alt="CLI">

The system will let you know if you are ordering an amount that is not currently in stock and will guide you to order less of an item or to order a different item.

Error Message:

<img src="https://github.com/ricardobentin/bamazon/blob/master/Bamazon%20Error.png" alt="Error">

If the order is fulfilled, the customer will be presented with a success message along with the product name, quantity and total price of their order.

Success:

<img src="https://github.com/ricardobentin/bamazon/blob/master/Bamazon%20Success.png" alt="Success">

On the backend, if a customer's order is fulfilled, the database will update the amount of units in stock for the product that was just purchased.

Here is a full demo of the platform:

<img src="https://github.com/ricardobentin/bamazon/blob/master/Bamazon%20Demo.GIF" alt="demo.GIF">


