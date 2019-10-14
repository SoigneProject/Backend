var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    serialNumber: {
        type: String
    },
    name: {
        type: String,
        required: "Please enter item name"
    },
    url: {
        type: String,
        required: "Please item URL"
    },
    clothingCategory: {
        type: String,
        required: "Please the items catetegory"
    },
    retailerID: {
        type: String
    }

});
module.exports = mongoose.model('Item', ItemSchema);