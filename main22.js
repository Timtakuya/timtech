window.onload = function () {
	enchant();
	var game = new Core (320, 480);
    
    game.preload('background.png', 'enemy01.png','sensuikan01.png', 'images.png', 'bullet.png', 'end.png', 'fire01.mp3');

	game.onload = function () {

  

    var Shot = enchant.Class.create(enchant.Sprite, {
     initialize : function (x,y) {
        enchant.Sprite.call(this, 16, 16);
        this.image = game.assets['bullet.png'];
        this.x = x;
        this.y = y;
      },

     onenterframe : function () {
       if (this.y < 0) {
          this.scene.removeChild(this);
        }
       this.y -= 8;
       }
    });

   var Player = enchant.Class.create(enchant.Sprite, {
               
     initialize : function () {
       enchant.Sprite.call(this, 30,60);
       this.image = game.assets['images.png'];
       this.x = game.width / 2 - this.width / 2;
       this.y = game.height - 96;
     },

     onenterframe : function() {
        if (game.frame % 16 != 0) {
          return;
        }
        bullet = new Shot (this.x, this.y - 16);
        game.rootScene.addChild(bullet);
      }
    });

   var Sensuikan = enchant.Class.create(enchant.Sprite, {
               
     initialize : function () {
       enchant.Sprite.call(this, 100,60);
       this.image = game.assets['sensuikan01.png'];
       this.x = 100;
       this.y = 30;
     },

     onenterframe : function() {
        if (game.frame % 16 != 0) {
          return;
        }
        bullet = new EnemyShot (this.x, this.y + 16);
        game.rootScene.addChild(bullet);
      }
    });
        
    var Enemy = enchant.Class.create(enchant.Sprite, {
      initialize : function (x,y) {
        enchant.Sprite.call(this, 16, 16);
        this.image = game.assets['enemy01.png'];
        this.x = x;
        this.y = y;
      },
      onenterframe : function() {
        if (game.frame % 16 != 0) {
          return;
        }
        bullet = new EnemyShot (this.x, this.y + 16);
        game.rootScene.addChild(bullet);
       if (this.y > game.height + this.height) {
          this.scene.removeChild(this);
        }
        this.y++;
      }
    });

    var EnemyShot = enchant.Class.create(enchant.Sprite, {
     initialize : function (x,y) {
        enchant.Sprite.call(this, 16, 16);
        this.image = game.assets['bullet.png'];
        this.x = x;
        this.y = y;
      },

     onenterframe : function () {
       if (this.y > 480) {
          this.scene.removeChild(this);
        }
       this.y += 8;
       }
    });



    var background = new Sprite (320,480);
      background.image = game.assets['background.png'];
      game.rootScene.addChild(background);
        
    var player = new Player();
      game.rootScene.addChild(player);

    var sensuikan = new Sensuikan();
      game.rootScene.addChild(sensuikan);

    game.rootScene.ontouchmove = function (touch) {
        player.x = touch.x - player.width / 2;
      }

    var scoreLabel = new ScoreLabel(game.width / 2, 0);
      game.rootScene.addChild(scoreLabel);

    var timeLabel = new TimeLabel(0,0, 'countdown');
      timeLabel.time = 30;
      timeLabel.onenterframe = function () {
      if (timeLabel.time <= 0){
         game.end(scoreLabel.score, scoreLabel.score + '点！', game.assets['end.png']);
        }
      } 
      game.rootScene.addChild(timeLabel);

      game.rootScene.onenterframe = function () {
        if (game.frame % 20 == 0){
          var enemy = new Enemy(Math.random()*(game.width - 16),-16);
            this.addChild(enemy);
        }
        var collidingPairs = Enemy.intersect(Shot);
        collidingPairs.forEach(function(pair) {
          game.rootScene.removeChild(pair[0]);
          game.rootScene.removeChild(pair[1]);
          scoreLabel.score++;
        });
      }
  }
   game.start();
}