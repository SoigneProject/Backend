module.exports = function (app) {

    var post_controller = require('../controllers/postController'); 

    // app.route('/posts').get(post_controller.get_all_posts_by_user);
    app.route('/posts/id/:id').get(post_controller.get_Post_with_id);
    app.route('/posts/title/:title').get(post_controller.get_all_post_with_name);
    app.route('/posts').get(post_controller.get_all_post);
    app.route('/posts').post(post_controller.create_Post);
    app.route('/posts/id/:id').delete(post_controller.delete_post_with_id);
    app.route('/posts/id/:id').put(post_controller.update_a_post);
};

