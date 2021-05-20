const express = require('express');
const router = express.Router();
const user = require('./user.controller');
const passport = require('passport');

router.post('/', user.create);
router.post('/login', user.login);
router.get('/current', passport.authenticate('jwt', { session: false }), user.getCurrentUser);


module.exports = router;