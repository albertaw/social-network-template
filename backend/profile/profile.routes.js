const express = require('express');
const router = express.Router();
const profile = require('./profile.controller');
const passport = require('passport');

// @desc Get current user's profile
router.get('/', passport.authenticate('jwt', { session: false }), profile.getProfile);
router.post('/', passport.authenticate('jwt', { session: false }), profile.createOrUpdate);
router.get('/username/:username', profile.getByUsername);
router.get('/user/:userId', profile.getByUserId);
router.get('/all', profile.getAll);

module.exports = router;