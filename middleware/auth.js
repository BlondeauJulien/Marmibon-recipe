const jwt = require('jsonwebtoken');
const config = require('config');
require('dotenv/config');

module.exports = function(req, res, next) {
    //Get toke from header
    const token = req.header('x-auth-token');

    //Check if not token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'})
    }

    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded.user;

        next();

    } catch (err) {
        return res.status(401).json({ msg: 'Token is not valid'})
    }

}