const router = require('express').Router();
const { createSub, allSub, singleSub, updateSub, deleteSub } = require('../controllers/sub');
const {  adminCheck } = require('../controllers/users');
const { authCheck } = require('../middleware/auth');


router.route('/')
    .get(allSub)
    .post(authCheck, adminCheck, createSub)

router.route('/:slug')
    .get(singleSub)
    .patch(authCheck, adminCheck, updateSub)
    .delete(authCheck, adminCheck, deleteSub)

module.exports = router;