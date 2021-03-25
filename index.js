const express = require("express");
const app = express();
const session = require('express-session');
const path = require("path");
const connection = require('./config/db_mysql');

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
        res.render('product-detail', { product: product[0], user: req.session.name });
    });
});

app.get('/my-account.html', (req, res) => {
    if (req.session.name) {
        res.render('my-account', {user: req.session.name});
    } else {
        res.render('login', {user: req.session.name});
    }
});

app.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.render('login', {user: undefined});
    });
});

app.disable('x-powered-by');

app.listen(3000);