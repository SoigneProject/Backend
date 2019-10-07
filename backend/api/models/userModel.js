var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
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
        required: [true, "Please enter a password"]
    }
});

module.exports = mongoose.model('User', UserSchema);