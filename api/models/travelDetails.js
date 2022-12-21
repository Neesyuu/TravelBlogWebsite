const mongoose = require('mongoose');

const travelSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
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
        minlength : 1
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