'use strict';

require('../server');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var Player = require('../models/Player');

describe('fantasy baseball team players api', function () {
	
	after(function(done) {
		Player.destroy({
			where: {
				name: 'test'
			}
		}).then(function() {
			done();
		});
	});

	it('should be able to create a new player', function(done) {
		chai.request('localhost:3000')
			.post('/api/players')
			.send({name: 'test', ba: 0.326})
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.name).to.eql('test');
				expect(res.body.ba).to.eql('0.326');
				expect(res.body).to.have.property('id');
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

	describe('needs an existing player in the array', function() {
		beforeEach(function(done) {
			var testPlayer = {name: 'test', ba: 0.343};
			Player.create(testPlayer)
			.then(function(data) {
				this.testPlayer = data;
			}.bind(this))
			.then(function(err) {
				console.log(err);
			})
			.then(function() {
				done();
			});
			});

	it('should create test player in beforeEach block', function() {
		expect(this.testPlayer.name).to.eql('test');
		expect(this.testPlayer.ba).to.eql('0.343');
		expect(this.testPlayer).to.have.property('id');
	});

	it('should update a player', function(done) {
		chai.request('localhost:3000')
			.put('/api/players/' + this.testPlayer.id)
			.send({name: 'test'})
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.msg).to.eql('successful update');
				done();
			});
	});

	it('should delete a player', function(done) {
		chai.request('localhost:3000')
			.del('/api/players/' + this.testPlayer.id)
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.msg).to.eql('successful delete');
				done();
			});
		});
	});
});
