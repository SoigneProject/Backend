var RetailerModel = require('../models/retailerModel');

exports.get_All_Retailers = function (req, res){
    RetailerModel.find((err, item) => {
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

exports.create_Retailer = function (req, res){
    let retailer = new RetailerModel();
    const {
        name,
        url
    } = req.body;

    if(!name || !url)
        return res.json({
            created: false,
            error: 'INVALID INPUTS'
    });

    retailer.name = name;
    retailer.url = url;

    retailer.save((err) => {
        if (err) return res.json({
            created: false,
            error: err
        });
        return res.json({
            created: true
        });
    });
}

exports.get_All_Retailers_With_Name = function (req, res){
    var queryName = req.params.name;
    RetailerModel.findOne({
        name: queryName
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
}

exports.delete_Retailer_By_Name = function(req, res){
    var queryName = req.params.name;
    RetailerModel.findOneAndDelete({
        name: queryName
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
}