var mongoose = require('mongoose');
var tariffSchema = mongoose.Schema({
    EndPeakHour: String,
    StartPeakHour: String,
    PeakRate: integer,
    CabType:String,
    NormalRate: integer
});

module.exports = mongoose.model('tariff', tariffSchema);
