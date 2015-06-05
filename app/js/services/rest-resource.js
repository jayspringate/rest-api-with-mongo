'use strict';

module.exports = function(app) {

	app.factory('RESTResource', ['$http', function($http) {
		var handleError = function(callback) {
			return function(data) {
				console.log(data);
				callback(data);
			}
		};

		var handleSuccess = function(callback) {
			return function(data) {
				callback(null, data);
			}
		};

		return function(resourceName) {
			return {
				getAll: function (callback) {
					$http.get('/api/' + resourceName)
						.success(handleSuccess(callback))
						.error(handleError(callback))
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
			}
		};
	}]);
};