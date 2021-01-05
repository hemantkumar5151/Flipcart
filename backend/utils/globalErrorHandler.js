const dotenv = require('dotenv');
dotenv.config({ path: '/.env'});

const sendDevelopmentError = (error, res) => {

    return res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        error,
        stack: error.stack,
    })
}
const sendProductionError = (error, res) => {
    if(err.isOperational) {
        return res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        })
    } else {
        return res.status(error.statusCode).json({
            status: 'error',
            message: 'Something went wrong',
        })
    }
}

module.exports = (error,req,res,next) => {
    
    error.status = error.status || 'error'
    error.statusCode = error.statusCode || 500;
    
    if(process.env.NODE_ENV === 'development') {
        sendDevelopmentError(error,res);
    }
    else if (process.env.NODE_ENV === 'production') {
        sendProductionError(error,res)
    } 
}