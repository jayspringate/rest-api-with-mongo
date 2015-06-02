'use strict';

module.exports = function(app) {
	app.controller('playersController', ['$scope', '$http', function($scope, $http) {
		$scope.errors = [];
		$scope.players = [];
		$scope.hideFastLoad = true;
		$scope.hideCancelEdit = true;
		var copyName;
		var copyBa;
		$scope.getAllPlayers = function() {
			$http.get('/api/players')
				.success(function(data) {
					$scope.players = data;
				})
				.error(function(data) {
					console.log(data);
					$scope.errors.push({msg: 'error retrieving players'});
				});
		};
		$scope.createNewPlayer = function() {
			$http.post('/api/players', $scope.newPlayer)
				.success(function(data) {
					$scope.players.push(data);
					$scope.newPlayer = null;
					$scope.hideFastLoad = true;
				})
				.error(function(data) {
					console.log(data);
					$scope.errors.push({msg: 'could not create new note'});
				});
		};
		$scope.slowCreate = function() {
			window.setTimeout($scope.createNewPlayer,500);
			
		}
		$scope.fastCreate = function() {
			$scope.hideFastLoad = false;
			var formName = document.getElementById('name').value;
			console.log(formName);
			var formBa = document.getElementById('ba').value;
			document.getElementById('fast').innerHTML = formName + ', BA: ' + formBa;
		}
		$scope.showCancel = function() {
			$scope.hideCancelEdit = false;
		}
		$scope.cacheEdit = function() {
			copyName = document.getElementById('editName').value;
			console.log(copyName);
			copyBa = document.getElementById('editBa').value;
		}
		$scope.updatePlayer = function(player) {
			player.editing = false;
			$http.put('api/players/' + player._id, player)
				.error(function(data) {
					console.log(data);
					$scope.errors.push({msg: 'could not update note'});
				});
		}
		$scope.cancelEdit = function(player) {
			console.log(copyName);
			player.name = copyName;
			player.ba = copyBa;
			$scope.hideCancelEdit = true;
		}
		$scope.deletePlayer = function(player) {
			$scope.players.splice($scope.players.indexOf(player), 1);
			$http.delete('api/players/' + player._id)
				.error(function(data) {
					console.log(data);
					$scope.errors.push({msg: 'could not delete player'});
				});
		};
		$scope.clearErrors = function() {
			$scope.errors = [];
			$scope.getAllPlayers(); //cache deleted instead of getall
		};
	}]);
};