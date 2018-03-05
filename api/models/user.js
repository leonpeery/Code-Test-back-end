const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        title: String,
        first: String,
        last: String
    },
    picture: {
        large: String,
        medium: String,
        small: String
    },
    authorization: Boolean
});

module.exports = mongoose.model('User', userSchema)