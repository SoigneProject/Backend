var UserModel = require('../models/userModel');
var UserSessionModel = require('../models/userSessionModel');
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
};

exports.add_Follower = function(req,res){
    var queryUsername = req.params.username;
    var body = req.body;
    var follower = body.user;
    var followerObj = {"username" : follower};
    UserModel.findOneAndUpdate({
        username: queryUsername}, 
        {$push: {followers: followerObj}},function (err) {
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

exports.remove_Follower = function(req,res){
    var queryUsername = req.params.username;
    var body = req.body;
    var follower = body.user;
    var followerObj = {"username" : follower};
    UserModel.findOneAndUpdate({
        username: queryUsername}, 
        {$pull: {followers: followerObj}},function (err) {
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

exports.follow_Someone = function(req, res){
    var queryUsername = req.params.username;
    var body = req.body;
    var userToFollow = body.user;
    var userToFollowObj = {"username" : userToFollow};
    UserModel.findOneAndUpdate({
        username: queryUsername}, 
        {$push: {following: userToFollowObj}},function (err) {
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

exports.unfollow_Someone = function(req, res){
    var queryUsername = req.params.username;
    var body = req.body;
    var userToFollow = body.user;
    var userToFollowObj = {"username" : userToFollow};
    UserModel.findOneAndUpdate({
        username: queryUsername}, 
        {$pull: {following: userToFollowObj}},function (err) {
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
        password
    } = req.body;

    let {
        emailAddress
    } = req.body;

    // Start
    if (!username || !firstName || !lastName || !emailAddress || !password) {
        return res.json({
            created: false,
            error: 'INVALID INPUTS'
        });
    }

    UserModel.countDocuments({
        username: username
    }, function (err, count) {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        } else if (count > 0) {
            return res.send({
                success: false,
                message: 'Error: Account already exists with that username.'
            });
        }


        emailAddress = emailAddress.toLowerCase();
        emailAddress = emailAddress.trim();
        // Steps:
        // 1. Verify email doesn't exist
        // 2. Save
        UserModel.countDocuments({
            emailAddress: emailAddress
        }, (err, previousUsers) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            } else if (previousUsers > 0) {
                return res.send({
                    success: false,
                    message: 'Error: Account already exists with that email.'
                });
            }
            // Save the new user
            user.emailAddress = emailAddress;
            user.password = user.generateHash(password);
            user.username = username;
            user.firstName = firstName;
            user.lastName = lastName;
            user.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    });
                }
                return res.send({
                    success: true,
                    username: user,
                    message: 'Signed up'
                });
            });
        });
    });
};

// Sign In
exports.sign_in = function (req, res) {
    const {
        password
    } = req.body;
    let {
        username
    } = req.body;
    if (!username) {
        return res.send({
            success: false,
            message: 'Error: Username cannot be blank.'
        });
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }
    username = username.toLowerCase();
    username = username.trim();
    UserModel.find({
        username: username
    }, (err, users) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: server error'
            });
        }
        if (users.length != 1) {
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        }
        const user = users[0];
        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        }
        // Otherwise correct user
        const userSession = new UserSessionModel();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
            if (err) {
                console.log(err);
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });
            }
            return res.send({
                success: true,
                message: 'Valid sign in',
                token: doc._id
            });
        });
    });
};

// Log Out
exports.logout = function (req, res) {
    // Get the token
    const token  = req.query.token;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    UserSessionModel.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted:true
      }
    }, null, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send({
        success: true,
        message: 'Logged out'
      });
    });
};

// Verify User
exports.verify_a_user = function (req, res) {
    // Get the token
    const token = req.query.token;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    UserSessionModel.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      } else {
        // DO ACTION
        return res.send({
          success: true,
          message: 'Good'
        });
      }
    });
};