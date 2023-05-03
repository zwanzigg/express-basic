const UserModel = require('../models/User')

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
    }
}

module.exports = UserController;