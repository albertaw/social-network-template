const mongoose = require('mongoose');
const Post = require('./post.model');

exports.getAll = async (req, res) => {
    try {
        const posts = await Post.find().populate('user').sort({createdAt: 'desc'})
        res.json(posts)
    } catch (err) {
        res.status(404).send(err)
    }
}

exports.create = async (req, res) => {
    const text = req.body.text.trim();
    const newPost = new Post({
        text: text,
        user: req.user.id
    });

    try {
        await newPost.save();
        res.json(newPost);
    } catch (err) {
        res.status(400).send(err.errors);
    }
}

exports.getById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user', 'name');
        res.json(post);
    } catch (err) {
        res.status(404).send({message: 'No post found with that id'})
    }
}

exports.remove = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(404).json({ message: 'No post found with that id'});
    }
}
