const User = require('./user.model');
const Post = require('../post/post.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

exports.create = async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    try {
        const user = await User.findOne({ email: req.body.email });

        if(user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        } else {

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            return res.json(user)
                        })
                        .catch(err => {
                            return res.send(err)
                        });
                });
            });
        }
    } catch (err) {
        return res.send(err)
    }
}

exports.login = async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({email});

        if(!user) {
            errors.email = 'Email or password is incorrect';
            return res.status(404).json(errors);
        }

        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(isMatch) {
                    const payload = { id: user.id, name: user.name };
                    jwt.sign(payload, keys.secretOrKey, { expiresIn: '1w' }, (err, token) => {
                        return res.json({success: true, token: 'Bearer ' + token });
                    });

                } else {
                    errors.password = 'Email or password is incorrect';
                    return res.status(404).json(errors);
                }
            });
    } catch (err) {
        return res.send(err);
    }
}

exports.getCurrentUser = (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    }); 
}

exports.remove = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.sendStatus(204);
    } catch (err) {
        res.send(err);
    }
}

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find({user: req.params.id})
        .populate('user', 'name')
        .sort({createdAt: 'desc'});

        res.json(posts);
    } catch (err) {
        res.send(err);
    }
}

exports.deletePosts = async (req, res) => {
    try {
        await Post.deleteMany({user: req.user.id});
        res.sendStatus(204);
    } catch (err) {
        res.send(err);
    }
}