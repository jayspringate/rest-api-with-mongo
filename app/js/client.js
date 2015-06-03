'use strict';

require('angular/angular');

var playersApp = angular.module('playersApp', []);

require('./players/controllers/players-controllers')(playersApp);

