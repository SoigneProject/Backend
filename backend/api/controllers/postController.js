var UserModel = require('../models/postModel');

// exports.get_all_posts_by_user = function(req, res){
//     var queryUsername = req.params.username;

//     itemModel.findAllForOneUser({
//         username: queryUsername
//     });

// }

exports.get_Post_with_id = function(req, res){
   // Get a user
    var queryID = req.params.id;
    postModel.findOne({
        username: queryID
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
}
