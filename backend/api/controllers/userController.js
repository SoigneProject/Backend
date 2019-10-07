var UserModel = require('../models/userModel');

// Delete a user
exports.delete_a_user = function (req, res) {
    var queryUsername = req.params.username;
    UserModel.findOneAndDelete({
        username: queryUsername
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
};

// Update a user
exports.update_a_user = function (req, res) {
    var queryUsername = req.params.username;
    var body = req.body;
    UserModel.findOneAndUpdate({
        username: queryUsername
    }, body, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            user: body
        });
    });
}

// Get all users
exports.get_all_users = function (req, res) {
    // this api will get a user based on their username
    //if the username exits it will pull from out database
    UserModel.find((err, user) => {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            userObj: user
        });
    });
};

// Get a user
exports.get_a_user = function (req, res) {
    var queryUsername = req.params.username;
    UserModel.findOne({
        username: queryUsername
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
};

// Create a user
exports.create_a_user = function (req, res) {
    let user = new UserModel();
    const {
        username,
        firstName,
        lastName,
        emailAddress,
        password
    } = req.body;

    UserModel.count({
        username: username
    }, function (err, count) {
        if (count > 0) return res.json({
            created: false,
            error: "User Exists"
        });

        // Start
        if (!username || !firstName || !lastName || !emailAddress || !password) {
            return res.json({
                created: false,
                error: 'INVALID INPUTS'
            });
        }

        user.username = username;
        user.firstName = firstName;
        user.lastName = lastName;
        user.emailAddress = emailAddress;
        user.password = password;

        user.save((err) => {
            if (err) return res.json({
                created: false,
                error: err
            });
            return res.json({
                created: true
            });
        });
    });
};