const mongoose = require("mongoose")
const config = require("config")

const username = config.get("username")
const password = config.get("password")
const database = config.get("database")
const cluster = config.get("cluster")

const logger = require("../middlewares/logger")

process.on("uncaughtException", (err) => logger.error(err.message))

const connect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.amufmzi.mongodb.net/${database}?retryWrites=true&w=majority`)
        logger.info("Bağlanti oluşturuldu");
    } catch (error) {
        logger.error(error);
    }
}


module.exports = connect