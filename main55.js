window.onload = function () {
	enchant();
	var game = new Core (320, 480);
    
    game.preload('background.png','tako.png','sakana.png','enemy03.png', 'enemy01.png','sensuikan01.png', 'images.png', 'bullet.png', 'end.png', 'fire01.mp3');

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
        if (game.input.up) {
                this.y -= 8;
        }
        this.y -= 12;
       }
    });

   var Player = enchant.Class.create(enchant.Sprite, {
               
     initialize : function () {
       enchant.Sprite.call(this, 30,60);
       this.image = game.assets['images.png'];
       this.frame = 0;
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
       enchant.Sprite.call(this, 100,74);
       this.image = game.assets['sensuikan01.png'];
       this.x = 100;
       this.y = 30;
     },

     onenterframe : function() {
        if (game.frame % 128 != 0) {
          return;
        }
        bullet = new EnemyShot1 (this.x, this.y + 16);
        game.rootScene.addChild(bullet);
      }
    });

    var Sensuikan1 = enchant.Class.create(enchant.Sprite, {
               
     initialize : function (x,y) {
       enchant.Sprite.call(this, 30,60);
       this.image = game.assets['images.png'];
       this.x = x;
       this.y = y;
     },

     onenterframe : function() {
        if (game.frame % 128 != 0) {
          return;
        }
        this.y++;
        if (game.frame % 96 != 0) {
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
       if (this.y > game.height + this.height) {
          this.scene.removeChild(this);
        }
        this.y++;
        if (game.frame % 96 != 0) {
          return;
        }
        bullet = new EnemyShot (this.x, this.y + 16);
        game.rootScene.addChild(bullet);
      }
    });

    var esa = enchant.Class.create(enchant.Sprite, {
      initialize : function (x,y) {
        enchant.Sprite.call(this, 80, 30);
        this.image = game.assets['sakana.png'];
        this.x = x;
        this.y = y;
      },
      onenterframe : function() {
       if (this.y > game.height + this.height) {
          this.scene.removeChild(this);
        }
        this.y += 1;
        if (game.frame % 96 != 0) {
          return;
        }
        if (this.within(player)){
        scoreLabel.score += 500;
       }
      }
    });

    var esa2 = enchant.Class.create(enchant.Sprite, {
      initialize : function (x,y) {
        enchant.Sprite.call(this, 80, 80);
        this.image = game.assets['tako.png'];
        this.x = x;
        this.y = y;
      },
      onenterframe : function() {
       if (this.y > game.height + this.height) {
          this.scene.removeChild(this);
        }
        this.y += 1;
        if (game.frame % 96 != 0) {
          return;
        }
        if (this.within(player)){
        scoreLabel.score -= 500;
       }
       bullet = new EnemyShot2 (this.x, this.y + 16);
        game.rootScene.addChild(bullet);
      }
    });

    var Enemy1 = enchant.Class.create(enchant.Sprite, {
      initialize : function (x,y) {
        enchant.Sprite.call(this, 16, 16);
        this.image = game.assets['enemy03.png'];
        this.x = x;
        this.y = y;
      },
      onenterframe : function() {
       if (this.y > game.height + this.height) {
          this.scene.removeChild(this);
        }
        this.y++;
        if (game.frame % 96 != 0) {
          return;
        }
        bullet = new EnemyShot (this.x, this.y + 16);
        game.rootScene.addChild(bullet);
      }
    });
    var sound = game.assets['fire01.mp3'].clone();
        sound.play();

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
       if (this.within(player)){
        scoreLabel.score -= 10;
       }
       this.y += 6;
       }
    });

    var EnemyShot1 = enchant.Class.create(enchant.Sprite, {
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
       if (this.within(player)){
        scoreLabel.score -= 10;
       }
       this.y += 6;
       }
    });

    var EnemyShot2 = enchant.Class.create(enchant.Sprite, {
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
       if (this.within(player)){
        scoreLabel.score -= 300;
       }
       this.y += 6;
       }
    });
  
    var background = new Sprite (320,480);
      background.image = game.assets['background.png'];
      game.rootScene.addChild(background);
        
    var player = new Player();
    player.x = game.width / 2 - player.width / 2
    player.y = game.height -96;
    game.rootScene.addChild(player);
    
    
    var sensuikan = new Sensuikan();
      game.rootScene.addChild(sensuikan);

    var scoreLabel = new ScoreLabel(game.width / 2, 0);
      game.rootScene.addChild(scoreLabel);

    var timeLabel = new TimeLabel(0,0, 'countdown');
      timeLabel.time = 60;
      timeLabel.onenterframe = function () {
      if (timeLabel.time <= 0){
         game.end(scoreLabel.score, scoreLabel.score + '点！');
        }
      } 
      game.rootScene.addChild(timeLabel);
      
      game.rootScene.onenterframe = function () {
        if (game.frame % 300 == 0){
          var enemy = new esa(Math.random()*(game.width - 16),-16);
            this.addChild(enemy);
        }
        if (game.frame % 200 == 0){
          var enemy = new esa2(Math.random()*(game.width - 16),-16);
            this.addChild(enemy);
        }
        if (game.frame % 40 == 0){
          var enemy = new Enemy(Math.random()*(game.width - 16),-16);
            this.addChild(enemy);
        }
        var collidingPairs = Enemy.intersect(Shot);
        collidingPairs.forEach(function(pair) {
          game.rootScene.removeChild(pair[0]);
          game.rootScene.removeChild(pair[1]);
          scoreLabel.score += 100;
        });
        var collidingPairs = esa2.intersect(Shot);
        collidingPairs.forEach(function(pair) {
          game.rootScene.removeChild(pair[0]);
          game.rootScene.removeChild(pair[1]);
          scoreLabel.score += 300;
        });
        var collidingPairs = esa.intersect(Shot);
        collidingPairs.forEach(function(pair) {
          game.rootScene.removeChild(pair[0]);
          game.rootScene.removeChild(pair[1]);
          scoreLabel.score -= 300;
        });
        if (game.frame % 120 == 0){
          var enemy = new Sensuikan(Math.random()*(game.width - 16),-16);
            this.addChild(enemy);
        }
        var collidingPairs = Sensuikan.intersect(Shot);
        collidingPairs.forEach(function(pair) {
          game.rootScene.removeChild(pair[0]);
          game.rootScene.removeChild(pair[1]);
          scoreLabel.score += 300;
        });
        if (game.frame % 500 == 0){
          var enemy = new Sensuikan1(Math.random()*(game.width + 16),+32);
            this.addChild(enemy);
        }
        var collidingPairs = Sensuikan1.intersect(Shot);
        collidingPairs.forEach(function(pair) {
          game.rootScene.removeChild(pair[0]);
          game.rootScene.removeChild(pair[1]);
          scoreLabel.score -= 500;
        });
        if (game.frame % 40 == 0){
          var enemy = new Enemy1(Math.random()*(game.width - 16),-16);
            this.addChild(enemy);
        }
        var collidingPairs = Enemy1.intersect(Shot);
        collidingPairs.forEach(function(pair) {
          game.rootScene.removeChild(pair[0]);
          game.rootScene.removeChild(pair[1]);
          scoreLabel.score += 150;
        });
            
            if (game.input.right) {
                player.x += 30;
                this.frame = 3;

            }
            if (game.input.left) {
                player.x -= 30;
                this.frame =4;
            }
            if (game.input.up) {
                player.y -= 30;

            }
            if (game.input.down) {
                player.y += 30;
            }
            if ( player.x < background+33 ) {
                player.x = background+33;
                } else if ( player.x < 8 ) {
                player.x = 8;
            }
             if ( player.x < background+33 ) {
                player.x = background+33;
                } else if ( player.x > 300 ) {
                player.x = 8;
            } 
            
            if ( player.y > background-33 ) {
                player.y = background-33;
                } else if ( player.y < 8 ) {
                player.y = -8;
            }
             if ( player.y > player+33 ) {
                player.y = player+33;
                } else if ( player.y > 412 ) {
                player.y = 8;
              }         
     }
  }
   game.start();
}