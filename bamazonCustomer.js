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
      console.log("This is the answer from inquirer: ", answer);
      console.log("Answers is of this type: ", typeof answer);
      console.log("answers.id_to_buy: ", answer.id_to_buy);
      console.log("answers.quantity_to_buy: ", answer.quantity_to_buy);
    });
};
