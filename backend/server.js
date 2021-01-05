const app = require('./app');
const dotenv = require('dotenv');
process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('UNCAUGHT EXCEPTION!!!');
    process.exit(1);
})
dotenv.config({ path: '/.env'});
const con = require('./config/db');

con()
const port = process.env.PORT || 8000


const server = app.listen(port, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} at ${port} port`);
});

process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION!!!');

    server.close(() => {
        process.exit(1);
    });
})