var express = require('express');
var router = express.Router();
var User = require('../models/UserModel');

router.post('/AddPeople', function(req, res) {
    newPeople = new User();
    newPeople.Name = req.body.Name;
    newPeople.City = req.body.City;
    newPeople.Email = req.body.Email;
    newPeople.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                success: true
            });
            console.log('Data Saved !');
        }
    });
});

router.post('/UpdatePeople/:id/:name/:city/:email', function(req, res) {
    User.remove({
        '_id': req.params.id
    }, function(err) {
        if (err) {
        //   throw err;
        } else {
            res.json({
                success: true
            });
            console.log('Deleted');
        }
    }); 
    newPeople = new User();
    newPeople.Name = req.params.name;
    newPeople.City = req.params.city;
    newPeople.Email = req.params.email;
    newPeople.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            // res.json({
            //     success: true
            // });
            console.log('Data Saved !');
        }
    });
});

router.get('/GetPeople', function(req, res) {
    User.find({}, function(err, data) {
        if (err) {
            throw err;
        } else {
            res.json(data);
        }
    });
});


router.delete('/DeletePeople/:id', function(req, res) {
    User.remove({
        '_id': req.params.id
    }, function(err) {
        if (err) {
            throw err;
        } else {
            res.json({
                success: true
            });
            console.log('Deleted');
        }
    });
});



module.exports = router;
