const { userCart, getUserCart, resetCart } = require('../controllers/cart');
const { authCheck } = require('../middleware/auth');
const router = require('express').Router();


router.route('/').get(authCheck, getUserCart)
.post(authCheck, userCart)
.delete(authCheck, resetCart);

module.exports = router;