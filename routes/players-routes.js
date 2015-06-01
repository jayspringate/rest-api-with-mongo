'use strict';

var Player = require('../models/Player');
var bodyparser = require('body-parser');

module.exports = function(router) {

	router.use(bodyparser.json());

	router.get('/players', function(req, res) {
		Player.find({}, function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'server error'});
			}

			res.json(data);
		});
	});

	router.post('/players', function(req, res) {
		var newPlayer = new Player(req.body);
		newPlayer.save(function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'server error'});
			}

			res.json(data);
		});
	});

	router.put('/players/:id', function(req, res) {
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

	router.delete('/players/:id', function(req, res) {
		Player.remove({'_id': req.params.id}, function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'server error'});
			}

			res.json({msg: 'success'});
		});
	});
};