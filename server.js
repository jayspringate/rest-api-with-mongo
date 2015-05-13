'use strict';

var express = require('express');
var app = express();
var playersRoutes = express.Router();

require('./routes/players-routes')(playersRoutes);

app.use('/api', playersRoutes);

app.listen(3000, function() {
	console.log('server running on port ' + 3000);
});