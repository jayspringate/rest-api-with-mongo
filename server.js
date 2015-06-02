'use strict';

var mongoose = require('mongoose');
var express = require('express');
var app = express();
var playersRoutes = express.Router();

require('./routes/players-routes')(playersRoutes);

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/players_development');

app.use(express.static(__dirname + '/build'));

app.use('/api', playersRoutes);

app.listen(process.env.PORT || 3000, function() {
	console.log('server running on port ' + (process.env.PORT || 3000));
});