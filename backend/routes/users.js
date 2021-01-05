
const router = require('express').Router();
const { createOrUpdateUser, currentUser, saveAddress, addWishlist, removeWishlist, allWishlist } = require('../controllers/users');
const { authCheck } = require('../middleware/auth');

router.post('/create-or-update-user',authCheck,createOrUpdateUser)
router.post('/current-user',authCheck, currentUser)
router.patch('/address',authCheck, saveAddress)

router.route('/wishlist').get(authCheck, allWishlist).post(authCheck, addWishlist)
router.patch('/wishlist/:id', authCheck, removeWishlist);

module.exports = router;