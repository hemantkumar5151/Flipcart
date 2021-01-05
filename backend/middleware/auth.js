const admin = require('../firebase/firebase');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.authCheck = catchAsync(async(req, res,next) => {
    const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken);

    if(firebaseUser) {
        req.user = firebaseUser;
        next()
    } else {
        return next(new AppError('Token has been expired or may be invalid',401));
    }
})