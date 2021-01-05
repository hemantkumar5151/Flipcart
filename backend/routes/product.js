const router = require('express').Router();
const { createProduct, allProduct, singleProduct, updateProduct, deleteProduct, list, totalProduct, productRating, relatedProduct,
     productRelatedToSpecificCategory, productRelatedToSpecificSubCategory, searchOrFilterProducts} = require('../controllers/product');
const {  adminCheck } = require('../controllers/users');
const { authCheck } = require('../middleware/auth');



router.post('/feature', list);
router.get('/count', totalProduct);
router.patch('/rating/:id',authCheck, productRating);
router.get('/related/:id', relatedProduct);
router.get('/category/:id',productRelatedToSpecificCategory)
router.get('/sub-category/:id', productRelatedToSpecificSubCategory)
router.post('/search-or-filter', searchOrFilterProducts);

router.route('/')
    .get(allProduct)
    .post(authCheck, adminCheck, createProduct)


router.route('/:slug')
    .get(singleProduct)
    .patch(authCheck, adminCheck, updateProduct)
    .delete(authCheck, adminCheck, deleteProduct)

module.exports = router;