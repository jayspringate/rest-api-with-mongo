'use strict';

//if token begins with + or other special character, 
//json parser does not like that

var eat = require('eat');
var User = require('../models/User');  //figure out token expiration w/ timestamps

module.exports = function(secret) {
	return function(req, res, next) {
		var token = req.headers.eat || req.body.eat;
		if (!token) {
			console.log('unauthorized - no token in request');
			return res.status(401).json({msg: 'not authorized'});
		}

		eat.decode(token, secret, function(err, decoded) {
			if (err) {
				console.log(err);
				return res.status(401).json({msg: 'not authorized'});
			}

			//set expiration date, if decoded.expires...

			User.findOne({uniqueHashId: decoded.id}, function(err, user) {  //will be random hash here, not id
				if (err) {
				console.log(err);
				return res.status(401).json({msg: 'not authorized'});
			}

			if (!user) {
				console.log('no user found for that token');
				return res.status(401).json({msg: 'not authorized'});
			}

			req.user = user;
			next();


			});
		});
	};
};

