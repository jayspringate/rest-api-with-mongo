'use strict';

require('angular/angular');

var playersApp = angular.module('playersApp', []);

//controllers
require('./players/controllers/players-controllers')(playersApp);

//services
require('./services/rest-resource')(playersApp);

//directives
require('./players/directives/new-player-form-directive')(playersApp);
