
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {
		this.load.atlas('tiles', 'tiles.png', 'tiles.json'); //loads images for tiles
		this.load.image('play', 'images/play.png');
		this.load.image('restart', 'images/restart.png');
		this.load.image('title', 'images/title.png');

	},

	create: function () {
		this.state.start('MainMenu');
	},



};
