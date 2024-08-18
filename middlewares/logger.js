const { createLogger, transports, format } = require('winston');
const { combine, timestamp, prettyPrint, printf } = format
require("winston-mongodb")

const username = config.get("username")
const password = config.get("password")
const database = config.get("database")
const cluster = config.get("cluster")

const uri = `mongodb+srv://${username}:${password}@${cluster}.amufmzi.mongodb.net/${database}?retryWrites=true&w=majority`;

const logger = createLogger({
    level: 'debug',
    format: combine(
        timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        prettyPrint()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/logs.log', level: "error", handleExceptions: false, handleRejections: false }),
        new transports.File({ filename: 'logs/exceptions.log', level: "error", handleExceptions: true, handleRejections: true }),
        new transports.MongoDB({
            level: 'error',
            db: uri,
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