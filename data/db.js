const mongoose = require("mongoose")
const config = require("config")

const username = config.get("username")
const password = config.get("password")
const database = config.get("database")
const cluster = config.get("cluster")

const uri = `mongodb+srv://${username}:${password}@${cluster}.amufmzi.mongodb.net/${database}?retryWrites=true&w=majority`;

const logger = require("../middlewares/logger")

const connect = async () => {
    try {
        await mongoose.connect(uri)
        logger.info("Bağlanti oluşturuldu");
    } catch (error) {
        logger.error(error);
        process.exit(1)
    }
}


module.exports = connect