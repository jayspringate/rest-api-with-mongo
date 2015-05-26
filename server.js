'use strict';

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var app = express();

process.env.APP_SECRET = process.env.APP_SECRET || 'unicornrainbow';

var playersRoutes = express.Router();
var usersRoutes = express.Router();

app.use(passport.initialize());

require('./lib/passport-strategy')(passport);

require('./routes/players-routes')(playersRoutes);
require('./routes/auth-routes')(usersRoutes, passport);

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/players_development');

app.use('/api', playersRoutes);
app.use('/api', usersRoutes);

app.listen(process.env.PORT || 3000, function() {
	console.log('server running on port ' + (process.env.PORT || 3000));
});