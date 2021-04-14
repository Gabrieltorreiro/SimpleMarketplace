const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    if (req.session.name) {
        res.render('my-account', { user: req.session.name })
    } else {
        res.render('login', { user: req.session.name })
    }
})

module.exports = router