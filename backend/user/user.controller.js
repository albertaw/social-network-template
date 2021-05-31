const User = require('./user.model');
const Post = require('../post/post.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

exports.create = (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email })
        .then(user => {
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
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        })
        .catch(err => res.send(err));
}

exports.login = (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        const payload = { id: user.id, name: user.name };
                        jwt.sign(payload, keys.secretOrKey, { expiresIn: '1w' }, (err, token) => {
                            res.json({success: true, token: 'Bearer ' + token });
                        });

                    } else {
                        errors.password = 'Password incorrect';
                        return res.status(400).json(errors);
                    }
                });
        })
        .catch(err => res.send(err));
}

exports.remove = (req, res) => {
    User.findByIdAndRemove(req.user.id)
        .then(response => {
            res.sendStatus(204);
        })
        .catch(err => res.send(err));
}

exports.getCurrentUser = (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    }); 
}

exports.getPosts = (req, res) => {
    Post.find({user: req.params.id})
        .populate('user', 'name')
        .sort({createdAt: 'desc'})
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            res.send(err);
        });

}

exports.deletePosts = (req, res) => {
    Post.deleteMany({user: req.user.id})
        .then(response => {
            res.sendStatus(204);
        })
        .catch(err => res.send(err));
}