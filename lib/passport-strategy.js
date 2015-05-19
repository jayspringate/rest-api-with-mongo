'use strict';

var Basic = require('passport-http').BasicStrategy;
var User = require('../models/User');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
	passport.use('basic', new Basic({}, function(email, password, done) { 
		User.findOne({'basic.email': email}, function(err, user) {

			if(err) return done('database error');

			if(!user) return done('no such user');

			var newRes = user.checkPassword(password, function (res) {

			});

			console.log('newRes is ' + newRes);

			user.checkPassword(password, function (res) {

				if(!res) {
					return done('incorrect password');
				} else {
					return done(null, user);
				}
				
			});
			});
		}));
	};