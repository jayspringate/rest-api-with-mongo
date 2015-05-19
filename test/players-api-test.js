'use strict';

require('../server');
process.env.MONGOLAB_URI = 'mongodb://localhost/players_development';

var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var Player = require('../models/Player');

describe('fantasy baseball team players api', function () {
	
	after(function(done) {
		mongoose.connection.db.dropDatabase(function() {
			done();
		});
	});

	it('should be able to create a new player', function(done) {
		chai.request('localhost:3000')
			.post('/api/players')
			.send({userId: 'bills217', name: 'Test Player', ba: 0.326})
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.name).to.eql('Test Player');
				expect(res.body.ba).to.eql(0.326);
				expect(res.body).to.have.property('_id');
				done();
			});
	});

	it('should be an array of players', function(done) {
		chai.request('localhost:3000')
			.get('/api/players')
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(Array.isArray(res.body)).to.eql.true; // jshint ignore:line
				done();
			});
	});

	// describe('needs an existing player in the array', function() {
	// 	beforeEach(function(done) {
	// 		var testPlayer = new Player({userId: 'bills217', name: 'Another Test Player', ba: 0.343});
	// 		testPlayer.save(function(err, data) {
	// 			if(err) throw err;
	// 			this.testPlayer = data;
	// 			done();
	// 		}.bind(this));
	// 	});

	// it('should create test player in beforeEach block', function() {
	// 	expect(this.testPlayer.name).to.eql('Test Player');
	// 	expect(this.testPlayer.ba).to.eql(0.343);
	// 	expect(this.testPlayer).to.have.property('_id');
	// });

	it('should update a player', function(done) {
		chai.request('localhost:3000')
			.put('/api/players/' + this.testPlayer._id)
			.send({name: 'New Player'})   //eat.send with actual object, don't call request every time
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.msg).to.eql('success');
				done();
			});
	});

	it('should delete a player', function(done) {
		chai.request('localhost:3000')
			.del('/api/players/' + this.testPlayer._id)
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.msg).to.eql('success');
				done();
			});
		});
	});
