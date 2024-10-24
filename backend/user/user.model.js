const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { 
  	type: String, 
  	required: true,
  	minLength: 2,
  	maxLength: 30 
  },
  email: { 
  	type: String, 
  	required: true, 
  	lowercase: [true, 'Email field is required'] 
  },
  password: { 
  	type: String, 
  	required: [true, 'Password field is required']
  }
}, { timestamps: true });

module.exports = User = mongoose.model('users', UserSchema);