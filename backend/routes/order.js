const { createOrder, allOrder, allAdminOrder, updateOrderByAdmin} = require('../controllers/order');
const { adminCheck } = require('../controllers/users');
const { authCheck } = require('../middleware/auth');
const router = require('express').Router();


router.route('/').get(authCheck, allOrder).post(authCheck, createOrder);
router.route('/admin').get(authCheck, adminCheck, allAdminOrder)
router.patch('/admin/:id', authCheck, adminCheck, updateOrderByAdmin);

module.exports = router;