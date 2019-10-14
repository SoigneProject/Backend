const ItemModel = require('../models/itemModel');

exports.get_all_item = function (req, res){
    ItemModel.find((err, item) => {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            itemObj: item
        });
    });
}

exports.get_a_item_with_id = function (req, res){
    var queryID = req.params.id;
    ItemModel.findById({
        _id:  queryID
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
}

exports.get_all_item_with_name = function (req, res){
    var queryName = req.params.name;
    ItemModel.find({
        name: queryName
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
}

exports.get_All_Items_By_Retailer = function(req, res){
    var retailerQuery = req.params.retailerID;
    ItemModel.find({
        retailerID: retailerQuery
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
}

exports.create_item = function(req, res){
    let item = new ItemModel();
    const {
        name,
        url,
        clothingCategory,
        retailerID
    } = req.body;

    if(!name || !url || !clothingCategory || !retailerID)
        return res.json({
            created: false,
            error: 'INVALID INPUTS'
    });

    item.name = name;
    item.url = url;
    item.clothingCategory = clothingCategory;
    item.retailerID = retailerID;
    
    item.save((err) => {
        if (err) return res.json({
            created: false,
            error: err
        });
        return res.json({
            created: true
        });
    });
}

exports.update_item_with_id = function(req, res){
    var queryID = req.params.id;
    var body = req.body;
    ItemModel.findOneAndUpdate({
        _id: queryID
    }, body, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            item: body
        });
    });
}
 
exports.delete_item_with_id = function(req, res){
    var queryID = req.params.id;

    ItemModel.findOneAndDelete({
        _id: queryID
    }, function (err, obj){
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
}
