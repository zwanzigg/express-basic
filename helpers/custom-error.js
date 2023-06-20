class CustomError extends Error {
    constructor(errorCode) {
        super();
        this.errorCode = errorCode;
    }
}

module.exports = CustomError;