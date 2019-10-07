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
        _ID: queryID
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
}

exports.create_Post = function(req, res){
    let post = new PostModel();
    const {

        user,
        description,
        photo
    } = req.body;

    if(!description || !photo)
        return res.json({
            created: false,
            error: 'INVALID INPUTS'
        });

        post.dateTime = new Date();
        //post.user = we need to find a way to link the user
        post.description = description;
        post.photo = photo;

        post.save((err) => {
            if (err) return res.json({
                created: false,
                error: err
            });
            return res.json({
                created: true
            });
    });
}
