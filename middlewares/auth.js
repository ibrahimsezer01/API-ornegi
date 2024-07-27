const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header("x-auth-token")
    if (!token) {
        return res.status(401).send("Yetkiniz Yok")
    }

    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = decodedToken
        next()
    } catch (ex) {
        res.status(403).send("Hatali Token")
    }
}

module.exports = auth;