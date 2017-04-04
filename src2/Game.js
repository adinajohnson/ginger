
BasicGame.Game = function (game) {
    var tileGroup; //active tiles (not already matched)
  	var uncovered; //tiles currently flipped over
  	var found; //matched tiles
    var style;
    var text;
};

BasicGame.Game.prototype = {

    create: function () {
        this.game.stage.backgroundColor = "#fff";

    		uncovered = [];
    		tileGroup = this.game.add.group();
    		found = this.game.add.group();

    		//randomly pick file names to distribute tiles on the board
    		var gingers = ["gingerallerton","gingerflower","gingerkai","gingerlion","gingersally","gingersitting","gingersnow","gingerteeth","gingertennis","gingertreat"];
        gingers = gingers.concat(gingers);
    		var tileSize = 120;
    		var cols = 5;
    		for (var i = 0; i < 20; i++) {
    			var randomName = gingers.splice([Math.floor(Math.random() * gingers.length)], 1);
    			var xx = (i%cols) * tileSize+60;
          var yy = Math.floor(i/cols) * tileSize+60;
    			var tile = this.game.add.sprite(xx, yy, "tiles", "pawprint.png");
    			tile.name = randomName;
          tile.flipped = false;

    			//enables clicks
    			tile.anchor.set(0.5);
        	tile.inputEnabled = true;
    			tile.events.onInputDown.add(this.listener, this, tile);
    			tileGroup.add(tile);
    		}
    },

    listener: function(tile) {
      if (uncovered.length < 2 && tile.flipped === false) { //don't flip more than 2 tiles (or same tile) over
        tile.flipped = true;
        tile.frameName = tile.name + ".png";
        uncovered.push(tile);

        if (uncovered.length >= 2) {
          if (String(tile.name) == String(uncovered[0].name)){
            found.add(tile);
            found.add(uncovered[0]); //removes from unmatched group
            if (tileGroup.length == 0) { //prints congratulations if all tiles are matched
              //style = { font: "bold 80px 'Passion One'", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
              //text = this.game.add.text(5, 480, "CONGRATULATIONS!", style);
              text = this.game.add.sprite(5, 480, "congratulations", "congratulations.png");
              var playButton = this.game.add.button(307, 591, "restart", this.restart, this);
              playButton.anchor.setTo(0.5, 0.5);
            }
          }
          this.game.time.events.add(Phaser.Timer.SECOND * .5, this.resetTiles, this); //reset tiles after short delay
        }
      }
    },

    resetTiles: function() {
      for (var i = 0; i < tileGroup.length; i++) { //turns all unmatched tiles back over
  			tileGroup.getAt(i).frameName = "pawprint.png";
        tileGroup.getAt(i).flipped = false;
  		}
  		uncovered = [];
    },


    update: function () {
        /*if (tileGroup.length == 0) { //prints congratulations if all tiles are matched
          style = { font: "bold 80px 'Passion One'", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
          text = this.game.add.text(5, 480, "CONGRATULATIONS!", style);
          var playButton = this.game.add.button(307, 591, "restart", this.restart, this);
          playButton.anchor.setTo(0.5, 0.5);
        }*/
    },

    restart: function (pointer) {
        this.state.start('Game');

    }

};
