module.exports = function(req, res, next) {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).send({ message: 'Buraya erişmek için yetkiniz yoktur' });
    }
    next();
}
