const mongoose = require('mongoose');

const travelSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    tripDays: {
        type: String,
        required: true,
        min: 1
    },
    tripDescription: {
        type: String,
        minlength : 100
    },
    budget: {
        type: Number,
        required : true,
        min: 1
    },
    author: {
        type: String
    }
});

const TravelModel = mongoose.model('travelDetails', travelSchema);

module.exports = TravelModel;