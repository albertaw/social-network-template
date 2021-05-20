const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};
    data.username = !isEmpty(data.username ) ? data.username  : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    if(!Validator.isLength(data.username, { min: 2, max: 40})) {
        errors.username = 'Username should be between 2 and 40 characters';
    }

    if(Validator.isEmpty(data.username)) {
        errors.username = 'Username is required';
    }

    if(Validator.isEmpty(data.skills)) {
        errors.skills = 'Skills field is required';
    }

    if(!isEmpty(data.website)) {
        if(!Validator.isURL(data.website)) {
            errors.website = 'Not a valid URL';
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}