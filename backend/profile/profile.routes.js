const express = require('express');
const router = express.Router();
const profile = require('./profile.controller');
const passport = require('passport');

router.get('/api/profile', passport.authenticate('jwt', { session: false }), profile.getCurrentUserProfile);
router.delete('/api/profile', passport.authenticate('jwt', { session: false }), profile.deleteCurrentUserProfile);
router.post('/api/profiles', passport.authenticate('jwt', { session: false }), profile.createOrUpdate);
router.get('/api/profiles/username/:username', profile.getByUsername);
router.get('/api/profiles/user/:userId', profile.getByUserId);
router.get('/api/profiles', profile.getAll);

module.exports = router;