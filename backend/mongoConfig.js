module.exports = {
    mongoURI: `${process.env.MONGO_URI}`,
    mongoCFG: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true,
        retryWrites: true
    }
};