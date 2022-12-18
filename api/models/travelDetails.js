const mongoose = require('mongoose');

const travelSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title:{
        type: String,
        required: true
    },
    location:{
        type: String
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
    date: {
        type: Date,
        default: Date.now
    }
});

const TravelModel = mongoose.model('travelDetails', travelSchema);

module.exports = TravelModel;