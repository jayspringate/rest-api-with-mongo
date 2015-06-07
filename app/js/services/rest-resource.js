'use strict';

module.exports = function(app) {

	var handleError = function(callback) {
			return function(data) {
				console.log(data);
				callback(data);
			};
		};

		var handleSuccess = function(callback) {
			return function(data) {
				callback(null, data);
			};
		};

	app.factory('RESTResource', ['$http', '$cookies', 
		function($http, $cookies) {

		

		return function(resourceName) {
			var eat = $cookies.get('eat');
			$http.defaults.headers.common.eat = eat;
			return {
				getAllPlayers: function (callback) {
					$http.get('/api/' + resourceName)
						.success(handleSuccess(callback))
						.error(handleError(callback));
				// },

				// create: function(resourceData, callback) {
				// 	$http.post('/api/' + resourceName)
				// 		.success(handleSuccess(callback))
				// 		.error(handleError(callback));
				// },

				// update: function(resourceData, callback) {
				// 	$http.put('/api/' + resourceName + '/' + resourceData._id, resourceData)
				// 		.success(handleSuccess(callback))
				// 		.error(handleError(callback));
				// },

				// del: function(resourceData, callback) {
				// 	$http.delete('/api/' + resourceName + '/' + resourceData._id, resourceData)
				// 		.success(handleSuccess(callback))
				// 		.error(handleError(callback));
				}
			};
		};
	}]);
};