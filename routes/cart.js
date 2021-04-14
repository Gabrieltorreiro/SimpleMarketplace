const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('cart', {
        user: req.session.name,
        cart: req.session.cart,
        cartQuantity: req.session.cart ? req.session.cart.length : 0
    })
})

module.exports = router