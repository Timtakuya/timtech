window.onload = function () {
	enchant();
	var game = new Core (1200, 480);

	game.preload('background.png','sensuikan.png', 'sensuikan01.png','bullet01.png');
	
	game.onload = function () {

		var Shot = enchant.Class.create(enchant.Sprite, {
			initialize : function(x, y) {
				enchant.Sprite.call(this, 36, 153);
				this.image = game.assets['bullet01.png'];
				this.x = x;
				this.y = y;
			},
            onenterframe : function (){
                if (this.y < 0){
                    this.scene.removeChild(this);
                }
                this.y -= 30;
            }
		});

        var EnemyBullet = enchant.Class.create(enchant.Sprite,{
            initialize : function(x, y){
                Bullet,call(this, x, y);
                this.speed = 4;
                this.frame = 7;
                this.addEventListener('enterframe', function(){
                    if (sensuikan.within(this, 8) && core.death == false){
                        core.death = true;
                        sensuikan.visible = false;
                        core.life--;
                        if (core.life == 0) core.over = true;

                    }
                });
            }
        });

        var Sensuikan = enchant.Class.create(enchant.Sprite, {
        	
        	initialize : function() {
        		enchant.Sprite.call(this, 100, 16);
        		this.image = game.assets['sensuikan.png'];
        		this.x = game.width / 2 - this.width / 2;
        		this.y = game.height - 30;
        	},
        	onenterframe : function(){
        		if (game.frame % 16 != 0) {
        			return;
        	    }
        	    bullet = new Shot (this.x, this.y - 16);
        	    game.rootScene.addChild(bullet);
                
                if (apad.isTouched === true) {
                    this.x += apad.vx*4;
                    this.y += apad.vy*4;
                }
            },
        });

        var Enemy = enchant.Class.create(enchant.Sprite, {
        	initialize : function (x,y) {
        		enchant.Sprite.call(this, 60, 60);
        		this.image = game.assets['sensuikan01.png'];
        		this.x = x;
        		this.y = y;
        	},

        	onenterframe : function(){
        		if (this.y > game.height + this.height){
        			this.scene.removeChild(this);
        		}
        		this.y++;
        	},
        });

		var background = new Sprite(1200,480);
        background.image = game.assets['background.png'];
        game.rootScene.addChild(background);

        var apad = new APad();
        apad.moveTo(0, 300);
        game.rootScene.addChild(apad);

        var sensuikan = new Sensuikan ();
        game.rootScene.addChild(sensuikan);
        
        game.rootScene.ontouchmove = function (touch) {
        	sensuikan.x = touch.x - sensuikan.width / 2;
        }

        var scoreLabel = new ScoreLabel(game.width / 2, 0);
        game.rootScene.addChild(scoreLabel);

        var timeLabel = new TimeLabel(0, 0, 'countdown');
        timeLabel.time = 30;
        timeLabel.onenterframe = function (){
            if (timeLabel.time <=0) {
                game.end(scoreLabel.score, scoreLabel.score + '点！', game.assets['end.png']);
            }
        }
        game.rootScene.addChild(timeLabel);

        var lifeLabel = new LifeLabel(180, 0, 3);
        game.rootScene.addChild(lifeLabel);

        game.rootScene.onenterframe = function() {
        	if (game.frame % 60 == 0) {
        		var enemy = new Enemy(Math.random() * (game.width - 16), -16);
        		this.addChild(enemy);
        	}

            var collidingPairs = Enemy.intersect(Shot);

            collidingPairs.forEach(function(pair){
                game.rootScene.removeChild(pair[0]);
                game.rootScene.removeChild(pair[1]);
                scoreLabel.score++;
            });
        }
    }
    game.start();
}

 