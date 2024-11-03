const express = require('express');
const router = express.Router();
const profile = require('./profile.controller');
const passport = require('passport');

router.post('/api/profiles', passport.authenticate('jwt', { session: false }), profile.createOrUpdate);
router.get('/api/profiles/:id', profile.getById);
router.get('/api/profiles/username/:username', profile.getByUsername);
router.get('/api/profiles', profile.getAll);
router.get('/api/profile', passport.authenticate('jwt', { session: false }), profile.getCurrentUserProfile);
router.delete('/api/profile', passport.authenticate('jwt', { session: false }), profile.deleteCurrentUserProfile);

module.exports = router;