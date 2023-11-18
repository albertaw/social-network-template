const mongoose = require('mongoose');
const Profile = require('./profile.model');
const User = require('../user/user.model');
const validateProfileInput = require('../validation/profile');

exports.getCurrentUserProfile = (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
        .populate('user', 'name')
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => {
            res.status(404).send(err);
        });
}

exports.deleteCurrentUserProfile = (req, res) => {
    Profile.findOneAndDelete({user: req.user.id})
        .then(response => {
            res.sendStatus(204);
        })
        .catch(err => res.send(err));
}

exports.createOrUpdate = (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
     if(!isValid) {
         return res.status(400).json(errors);
     }
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.username) profileFields.username = req.body.username;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.githubUsername) profileFields.githubUsername = req.body.githubUsername;
    if(typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills;
    }
    //if updating a profile
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if(profile) {
                Profile.findOne({ $and: [{ username: profileFields.username }, {user: {$ne: req.user.id}}]}).then(profile => {
                    if(profile) {
                        errors.username = "That username already exists";
                        res.status(400).json(errors);
                    }

                    Profile.findOneAndUpdate(
                        { user: req.user.id }, 
                        { $set: profileFields }, 
                        { new: true }
                    ).populate('user', 'name').then(profile => res.json(profile)).catch(err => res.send(err));
                }).catch(err => res.send(err));
            // otherwise create a new profile
            } else {
                Profile.findOne({ username: profileFields.username }).then(profile => {
                    if(profile) {
                        errors.username = "That username already exists";
                        res.status(400).json(errors);
                    }

                    new Profile(profileFields).save().populate('user', 'name').then(profile => res.json(profile)).catch(err => res.send(err));;
                })
                .catch(err => res.send(err));
            }
        })
        .catch(err => res.send(err));
}

exports.getById = (req, res) => {
    Profile.findById(req.params.id)
        .then(profile => {
            res.json(profile);
        })
        .catch(err => res.json(err));
}

exports.getByUsername = (req, res) => {
    const errors = {};
    Profile.findOne({ username: req.params.username})
        .populate('user', 'name')
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors)
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
}

exports.getByUserId = (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.params.userId})
        .populate('user', 'name')
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors)
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
}

exports.getAll = (req, res) => {
    errors = {};
    Profile.find()
        .populate('user', 'name')
        .then(profiles => {
            res.json(profiles);
        })
        .catch(err => {
            res.status(404).json({ profile: 'There are no profiles'});
        })
}