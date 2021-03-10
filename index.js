const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render('pages/index');
});

app.get('/client/login', (req, res) => {
    res.render('pages/client/login');
});

app.get('/seller/login', (req, res) => {
    res.render('pages/seller/login');
});

app.disable('x-powered-by');

app.listen(3000);