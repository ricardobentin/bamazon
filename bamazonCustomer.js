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
        `SELECT product_name, stock from products where item_id = ${
          answer.id_to_buy
        } AND ${answer.quantity_to_buy} > 0`,
        function(err, results) {
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            if (results[i].item_name === answer.choice) {
              chosenItem = results[i];
            }
          }
          console.log("this is chosen item.stock, ", chosenItem.stock);
          if (err) throw err;
          if (answer.quantity_to_buy > parseInt(chosenItem.stock)) {
            console.log(
              "Insufficient Quantity! Please Select Less of This Product Or Select a New Product and Quantity."
            );
            shop();
          }
          connection.query(
            `SELECT stock from products where product_name = ${chosenItem.product_name} AND SET stock = ${parseInt(chosenItem.stock)}-${parseInt(answer.quantity_to_buy)}`,
            function(err){
              if (error) throw err;
            
            }
          console.log("Your Order Was Submitted!");
          shop();
          }  
        );
          
        }
      );
    });
};
