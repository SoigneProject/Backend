module.exports = function (app) {

    var retailer_controller = require('../controllers/retailerController'); 

    app.route('/retailers').get(retailer_controller.get_All_Retailers);
    app.route('/retailers').post(retailer_controller.create_Retailer);
    app.route('/retailers/name/:name').delete(retailer_controller.delete_Retailer_By_Name);
    app.route('/retailers/name/:name').get(retailer_controller.get_All_Retailers_With_Name);
};