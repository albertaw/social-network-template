const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
    },
    username: {
        type: String,
        required: true,
        maxlength: 40
    },
    bio: {
        type: String,
        maxlength: 82
    },
    location: {
        type: String
    },
    skills: {
        type: [String],
        required: true
    },
    website: {
        type: String
    },
    githubUsername: {
        type: String
    }
}, {timestamps: true});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);