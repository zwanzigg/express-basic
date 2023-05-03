const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique : true,
    },
    password: String,
    first_name: String,
    last_name: String,
});
const UserModel = mongoose.model('User', UserSchema, 'users');


module.exports = UserModel;

