const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '/.env'});
const dbConnection = async() => {
    const dbUrl = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

    try {
        
        const con = await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })

        console.log('Connection established successfully');

        return con;

    } catch (error) {
        console.log('Connection Failed', error.message);
    }
}

module.exports = dbConnection;