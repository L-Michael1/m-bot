//open connection
const mongoose = require("mongoose");
module.exports = {
    init: () => {
        mongoose.connect(`mongodb+srv://mBot:${process.env.MONGO_PASSWORD}@cluster0.s1d27.mongodb.net/Discord_test_reports?retryWrites=true&w=majority`,
            {
                poolSize: 5,
                bufferMaxEntries: 0,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                autoIndex: false,
                family: 4
            });
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log('Mongoose successfully connected');
        });

        mongoose.connection.on('err', err => {
            console.error(`Mongoose connection error: \n${err.stack}`)
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('Mongoose connection lost');
        });
    }
}