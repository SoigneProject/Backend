const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RetailerSchema = new Schema({
    name: {
        type: String,
        required: [true, "The name of the retailer is required"]
    },
    url: {
        type: String,
        required: [true, "THe URL of the retailer is required"]
    },
    validation: {
        type: Boolean
    }
});

module.exports = mongoose.model('Retailer', RetailerSchema);