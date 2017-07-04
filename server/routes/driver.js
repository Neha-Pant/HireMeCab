var express = require('express');
var router = express.Router();
var Driver = require('../models/DriverModel');

router.post('/AddDriver', function(req, res) {
    newDriver = new Driver();
    newDriver.RegNo = req.body.RegNo;
    newDriver.LicenseNo = req.body.LicenseNo;
    newDriver.Address = req.body.Address;
    newDriver.MobileNo = req.body.MobileNo;
    newDriver.Photo = req.body.Photo;
    newDriver.Model = req.body.Model;
    newDriver.CabType = req.body.CabType;
    newDriver.Make = req.body.Make;
    newDriver.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                success: true
            });
            console.log('Driver Data Saved !');
        }
    });
});

router.get('/GetDriver', function(req, res) {
    Driver.find({}, function(err, data) {
        if (err) {
            throw err;
        } else {
            res.json(data);
        }
    });
});


router.delete('/DeleteDriver/:id', function(req, res) {
    Driver.remove({
        '_id': req.params.id
    }, function(err) {
        if (err) {
            throw err;
        } else {
            res.json({
                success: true
            });
            console.log('Driver Deleted !');
        }
    });
});



module.exports = router;
