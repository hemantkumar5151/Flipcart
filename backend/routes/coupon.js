const { authCheck} = require('../middleware/auth')
const { adminCheck} = require('../controllers/users')
const router = require('express').Router();
const { coupons, createCoupon, deleteCoupon , applyCoupon} = require('../controllers/coupon');

router.route('/').get(authCheck,coupons).post(authCheck , adminCheck,createCoupon)
router.delete('/:id', authCheck, adminCheck, deleteCoupon)

router.post('/user-apply', authCheck, applyCoupon)
module.exports = router;
