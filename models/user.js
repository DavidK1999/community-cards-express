const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdPosts: {type: Number, default: 0},
    upvotedPosts: {type: [String]},
    following: {type: [mongoose.Schema.Types.ObjectId], ref: "following"},
    followers: {type: [mongoose.Schema.Types.ObjectId], ref: 'followers'}
});

const User = mongoose.model('User', userSchema);

module.exports = User;