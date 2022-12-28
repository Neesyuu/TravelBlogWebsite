const mongoose = require('mongoose');

const travelSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    editorName:{
        type: String,
    },
    title:{
        type: String,
        required: true
    },
    location:{
        type: String
    },
    tripDays: {
        type: String
    },
    tripDescription: {
        type: String,
        minlength : 1
    },
    budget: {
        type: String
    },
    images: {
        type: Object
    },
    date: {
        type: String,
        default: Date.now
    }
});

const TravelModel = mongoose.model('travelDetails', travelSchema);

module.exports = TravelModel;