'use strict';

module.exports = function(app) {
	app.controller('authController', ['$scope', '$location', 'auth', 
		function($scope, $location, auth) {
			if (auth.isSignedIn()) $location.path('/players');
			$scope.errors = []; //more code left, pull from before, 5:20
			$scope.authSubmit = function(user) {
				if (user.password_confirmation) {  //add validate password
					auth.create(user, function (err) {
						if (err) {
							console.log(err);
							return $scope.errors.push({msg: 'could not sign in'});
						}

						$location.path('/players');
					});
				} else {
					auth.signIn(user, function (err) {
						if (err) {
							console.log(err);
							return $scope.errors.push({msg: 'could not create user'});
					}
					$location.path('/players');
				});
			}
		};
	}]);
};