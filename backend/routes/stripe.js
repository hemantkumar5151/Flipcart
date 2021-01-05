const router = require('express').Router();

const { initiatePayment } = require('../controllers/stripe');
const { authCheck } = require('../middleware/auth');

router.post('/create-payment-intent', authCheck,initiatePayment);

module.exports = router;