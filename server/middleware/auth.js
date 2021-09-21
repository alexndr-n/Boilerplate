require('dotenv').config();

const jwt = require("jsonwebtoken");
const jwtToken = process.env.JWT_TOKEN

const isUser = (req, res, next) => {
    try {
        const token = req.headers['x-access-token'] || req.headers.authorization;
        if (!token) {
            console.log("no token")
            return res.status(403).send("Access denied.")
        }
        const user = jwt.verify(token, jwtToken);
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        console.log("Invalid Token")
        return res.status(400).send("Invalid token");
    }
};

module.exports = {
    isUser,
}