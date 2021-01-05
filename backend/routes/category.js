const router = require('express').Router();
const { createCategory, updateCategory, deleteCategory, singleCategory, allCategories, getSubCategory } = require('../controllers/category');
const {  adminCheck } = require('../controllers/users');
const { authCheck } = require('../middleware/auth');


router.route('/')
    .get(allCategories)
    .post(authCheck, adminCheck, createCategory)

router.route('/:slug')
    .get(singleCategory)
    .patch(authCheck, adminCheck, updateCategory)
    .delete(authCheck, adminCheck, deleteCategory)
router.get('/sub/:id',getSubCategory)
module.exports = router;