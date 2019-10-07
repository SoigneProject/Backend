module.exports = function (app) {

    var user_controller = require('../controllers/postController'); 

    app.route('/posts').get(post_controller.get_all_posts_by_user);
    app.route('/posts').get(post_controller.get_Post_with_id);
    app.route('posts').post(post_controller.create_Post);
};
