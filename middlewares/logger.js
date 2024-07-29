const { createLogger, transports, format, info, error } = require('winston');
const { combine, timestamp, prettyPrint, printf } = format
require("winston-mongodb")

const config = require("config")

const username = config.get("username")
const password = config.get("password")
const database = config.get("database")
const cluster = config.get("cluster")

const logger = createLogger({
    level: 'debug',
    format: combine(
        timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        prettyPrint()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'error.log', level: "error" }),
        new transports.MongoDB({
            level: 'error', // MongoDB'ye sadece hata seviyesindeki logları yazma
            db: `mongodb+srv://${username}:${password}@${cluster}.amufmzi.mongodb.net/${database}?retryWrites=true&w=majority`, // MongoDB bağlantı URL'si
            options: {
                useUnifiedTopology: true,
                useNewUrlParser: true
            },
            format: combine(
                timestamp(),
                prettyPrint(),
                printf(info => `Time Stamp: ${info.timestamp} Level: [${info.level}]: Message: ${info.message}`)
            )
        })
    ]
})

module.exports = logger