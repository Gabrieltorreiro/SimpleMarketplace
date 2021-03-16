const express = require("express");
const app = express();
const session = require('express-session');
const path = require("path");
const mysql = require('mysql');

var config = {
    host: 'localhost',
    port: 3306,
    user: 'admin',
    password: '123456',
    database: 'marketplace'
};

const connection = mysql.createConnection(config);

connection.connect();

app.set("view engine", "ejs");

app.use(session({
    secret: 'secret',
    cookie: { maxAge: 1000 * 60 * 60 * 2 }
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    connection.query(`SELECT * FROM product LIMIT 5`, (err, products) => {
        res.render('index', { products: products });
    });
});

app.get('/product-list.html', (req, res) => {
    connection.query(`SELECT * FROM product`, (err, products) => {
        res.render('product-list', { products: products });
    });
});

app.get('/product-detail.html', (req, res) => {
    connection.query(`SELECT * FROM product WHERE id=${req.query.id};`, (err, product) => {
        console.log(product);
        res.render('product-detail', { product: product[0] });
    });
});

app.get('/login.html', (req, res) => {
    if(req.session.id){
        res.render('my-account');
    }else{
        res.render('login');
    }
});

app.post('/login.html', (req, res) => {
    if (req.body.login && req.body.password) {
        let login = req.body.login;
        let psw = req.body.password;
        let query = `SELECT * FROM user WHERE login='${login}' AND password='${psw}'`;

        connection.query(query, (err, result) => {
            if (result.length != 0) {
                req.session.id = result[0].id;
                res.render('my-account');
            } else {
                res.render('login');
            }
        });

    } else {
        res.render('login');
    }
});

app.get('/my-account.html', (req, res) => {
    if (req.session.id) {
        console.log("logado");
    } else {
        console.log("not logado");
    }
    res.render('my-account');
});

app.disable('x-powered-by');

app.listen(3000);