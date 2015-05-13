'use strict';

var Sql = require('sequelize');
var sql = new Sql('notes_dev', 'notes_dev', 'prince', {
	dialect: 'postgres'
});
var Player = require('../models/Player');
var bodyparser = require('body-parser');

module.exports = function(router) {

	router.use(bodyparser.json());

	router.get('/players', function(req, res) {
		sql.sync()
		.then(function() {
			Player.all()
			.then(function(data) {
				res.json(data);
			})
			.error(function(err) {
				console.log(err);
				res.status(500).json({msg: 'server error'});
			});
		});
	});

	router.post('/players', function(req, res) {
		sql.sync()
		.then(function() {
			Player.create(req.body) //.create is from sequelize
			.then(function(data) {
				res.json(data);
			})
			.error(function(err) {
				console.log(err);
				res.status(500).json({msg: 'server error'});
			});
		});
	});
		
	router.put('/players/:id', function(req, res) {
		sql.sync()
		.then(function() {
			Player.update(req.body, {where: {id: req.params.id}})
			.error(function(err) {
				console.log(err);
				res.status(500).json({msg: 'server error'});
			});
			res.json({msg: 'successful update'});
		});
	});

	router.delete('/players/:id', function(req, res) {
		sql.sync()
		.then(function() {
			Player.destroy({where: {id: req.params.id}})
			.error(function(err) {
				console.log(err);
				res.status(500).json({msg: 'server error'});
			});
			res.json({msg: 'successful delete'});
		});
	});
};