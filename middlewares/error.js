const logger = require('./logger')

module.exports = function(err, req, res, next) {
    // logging function
    logger.error(`Error: ${err.message}, Stack: ${err.stack}`)
    res.status(500).send("Server Hatasi")    
}
