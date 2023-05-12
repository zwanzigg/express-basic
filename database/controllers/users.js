const UserModel = require('../models/User')
const CustomError = require("../../helpers/custom-error");
const jwt = require("jsonwebtoken");
const {ERROR_CODES,
    JWT_SECRET,
    JWT_EXPIRES_IN} = require("../../common/constants");

const UserController = {
    getByEmail: (email) => {
        return UserModel.findOne({email});
    },
    getAll:  () => {
        return UserModel.find({});
    },
    create: (body) => {
        const newUser = new UserModel(body);
        return newUser.save();
    },
    signIn: async ({email, password}) => {
        const foundUser = await UserModel.findOne({email});
        if (!foundUser) {
            throw new CustomError(ERROR_CODES.USER_NOT_FOUND);
        } else if (foundUser.password !== password) {
            throw new CustomError(ERROR_CODES.INVALID_EMAIL_OR_PASSWORD);
        } else {
            return jwt.sign({email}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
        }
    },
    signUp: async ({email, password, firstName, lastName}) => {
        const newUser = await UserController.create({
            email,
            password,
            first_name: firstName,
            last_name: lastName
        });
        return jwt.sign({email: newUser.email}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
    }
}

module.exports = UserController;