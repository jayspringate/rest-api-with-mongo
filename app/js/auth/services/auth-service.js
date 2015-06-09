'use strict';

module.exports = function(app) {
	app.factory('auth', ['$http', '$base64', '$cookies', 
		function($http, $base64, $cookies) {
		return {
			signIn: function(user, callback) { //base64 encoding is part of passport
				var encoded = $base64.encode(user.username + ':' + user.password);
				user.email = user.username; //examine later
				$http.get('/api/sign-in', {
					headers: {'Authorization': 'Basic ' + encoded}
				})
					.success(function(data) {
						$cookies.put('eat', data.token);
						callback(null);
					})
					.error(function(data) {
						callback(data);
					});
			},

			create: function(user, callback) {
				user.email = user.username; //examine later
				$http.post('/api/create-user', user)
					.success(function(data) {
						$cookies.put('eat', data.token);
						callback(null);
					})
					.error(function(data) {
						callback(data);
					});
			},

			logout: function() {
				$cookies.put('eat', '');
			},

			isSignedIn: function() {
				return !!($cookies.get('eat') && $cookies.get('eat').length); //empty string will be zero
			}                                        //and convert to false
		};
	}]);
};