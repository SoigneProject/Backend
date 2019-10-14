module.exports = function (app) {
    var item_controller = require('../controllers/itemController'); 

    app.route('/items').get(item_controller.get_all_item);
    app.route("/items/id/:id").get(item_controller.get_a_item_with_id);
    app.route("/items/name/:name").get(item_controller.get_all_item_with_name);
    app.route("/items/retailerID/:retailerID").get(item_controller.get_All_Items_By_Retailer);
    app.route("/items").post(item_controller.create_item);
    app.route("/items/id/:id").put(item_controller.update_item_with_id);
    app.route("/items/id/:id").delete(item_controller.delete_item_with_id);
};