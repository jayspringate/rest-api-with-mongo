'use strict';

module.exports = function(app) {
	app.directive('simpleDirective', function() {
		return {
			restrict: 'AC', //ECMA, A for attribute, C for class
			template: '<div><h1>{{someVal}}</h1><input type ="text" data-ng-model="someVal"></div>',
			//div acts as sole parent tag, which is required
			scope: {}
		}
	});
};