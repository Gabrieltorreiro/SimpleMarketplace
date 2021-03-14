const express = require("express");
const app = express();
const path = require("path");
const mysql = require('mysql');

var config = {
    host: 'localhost',
    port: 3306,
    user: 'admin',
    password: '123456',
    database: 'marketplace'
};

var connection = mysql.createConnection(config);

connection.connect();

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/product-list.html', (req, res) => {
    connection.query('SELECT * FROM product;', (err, products) => {
        res.render('product-list', { products: products });
    });
});

app.get('/product-detail.html', (req, res) => {
    connection.query(`SELECT * FROM product WHERE id=${req.query.id};`, (err, product) => {
        res.render('product-detail', { product: product[0] });
    });
});

app.disable('x-powered-by');

app.listen(3000);