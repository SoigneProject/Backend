const PostModel = require('../models/postModel');

// exports.get_all_posts_by_user = function(req, res){
//     var queryUsername = req.params.username;

//     itemModel.findAllForOneUser({
//         username: queryUsername
//     });

// }

exports.get_Post_with_id = function (req, res) {
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

exports.create_Post = function (req, res) {
    let post = new PostModel();
    const {
        description,
        photo
    } = req.body;

    if (!description || !photo)
        return res.json({
            created: false,
            error: 'INVALID INPUTS'
        });

    post.photo = photo;
    post.description = description;

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