const express = require("express");
const app = express();
const path = require("path");
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'admin',
    password: '123456',
    database: 'marketplace'
});

connection.connect((err) => {
    console.error(err, "mysql error");
});

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/product-list.html', (req, res) => {
    connection.query('SELECT * FROM product;', (err, products) => {
        res.render('product-list',{products: products});
    });
});

app.disable('x-powered-by');

app.listen(3000);