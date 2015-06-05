'use strict';

module.exports = function(app) {
	app.directive('newPlayerFormDirective', function() {
		return {
			restrict: 'A', //ECMA, A for attribute, C for class
			replace: true, //for replacing div's to maintain semantics
			templateUrl: '/templates/directive-templates/new-player-form.html',
			//div acts as sole parent tag, which is required
			// scope: {}
		};
	});
};