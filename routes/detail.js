const express = require('express');
const connection = require('../config/db_mysql');
const router = express.Router();

router.get('/', (req, res) => {
    connection.query(`SELECT * FROM product WHERE id=${req.query.id};`, (err, product) => {
        res.render('product-detail', { product: product[0], user: req.session.name });
    });
});

router.post('/', (req, res)=>{

    connection.query(`SELECT * FROM product WHERE id=${req.query.id};`, (err, product) => {

        if(!req.session.cart){
            req.session.cart = [];
        }
    
        req.session.cart.push({
            id: req.query.id,
            title: product[0].title,
            picture: product[0].picture,
            qnt: req.body.quantity,
            price: product[0].price
        });

        console.log(req.session.cart);

        res.render('product-detail', { product: product[0], user: req.session.name });
    });
});

module.exports = router;