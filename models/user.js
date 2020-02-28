const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdPosts: {type: Number, default: 0},
    upvotedPosts: {type: Number, default: 0},
    upvoteCount: {type: Number, default: 0},
    followersCount: {type: Number, default: 0},
    followingCount: {type: Number, default: 0},
    following: {type: [String], default: []},
    followers: {type: [String], default: []}
});

const User = mongoose.model('User', userSchema);

module.exports = User;