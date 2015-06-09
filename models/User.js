'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');
var uuid = require('node-uuid');

var userSchema = mongoose.Schema({
	username: {
		type: String,
		required: 'userID is required!'
	},
	uniqueHashId: {
		type: String
	},
	basic: {				//email and password under basic object for added protection
		email: {
			type: String,
			unique: true       
		},
		password: {
			type: String
		} 
	}
});

userSchema.methods.generateHash = function(password, callback) { 
	bcrypt.hash(password, bcrypt.genSalt(8, function (err, result) {
		console.log(result);
	}),
	null, function (err, hash) {
		console.log(hash);
		this.basic.password = hash;
	}.bind(this));
};

userSchema.methods.checkPassword = function (password, callback) {

	bcrypt.compare(password, this.basic.password, 
	function bcryptCallback (err, res) {
		console.log(res + 'method');
		return callback(res);
	});
};
 
userSchema.methods.generateToken = function(secret, callback) { //generate a random hash instead
	eat.encode({id: this.uniqueHashId}, secret, callback);                 //of an id (UUID library)
};

module.exports = mongoose.model('User', userSchema);