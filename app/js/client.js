'use strict';

var greet = require('./greet');

document.write(greet());
var playerList = document.getElementById('playerList');

var request = require('superagent');

request
	.get('/api/players')
	.set('eat','qQJU7Ad8+bTDtcVYOebEkGybxRafHi58Ix6xcS+fVN7AT8PPFYBd8wpxau7o')
	.end(function(err, res) {
		if (err) return console.log(err);
		var players = JSON.parse(res.text);

		players.forEach(function(player) {
			var playerEl = document.createElement('li');
			playerEl.innerHTML = player.name;
			playerList.appendChild(playerEl);

		});
	});