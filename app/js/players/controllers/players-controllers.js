'use strict';

module.exports = function(app) {
	app.controller('playersController', ['$scope', '$http', function($scope, $http) {
		$scope.errors = [];
		$scope.players = [];
		$scope.hideFastLoad = true;
		$scope.hideEdit = false;
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
					$scope.errors.push({msg: 'could not create new player'});
					$scope.hideFastLoad = true;
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
			$scope.hideEdit = true;
		}
		$scope.cacheEdit = function() {
			copyName = document.getElementById('editName').value;
			console.log(copyName);
			copyBa = document.getElementById('editBa').value;
		}
		$scope.slowCacheEdit = function() {
			window.setTimeout($scope.cacheEdit,100);
		}
		$scope.updatePlayer = function(player) {
			player.editing = false;
			$scope.hideCancelEdit = true;
			$http.put('/api/players/' + player._id, player)
				.error(function(data) {
					$scope.cancelEdit(player);
					console.log(data);
					$scope.errors.push({msg: 'could not update player'});
				});
			$scope.hideEdit = false;
		}
		$scope.cancelEdit = function(player) {
			console.log(copyName);
			player.name = copyName;
			player.ba = copyBa;
			$scope.hideCancelEdit = true;
			$scope.hideEdit = false;
		}
		$scope.deletePlayer = function(player) {
			$scope.players.splice($scope.players.indexOf(player), 1);
			$http.delete('/api/players/' + player._id)
				.error(function(data) {
					console.log(data);
					$scope.players.push(player);
					$scope.errors.push({msg: 'could not delete player'});
				});
		};
		$scope.cachePlayers = function() {
			playersCache = players;
		}
		$scope.clearErrors = function() {
			$scope.errors = [];
		};
	}]);
};