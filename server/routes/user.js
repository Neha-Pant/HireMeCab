var express = require('express');
var mongoose=require('mongoose');
var router = express.Router();
var User = require('../models/UserModel');
var jwt = require('jsonwebtoken');

router.post('/AddPeople', function(req, res) {
    newPeople = new User();
    newPeople.Name = req.body.Name;
    newPeople.Address = req.body.Address;
    newPeople.Email = req.body.Email;
    newPeople.Password=newPeople.generateHash(req.body.Password);
    newPeople.Phone=req.body.Phone;
    newPeople.Role='Customer';
    newPeople.Status='active';
    newPeople.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                success: true
            });
            console.log('User Registered Successfully !!!');
        }
    });
});
router.post('/AddDriver', function(req, res) {
    newPeople = new User();
    newPeople.Name = req.body.Name;
    newPeople.Address = req.body.Address;
    newPeople.Email = req.body.Email;
    newPeople.Password=newPeople.generateHash(req.body.Password);
    newPeople.Phone=req.body.Phone;
    newPeople.Role='Driver';
    newPeople.Status='active';
    newPeople.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                success: true
            });
            console.log('Driver Registered Successfully !!!');
        }
    });
});


router.post('/login', function(req, res) {
    User.findOne({
        Email: req.body.Email
    }, function(err, user) {
        if (err) {
            res.json(err);
        } else if (!user) {
            res.json({
                success: false,
                message: 'Sorry wrong email id'
            });
            console.log('Wrong Email');
        } else if (!user.validPassword(req.body.Password)) {
            res.json({
                success: false,
                message: 'Sorry wrong password'
            });
            console.log('Wrong Password');
        } else if (user) {
            var token = jwt.sign(user, 'thisismysecret', {
                expiresIn: 1400
            });
            res.json({
                success: true,
                token: token,
                isLoggedIn: true,
                userDetail: user
            });
            console.log('token is '+token);
            console.log('Token Created');
        }
    });
});

//old routes
// router.post('/UpdatePeople/:id/:name/:city/:email', function(req, res) {
//     User.remove({
//         '_id': req.params.id
//     }, function(err) {
//         if (err) {
//         //   throw err;
//         } else {
//             res.json({
//                 success: true
//             });
//             console.log('Deleted');
//         }
//     }); 
//     newPeople = new User();
//     newPeople.Name = req.params.name;
//     newPeople.City = req.params.city;
//     newPeople.Email = req.params.email;
//     newPeople.save(function(err) {
//         if (err) {
//             console.log(err);
//         } else {
//             // res.json({
//             //     success: true
//             // });
//             console.log('Data Saved !');
//         }
//     });
// });

// router.get('/GetPeople', function(req, res) {
//     User.find({}, function(err, data) {
//         if (err) {
//             throw err;
//         } else {
//             res.json(data);
//         }
//     });
// });


// router.delete('/DeletePeople/:id', function(req, res) {
//     User.remove({
//         '_id': req.params.id
//     }, function(err) {
//         if (err) {
//             throw err;
//         } else {
//             res.json({
//                 success: true
//             });
//             console.log('Deleted');
//         }
//     });
// });



module.exports = router;
