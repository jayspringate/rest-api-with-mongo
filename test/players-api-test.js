'use strict';

var server = require('../server');
process.env.MONGOLAB_URI = 'mongodb://localhost/players_development';

var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var Player = require('../models/Player');
var User = require('../models/User');
var bodyparser = require('body-parser');
var eat = require('eat');

describe('fantasy baseball team players api', function () {
	
	after(function(done) {
		mongoose.connection.db.dropDatabase(function() {
			done();
		});
	});

	var newEat;

	 	it('should create a test user', function(done) {
			chai.request('localhost:3000')
				.post('/api/create-user')
				.send({userId: 'bills217', email: 'test@test.com', password: 'prince'})
				.end(function(err, res) {
					newEat = res.body.token;
					expect(err).to.eql(null);
					expect(res.body.msg).to.eql('user generated');
					expect(res.body).to.have.property('token');
				done();
			});
	});

	 	it('should sign in', function(done) {
	 		chai.request('localhost:3000')
	 			.get('/api/sign-in')
	 			.set('email', 'test@test.com')
	 			.set('password', 'prince')
	 			.set('eat', newEat)
	 			.end(function(err, res) {
	 				expect(err).to.eql(null);
	 			done();
	 			});
	 	});

	 	var testName;

	it('should be able to create a new player', function(done) {
		chai.request('localhost:3000')
			.post('/api/players')
			.send({userId: 'testUser', name: 'Test Player', ba: 0.326, eat: newEat})
			.end(function(err, res) {
				testName = res.body.name;
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
			.set('eat', newEat)
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
			.put('/api/players/' + testName)
			.send({name: 'New Player', eat: newEat})   //eat.send with actual object, don't call request every time
			.end(function(err, res) {
				testName = 'New Player';
				expect(err).to.eql(null);
				expect(res.body.msg).to.eql('success');
				done();
			});
	});

	it('should delete a player', function(done) {
		chai.request('localhost:3000')
			.del('/api/players/' + testName)
			.send({eat: newEat})
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.msg).to.eql('success');
				done();
			});
		});
	});
