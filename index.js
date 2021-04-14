const express = require("express");
const app = express();
const session = require('express-session');
const path = require("path");
const connection = require('./config/db_mysql');

//Set view engine as ejs
app.set("view engine", "ejs");

//create session and set public route
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 2 }
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Create routes
const indexRoute = require('./routes/index');
const listRoute = require('./routes/list');
const loginRoute = require('./routes/login');
const detailRoute = require('./routes/detail');
const accountRoute = require('./routes/account');
app.use('/', indexRoute);
app.use('/product-list.html', listRoute);
app.use('/login.html', loginRoute);
app.use('/product-detail.html', detailRoute);
app.use('/my-account.html', accountRoute);

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.render('login', { user: undefined });
    });
});

app.get('/cart.html', (req, res) => {
    res.render('cart', {
        user: req.session.name,
        cart: req.session.cart,
        cartQuantity: req.session.cart ? req.session.cart.length : 0
    });
});

app.disable('x-powered-by');

app.listen(3000);