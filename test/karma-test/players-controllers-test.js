'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('players controllers', function() {
	var $ControllerConstructor;
	var $httpBackend;
	var $scope;

	beforeEach(angular.mock.module('playersApp'));
	beforeEach(angular.mock.inject(function($rootScope, $controller) {
		//don't have to use square bracket notation above for tests, because
		//won't ever be minified.
		$scope = $rootScope.$new();
		$ControllerConstructor = $controller;

	}));

	it('should be able to create a new controller', function() {
		var playersController = $ControllerConstructor('playersController', 
			{$scope : $scope});
		expect(typeof playersController).toBe('object');
		expect(Array.isArray($scope.players)).toBe(true);
		expect(Array.isArray($scope.errors)).toBe(true);
		expect(typeof $scope.getAllPlayers).toBe('function');
		//note that toBe (jasmine) differs slightly from to.be (mocha)
	});

	describe('REST functionality', function() {
		beforeEach(angular.mock.inject(function(_$httpBackend_) {
			$httpBackend = _$httpBackend_;
			this.playersController = $ControllerConstructor('playersController',
				{$scope: $scope});
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('should make a GET request to players', function() {
			$httpBackend.expectGET('/api/players')
				.respond(200, [{_id: 1, name: 'Joey Gallo', ba: 0.756}]);
				$scope.getAllPlayers();
				$httpBackend.flush();
				expect($scope.players[0]._id).toBe(1);
				expect($scope.players[0].name).toBe('Joey Gallo');
				expect($scope.players[0].ba).toBe(0.756);
		});

		it('should correctly handle errors', function() {
			$httpBackend.expectGET('/api/players')
				.respond(500, {msg: 'server error'});
			$scope.getAllPlayers();
			$httpBackend.flush();
			expect($scope.errors.length).toBe(1);
			expect($scope.errors[0].msg).toBe('error retrieving players');
		});

		it('should clear errors', function() {
			$httpBackend.expectGET('/api/players')
				.respond(500, {msg: 'server error'});
			$scope.getAllPlayers();
			$httpBackend.flush();
			$scope.clearErrors();
			expect($scope.errors.length).toBe(0);
		});

		it('should be able to save a new player', function() {
			$scope.newPlayer = {name: 'Joey Votto', ba: 0.343};
			$httpBackend.expectPOST('/api/players')
				.respond(200, $scope.newPlayer);
			$scope.createNewPlayer();
			$httpBackend.flush();
			expect($scope.players[0].name).toBe('Joey Votto');
			expect($scope.players[0].ba).toBe(0.343);
			expect($scope.newPlayer).toBe(null);
		});

		it('should be able to update a player', function() {
			var oldPlayer = {_id: '4', name: 'Jay Bruce', ba: 0.176};
			$scope.players.push(oldPlayer);
			var updatedPlayer = {_id: '4', name: 'Yoenis Cespedes', ba: 0.283};
			$httpBackend.expectPUT('/api/players/4')
				.respond(200, updatedPlayer);
			$scope.updatePlayer(updatedPlayer);
			$scope.players[0].name = 'Yoenis Cespedes';
			$scope.players[0].ba = 0.283;
			$httpBackend.flush();
			expect($scope.players[0]._id).toBe('4');
			expect($scope.players[0].name).toBe('Yoenis Cespedes');
			expect($scope.players[0].ba).toBe(0.283);
		});

		it('should be able to delete a player', function() {
			var player = {_id: '4', name: 'Jay Bruce', ba: 0.176};
			$scope.players.push(player);
			$httpBackend.expectDELETE('/api/players/4')
				.respond(200, {msg: 'successful deletion'});
			expect($scope.players.indexOf(player)).not.toBe(-1);
			$scope.deletePlayer(player);
			expect($scope.players.indexOf(player)).toBe(-1);
			$httpBackend.flush();
			expect($scope.errors.length).toBe(0);
		});

		it('should delete a player even on server error', function() {
			var player = {_id: '4', name: 'Jay Bruce', ba: 0.176};
			$scope.players.push(player);
			$httpBackend.expectDELETE('/api/players/4')
				.respond(500, {msg: 'server error'});
			expect($scope.players.indexOf(player)).not.toBe(-1);
			$scope.deletePlayer(player);
			expect($scope.players.indexOf(player)).toBe(-1);
			$httpBackend.flush();
			expect($scope.errors.length).toBe(1);
			expect($scope.errors[0].msg).toBe('could not delete player');
		});



	});
});