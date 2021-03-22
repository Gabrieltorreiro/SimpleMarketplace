const express = require('express');
const connection = require('../config/db_mysql');

const router = express.Router();

router.get('/', (req, res) => {
    connection.query(`SELECT * FROM product LIMIT 5`, (err, products) => {
        res.render('index', { products: products });
    });
});

module.exports = router;