module.exports = function (app) {

    var user_controller = require('../controllers/userController');

    app.route('/users').get(user_controller.get_all_users);
    app.route('/users/signup').post(user_controller.create_a_user);
    // Sign In
    app.route('/users/:username').get(user_controller.get_a_user);
    app.route('/users/:username').put(user_controller.update_a_user);
    app.route('/users/:username').delete(user_controller.delete_a_user);
};