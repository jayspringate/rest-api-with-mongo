'use strict';

var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
	userId: {
		type: String,
		required: 'userID is required!'
	},
	name: {
		type: String,
		unique: true,
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