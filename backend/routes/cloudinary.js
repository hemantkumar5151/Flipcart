const router = require('express').Router();
const { upload , remove} = require('../controllers/cloudinary');
const {  adminCheck } = require('../controllers/users');
const { authCheck } = require('../middleware/auth');


router.post('/upload-image',authCheck, adminCheck,upload)
router.post('/delete-image',authCheck, adminCheck,remove)
module.exports = router;