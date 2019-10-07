module.exports = function (app) {

    var post_controller = require('../controllers/postController'); 

    app.route('/posts').get(post_controller.get_post_with_id);


};
