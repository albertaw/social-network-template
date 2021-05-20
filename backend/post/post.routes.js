const express = require('express');
const passport = require('passport');
const router = express.Router();
const post = require('./post.controller');

router.get('/', post.getAll);
router.post('/', passport.authenticate('jwt', { session: false }), post.create)
router.get('/:id', post.getById);
router.delete('/:id', passport.authenticate('jwt', { session: false }), post.remove);
router.post('/:id/like', passport.authenticate('jwt', { session: false }), post.likePost)
router.post('/:id/unlike', passport.authenticate('jwt', { session: false }), post.unLikePost)
router.post('/:id/comment', passport.authenticate('jwt', { session: false }), post.comment)
router.delete('/:id/comment/:commentId', passport.authenticate('jwt', { session: false }), post.removeComment);
module.exports = router;
