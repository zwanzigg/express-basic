const {ERROR_CODES} = require("../common/constants");

function errorHandler(err, req, res, next) {
    const errorCode = (err && err.errorCode) || ERROR_CODES.UNKNOWN_ERROR(err.message);
    return res
        .status(errorCode.statusCode)
        .json(errorCode);
};

module.exports = errorHandler;