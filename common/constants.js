const ERROR_CODES = {
    INVALID_EMAIL_OR_PASSWORD: {
        statusCode: 400, // Bad Request
        message: 'Invalid email address or password',
    },
    USER_NOT_FOUND: {
        statusCode: 404, // Not Found
        message: 'User not found',
    },
    INTERNAL_ERROR: {
        statusCode: 500, // Internal Server Error
        message: 'Internal Server Error',
    },
    UNKNOWN_ERROR: (message ) => ({
        statusCode: 400,
        message: 'Unknown Error',
        details: message
    }),
}
module.exports = { ERROR_CODES};