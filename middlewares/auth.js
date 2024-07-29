const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    const token = req.header("x-auth-token")
    if (!token) {
        return res.status(401).send("Yetkiniz Yok")
    }

    try {
        const decodedToken = jwt.verify(token, config.get("auth.TOKEN_SECRET"))
        req.user = decodedToken
        next()
    } catch (ex) {
        return res.status(403).send("Hatali Token")
    }
}

module.exports = auth;