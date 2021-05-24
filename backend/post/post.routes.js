const express = require('express');
const passport = require('passport');
const router = express.Router();
const post = require('./post.controller');

router.get('/api/posts', post.getAll);
router.post('/api/posts', passport.authenticate('jwt', { session: false }), post.create)
router.get('/api/posts/:id', post.getById);
router.delete('/api/posts/:id', passport.authenticate('jwt', { session: false }), post.remove);
router.post('/api/posts/:id/like', passport.authenticate('jwt', { session: false }), post.likePost)
router.post('/api/posts/:id/unlike', passport.authenticate('jwt', { session: false }), post.unLikePost)
router.post('/api/posts/:id/comment', passport.authenticate('jwt', { session: false }), post.comment)
router.delete('/api/posts/:id/comment/:commentId', passport.authenticate('jwt', { session: false }), post.removeComment);

module.exports = router;
