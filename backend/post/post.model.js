const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    text: { 
        type: String, 
        maxLength: [82, 'Post must be between 1 and 82 characters'],
        required: [true, 'Post must be between 1 and 82 characters']
    }
}, { timestamps: true });

module.exports = Post = mongoose.model('posts', PostSchema);