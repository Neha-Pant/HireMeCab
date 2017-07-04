var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
var path = require('path');
var userRoute = require('./server/routes/user');
var driverRoute = require('./server/routes/driver');
var tariffRoute = require('./server/routes/tariff');
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '/client')));
mongoose.connect('mongodb://localhost/meanapp');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Database connected');
});
app.use('/uapi', userRoute);
app.use('/dapi', driverRoute);
app.use('/tapi', tariffRoute);
app.listen(3000, function(req, res) {
    console.log('Server is running on port 3000...');
});
