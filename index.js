const express = require("express");
const app = express();
const session = require('express-session');
const path = require("path");
const connection = require('./config/db_mysql');

// const connection = mysql.createConnection(config);

// connection.connect();

app.set("view engine", "ejs");

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 2 }
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const indexRoute = require('./routes/index');
const listRoute = require('./routes/list');
const loginRoute = require('./routes/login');
app.use('/', indexRoute);
app.use('/product-list.html', listRoute);
app.use('/login.html', loginRoute);

app.get('/product-detail.html', (req, res) => {
    connection.query(`SELECT * FROM product WHERE id=${req.query.id};`, (err, product) => {
        console.log(product);
        res.render('product-detail', { product: product[0] });
    });
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