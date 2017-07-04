var express = require('express');
var router = express.Router();
var Tariff = require('../models/TariffModel');

router.post('/AddTariff', function(req, res) {
    newTariff = new Tariff();
    newTariff.CabType = req.body.CabType;
    newTariff.NormalRate = req.body.NormalRate;
    newTariff.PeakRate = req.body.PeakRate;
    newTariff.StartPeakHour = req.body.StartPeakHour;
    newTariff.EndPeakHour = req.body.EndPeakHour;
    newTariff.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                success: true
            });
            console.log('Tariff Data Saved !');
        }
    });
});

router.get('/GetTariff', function(req, res) {
    Tariff.find({}, function(err, data) {
        if (err) {
            throw err;
        } else {
            res.json(data);
        }
    });
});


router.delete('/DeleteTariff/:id', function(req, res) {
    Tariff.remove({
        '_id': req.params.id
    }, function(err) {
        if (err) {
            throw err;
        } else {
            res.json({
                success: true
            });
            console.log('Tariff Deleted !');
        }
    });
});



module.exports = router;
