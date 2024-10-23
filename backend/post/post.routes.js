const express = require('express');
const passport = require('passport');
const router = express.Router();
const post = require('./post.controller');

router.get('/api/posts', post.getAll);
router.post('/api/posts', passport.authenticate('jwt', { session: false }), post.create)
router.get('/api/posts/:id', post.getById);
router.delete('/api/posts/:id', passport.authenticate('jwt', { session: false }), post.remove);

module.exports = router;
