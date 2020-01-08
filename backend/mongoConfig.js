module.exports = {
    mongoURI: `mongodb+srv://${process.env.ATLAS_LOGIN}@mongo1-1wonn.mongodb.net/DnD?retryWrites=true&w=majority`,
    mongoCFG: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true,
        retryWrites: true
    }
};