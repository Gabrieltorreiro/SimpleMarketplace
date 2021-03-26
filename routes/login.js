const express = require('express');
const connection = require('../config/db_mysql');
const router = express.Router();



router.get('/', (req, res) => {
    if(req.session.name){
        res.render('my-account', {user: req.session.name});
    }else{
        res.render('login',{user: req.session.name});
    }
});

router.post('/', (req, res) => {
    if (req.body.login && req.body.password) {
        let login = req.body.login;
        let psw = req.body.password;
        let query = `SELECT * FROM user WHERE login='${login}' AND password='${psw}'`;

        connection.query(query, (err, result) => {
            if (result.length != 0) {
                req.session.name = result[0].name;
                res.render('my-account', {user: req.session.name});
            } else {
                res.render('login', {user: req.session.name});
            }
        });

    } else {
        res.render('login');
    }
});

module.exports = router;