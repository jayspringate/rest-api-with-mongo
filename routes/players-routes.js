'use strict';

var Player = require('../models/Player');
var bodyparser = require('body-parser');
var eatAuth = require('../lib/eat-auth')(process.env.APP_SECRET);

module.exports = function(router) {

	router.use(bodyparser.json());

	router.get('/players', eatAuth, function(req, res) {
		Player.find({}, function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'server error'});
			}

			res.json(data);
		});
	});

	router.post('/players', eatAuth, function(req, res) {
		var userObject = JSON.parse(JSON.stringify(req.user));
		if (userObject.userId !== 'bills217') {  //bills217 is only permissible admin
				return res.status(401).json({msg: 'not authorized - must be admin'});
			}
		var newPlayer = new Player(req.body);
		newPlayer.userId = userObject.userId;
		newPlayer.save(function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'server error'});
			}

			res.json(data);
		});
	});

	router.put('/players/:id', eatAuth, function(req, res) {
		var userObject = JSON.parse(JSON.stringify(req.user)); 
		if (userObject.userId !== 'bills217') {  //bills217 is only permissible admin
				return res.status(401).json({msg: 'not authorized - must be admin'});
			}

		var updatedPlayer = req.body;
		delete updatedPlayer._id;

		Player.update({'_id': req.params.id}, updatedPlayer, function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'server error'});
			}

			res.json({msg: 'success'});
		});
	});

	router.delete('/players/:id', eatAuth, function(req, res) {
		var userObject = JSON.parse(JSON.stringify(req.user)); 
		if (userObject.userId !== 'bills217') {  //bills217 is only permissible admin
				return res.status(401).json({msg: 'not authorized - must be admin'});
			}

		Player.remove({'_id': req.params.id}, function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'server error'});
			}

			res.json({msg: 'success'});
		});
	});
};