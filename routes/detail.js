const express = require('express');
const connection = require('../config/db_mysql');
const router = express.Router();

router.get('/', (req, res) => {
    connection.query(`SELECT * FROM product WHERE id=${req.query.id};`, (err, product) => {
        res.render('product-detail', { product: product[0], user: req.session.name });
    });
});

router.post('/', (req, res) => {

    connection.query(`SELECT * FROM product WHERE id=${req.query.id};`, (err, product) => {

        if (!req.session.cart) {
            req.session.cart = [];
        }

        let index = req.session.cart.findIndex(value => value.id == req.query.id);

        if (index != -1) {
            req.session.cart[index].qnt += parseInt(req.body.quantity);
        } else {
            req.session.cart.push({
                id: req.query.id,
                title: product[0].title,
                picture: product[0].picture,
                qnt: parseInt(req.body.quantity),
                price: product[0].price
            });

        }

        res.render('product-detail', {
            product: product[0],
            user: req.session.name
        });
    });
});

module.exports = router;