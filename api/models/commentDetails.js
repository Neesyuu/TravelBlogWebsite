const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    travelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'travelDetails'
    },
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String
    },
    userComment: {
        type: String,
        minlength : 1
    },
    display: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const CommentModel = mongoose.model('comments', commentSchema);

module.exports = CommentModel;