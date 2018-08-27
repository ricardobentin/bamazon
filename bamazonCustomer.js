//code to require mysql node package
let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
  host: "localhost",

  // Port to connect to mySQL
  port: 3306,
  user: "root",
  password: "rbdb",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  connection.query(`SELECT * FROM products`, function(err, res) {
    if (err) throw err;
    console.log(res);
    shop();
  });
});

let shop = function() {
  inquirer
    .prompt([
      {
        type: "prompt",
        message: "What Is The ID Number of the Product You Would Like to Buy?",
        name: "id_to_buy"
      },
      {
        type: "prompt",
        message: "How Many Units Would You Like to Buy?",
        name: "quantity_to_buy"
      }
    ])
    .then(function(answer) {
      // console.log("This is the answer from inquirer: ", answer);
      // console.log("Answers is of this type: ", typeof answer);
      // console.log("answers.id_to_buy: ", answer.id_to_buy);
      // console.log("answers.quantity_to_buy: ", answer.quantity_to_buy);
      connection.query(
        `SELECT * from products where item_id = ${answer.id_to_buy} AND ${
          answer.quantity_to_buy
        } > 0`,
        function(err, results) {
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            if (results[i].item_name === answer.choice) {
              chosenItem = results[i];
            }
          }
          // console.log(
          //   "this is chosenItem.product_name: ",
          //   chosenItem.product_name
          // );
          // console.log("this is chosenItem", chosenItem);
          // console.log("this is chosenItem.stock: ", chosenItem.stock);
          if (err) throw err;
          if (answer.quantity_to_buy > parseInt(chosenItem.stock)) {
            console.log(
              "Insufficient Quantity! Please Select Less of This Product Or Select a New Product and Quantity."
            );
            shop();
          } else {
            let costToCustomer =
              parseInt(answer.quantity_to_buy) * parseFloat(chosenItem.price);
            // console.log(
            //   "this is quantity to buy",
            //   parseInt(answer.quantity_to_buy)
            // );
            // console.log("This is the price", parseFloat(chosenItem.price));
            // console.log("This is the cost to the customer", costToCustomer);
            let newStock = parseInt(chosenItem.stock
            )-parseInt(answer.quantity_to_buy)
            // console.log("this is new stock:", newStock);
            connection.query(
              // `UPDATE products SET stock = ${parseInt(
              //   chosenItem.stock
              // )}-${parseInt(answer.quantity_to_buy)} where item_id = ${
              //   answer.id_to_buy
              // }`,
              `UPDATE products SET ? where ?`, [
                {
                  stock: newStock
                },
                {
                  item_id: answer.id_to_buy
                }
              ],
              function(err, results) {
                if (err) throw err;
                console.log("Your Order Was Submitted!");
                console.log(
                  `Your Total Cost for ${answer.quantity_to_buy} units of ${
                    chosenItem.product_name
                  } is $ ${costToCustomer}`
                );
                shop();
              }
            );
          }
        }
      );
    });
};
