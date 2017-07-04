var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    Name: String,
    City: String,
    Email: String
});

module.exports = mongoose.model('user', userSchema);
