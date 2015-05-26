'use strict';

var User = require('../models/User');
var bodyparser = require('body-parser');
var eatAuth = require('../lib/eat-auth')(process.env.APP_SECRET);
var uuid = require('uuid');

module.exports = function(router, passport) {
	router.use(bodyparser.json());

	router.post('/create-user', function(req, res) {
		var newUserData = JSON.parse(JSON.stringify(req.body)); //this is to get a new object
		delete newUserData.email;                               //so email and password don't
		delete newUserData.password;                            //get deleted from req.body
		var newUser = new User(newUserData);
		newUser.basic.email = req.body.email;
		newUser.uniqueHashId = uuid.v1();
		newUser.generateHash(req.body.password, function() {
			
		});
		newUser.save(function(err, user) {
			if (err) {
				console.log(err);
				return res.status(500).json({msg: 'could not create user'});
			}

			user.generateToken(process.env.APP_SECRET, function(err, token) {
			if (err) {
				console.log(err);
				return res.status(500).json({msg: 'error generating token'});
			}

			res.json({msg: 'user generated', token: token});

			});
		});
	});


	router.get('/sign-in', passport.authenticate('basic', {session: false}), function(req, res) {
		req.user.generateToken(process.env.APP_SECRET, function(err, token) { //genToken
			if (err) {
				console.log(err);
				return res.status(500).json({msg: 'error generating token'});
			}


			res.json({msg: 'authenticated as: ' + req.user.basic.email, token: token});
		});
	});
};