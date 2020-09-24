const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");

const checkToken = (req, res, next) => {
    const { refresh_token: refreshToken } = req.headers;

    try {
        const user = jwt.verify(refreshToken, secretKey);
        req.user = user;
        next();
    } catch (error) {
        next();
    }
};

const authenticate = (req, res, next) => {
    const { refresh_token: refreshToken } = req.headers;

    if (!refreshToken) return res.status(401).json({ error: "refresh_token is required" });

    try {
        const user = jwt.verify(refreshToken, secretKey);
        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json(error);
    }
};

const authorize = (allowedUserTypes = []) => (req, res, next) => {
    const index = allowedUserTypes.findIndex((type) => type == req.user.userType);

    if (index == -1) return res.status(401).json({ error: "User is not authorized" });
    next();
};

module.exports = { authenticate, authorize, checkToken };
