const mongoose = require('mongoose');
const Profile = require('./profile.model');
const User = require('../user/user.model');
const validateProfileInput = require('../validation/profile');

exports.createOrUpdate = async (req, res) => {
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

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        if(profile) {
            const existingProfile = await Profile.findOne({ $and: [{ username: profileFields.username }, {user: {$ne: req.user.id}}]})
            if(existingProfile) {
                errors.username = "That username already exists";
                console.log(errrors)
                return res.status(400).json(errors);
            }
            const updatedProfile = await Profile.findOneAndUpdate(
                { user: req.user.id }, 
                { $set: profileFields }, 
                { new: true }
            )
            return res.json(updatedProfile);
        } else {
            const existingProfile = await Profile.findOne({ username: profileFields.username });
            if(existingProfile) {
                errors.username = "That username already exists";
                console.log(errors)
                return res.status(400).json(errors);
            }
            const newProfile = await new Profile(profileFields).save();
            return res.json(newProfile);
        }
    } catch (err) {
        console.log(err)
        res.send(err);
    }
}

exports.getById = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id).populate('user', 'name');
        res.json(profile);
    } catch (err) {
        res.json(err)
    }
}

exports.getByUsername = async (req, res) => {
    const errors = {};

    try {
        const profile = await Profile.findOne({ username: req.params.username}).populate('user', 'name');
        
        if(!profile) {
            errors.noprofile = 'There is no profile for this user';
            console.log(errors)
            res.status(404).json(errors)
        }
        res.json(profile);
    } catch (err) {
        console.log(err)
        res.status(404).json(err);
    }
}

exports.getAll = async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', 'name');
        res.json(profiles);
    } catch (err) {
        res.status(404).json({ profile: 'There are no profiles'});
    }
}

exports.getCurrentUserProfile = async (req, res) => {
    const errors = {};

    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', 'name');

        if(!profile) {
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors);
        }
        res.json(profile);
    } catch (err) {
         res.status(404).send(err);
    }
}

exports.deleteCurrentUserProfile = async (req, res) => {
    try {
        await Profile.findOneAndDelete({user: req.user.id});
        res.sendStatus(204);
    } catch (err) {
        res.send(err);
    }
}


