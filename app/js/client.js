'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var playersApp = angular.module('playersApp', ['ngRoute', 'ngCookies', 'base64']);

//services
require('./services/rest-resource')(playersApp); //services must be required first
require('./auth/services/auth-service')(playersApp);

//controllers
require('./players/controllers/players-controllers')(playersApp);
require('./auth/controllers/auth-controllers')(playersApp);

//directives
require('./players/directives/new-player-form-directive')(playersApp);

playersApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/players', {
			templateUrl: 'templates/views/players-view.html',
			controller: 'playersController'
		})
		.when('/sign-in', {
			templateUrl: 'templates/views/sign-in.html',
			controller: 'authController'
		})
		.when('/create-user', {
			templateUrl: 'templates/views/create-user.html',
			controller: 'authController'
		})
		.when('/', {
			redirectTo: '/players'
		})
		.otherwise({
			redirectTo: '/create-user'
		});
}]);
