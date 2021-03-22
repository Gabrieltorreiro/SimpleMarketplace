const express = require('express');
const connection  = require('../config/db_mysql');
const router = express.Router();

router.get('/', (req, res) => {
    connection.query(`SELECT * FROM product`, (err, products) => {
        res.render('product-list', { products: products });
    });
});

module.exports = router;