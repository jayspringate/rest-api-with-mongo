'use strict';

var Sql = require('sequelize');
var sql = new Sql('notes_dev', 'notes_dev', 'prince', {
	dialect: 'postgres'
});

var Player = module.exports = sql.define('Player', {
	name: Sql.STRING,
	ba: Sql.DECIMAL
});

Player.sync();