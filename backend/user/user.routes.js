const express = require('express');
const router = express.Router();
const user = require('./user.controller');
const passport = require('passport');

router.post('/api/users/', user.create);
router.post('/api/users/login', user.login);
router.get('/api/user', passport.authenticate('jwt', { session: false }), user.getCurrentUser);
router.delete('/api/user', passport.authenticate('jwt', { session: false }), user.remove);
router.get('/api/users/:id/posts', user.getPosts)
router.delete('/api/user/posts', passport.authenticate('jwt', { session: false }), user.deletePosts)

module.exports = router;