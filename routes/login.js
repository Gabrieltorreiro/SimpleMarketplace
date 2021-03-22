const express = require('express');
const connection = require('../config/db_mysql');
const router = express.Router();

router.get('/', (req, res) => {
    if(req.session.id){
        res.render('my-account');
    }else{
        res.render('login');
    }
});

router.post('/', (req, res) => {
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

module.exports = router;