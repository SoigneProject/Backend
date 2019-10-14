const PostModel = require('../models/postModel');

// exports.get_all_posts_by_user = function(req, res){
//     var queryUsername = req.params.username;

//     itemModel.findAllForOneUser({
//         username: queryUsername
//     });

// }

exports.get_all_post = function (req, res){
    PostModel.find((err, post) => {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            postObj: post
        });
    });
}

exports.get_Post_with_id = function(req, res){
   // Get a user
    var queryID = req.params.id;
    PostModel.findById({
        _id: queryID
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
}

exports.get_all_post_with_name = function (req, res){
    var queryTitle = req.params.title;
    PostModel.find({
        title: queryTitle
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
        title,
        description,
        photo
    } = req.body;

    if(!title || !description || !photo)
        return res.json({
            created: false,
            error: 'INVALID INPUTS'
        });

        var ourDate = new Date();
        ourDate.setHours(ourDate.getHours() + 7);
        post.dateTime = ourDate;
        post.title = title;
        post.description = description;
        post.photo = photo;
        // we need to find a way to link the user
        // Get the current user from cookies

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

exports.delete_post_with_id = function (req, res) {
    var queryID = req.params.id;

    PostModel.findOneAndDelete({
        _id: queryID
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
}

exports.update_a_post = function (req, res) {
    var queryID = req.params.id;
    var body = req.body;
    PostModel.findOneAndUpdate({
        _id: queryID
    }, body, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            post: body
        });
    });
}
