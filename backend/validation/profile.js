const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};
    data.username = !isEmpty(data.username ) ? data.username  : '';

    if(!Validator.isLength(data.username, { min: 2, max: 40})) {
        errors.username = 'Username should be between 2 and 40 characters';
    }

    if(Validator.isEmpty(data.username)) {
        errors.username = 'Username is required';
    }
    if(isEmpty(data.skills)) {
        errors.skills = 'Skills field is required';
    }

    if(!isEmpty(data.website)) {
        if(!Validator.isURL(data.website)) {
            errors.website = 'Not a valid URL';
        }
    }

    if(!isEmpty(data.bio)) {
        if(!Validator.isLength(data.bio, { min: 1, max: 82 })) {
            errors.bio = "Bio should be max 82 characters";
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}