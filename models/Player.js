'use strict';

var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
	name: {
		type: String,
		required: 'name is required!'
	},
	ba: {
		type: Number,
		required: 'batting average is required!',
		min: 0,
		max: 1
	}
});

module.exports = mongoose.model('Player', playerSchema);