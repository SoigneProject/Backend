const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const FollowerSchema = new Schema({username: String});
const FollowingSchema = new Schema({username: String});

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "Please enter your first name"]
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name"]
    },
    username: {
        type: String,
        required: [true, "Please enter a display name"]
    },
    emailAddress: {
        type: String,
        required: [true, "Please enter your email address"]
    },
    password: {
        type: String,
        default: ''
    },
    followers: [FollowerSchema],
    following: [FollowingSchema]
});

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);