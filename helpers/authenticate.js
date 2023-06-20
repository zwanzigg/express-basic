const jwt = require('jsonwebtoken');
const CustomError = require("./custom-error");
const {ERROR_CODES} = require("../common/constants");

const accessTokenSecret = process.env.JWT_SECRET;
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                throw new CustomError(ERROR_CODES.FORBIDDEN);
            }
            req.user = user;
            next();
        });
    } else {
        throw new CustomError(ERROR_CODES.UNAUTHORIZED);
    }
};

module.exports = authenticateJWT;