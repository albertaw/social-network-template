const mongoose = require('mongoose');
const Post = require('./post.model');
const Profile = require('../profile/profile.model');
const validatePostInput = require('../validation/post');

exports.getAll = (req, res) => {
    Post.find()
        .sort({createdAt: 'desc'})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).send({nopostsfound: 'No posts found'}));
}

exports.create = (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        user: req.user.id
    });

    newPost.save()
        .then(post => res.json(post))
        .catch(err => res.send(err));
}

exports.getById = (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).send({nopostfound: 'No post found with that id'}));
}

exports.remove = (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
            .then(post => {
                if(post.user.toString() !== req.user.id) {
                    return res.status(401).json({ notauthorized: 'User not authorized' });
                }
                post.remove().then(() => res.json({ success: true }));
            })
            .catch(err => res.status(404).json({ postnotfound: 'No post found'}));
        })
        .catch(err => res.send(err));
}

exports.likePost = (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
            .then(post => {
                if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                    return res.status(400).json({ alreadyliked: 'User already liked this post' });
                }
                post.likes.unshift({ user: req.user.id })
                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: 'No post found'}));
        })
        .catch(err => res.send(err));
}

exports.unLikePost = (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
            .then(post => {
                if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                    return res.status(400).json({ notliked: 'You have not yet liked this post' });
                }
                const removeIndex = post.likes.map(item => item.user.toString().indexOf(req.user.id));
                post.likes.splice(removeIndex, 1);
                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: 'No post found'}));
        })
        .catch(err => res.send(err));
}

exports.comment = (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                user: req.user.id
            }
            post.comments.unshift(newComment);
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'Post not found'}));
}

exports.removeComment = (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if(post.comments.filter(comment => comment._id.toString() === req.params.commentId).length == 0) {
                return res.status(404).json({ commentnotexists: 'Comment does not exist'});
            }

            const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.commentId);
            post.comments.splice(removeIndex, 1);

            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'Post not found'}));
}