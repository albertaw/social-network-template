const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubUsername: {
        type: String
    }
}, {timestamps: true});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);