window.onload = function () {
	enchant();
	var game = new Core (700, 480);

	game.preload('background.png','sensuikan.png', 
        'sensuikan01.png', 'bullet.png', 'enemy03.png', 'player.png',
        'clear.png');
	
	game.onload = function () {

        

　　　　　//自弾
		var Shot = enchant.Class.create(enchant.Sprite, {
			initialize : function(x, y) {
				enchant.Sprite.call(this, 16, 16);
				this.image = game.assets['bullet.png'];
				this.x = x;
				this.y = y;
                this.speed = 6;
			},
            onenterframe : function (){
                if (this.y < 0){
                    this.scene.removeChild(this);
                }
                this.y -= 30;
            }
		});

　　　　　//敵弾
        var EnemyBullet = enchant.Class.create(enchant.Sprite,{
            initialize : function(x, y){
                enchant.Sprite.call(this, 16, 16);
                this.image = game.assets['bullet.png'];
                this.x = x;
                this.y = y;
                this.speed = 30;
            },
            onenterframe : function (){
                if (this.y < 0){
                    this.scene.removeChild(this);
                }
                this.y += 30;
            }
        });

　　　　　//自機
        var Sensuikan = enchant.Class.create(enchant.Sprite, {
        	
        	initialize : function() {
        		enchant.Sprite.call(this, 16, 16);
        		this.image = game.assets['player.png'];
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


　　　　　//敵機
        var Enemy = enchant.Class.create(enchant.Sprite, {
        	initialize : function (x,y) {
        		enchant.Sprite.call(this, 100, 75);
        		this.image = game.assets['sensuikan01.png'];
        		this.x = x;
        		this.y = y;
        	},

        	onenterframe : function(){
        		if (this.y > game.height + this.height){
        			this.scene.removeChild(this);
        		}
        		this.y++;
                if (game.frame % 16 != 0){
                    return;
                }
                bullet = new EnemyBullet (this.x, this.y -16);
                game.rootScene.addChild(bullet);
        	},
        });
        var enemy_score = 100;


         //背景
        var background = new Sprite(1200,480);
        background.image = game.assets['background.png'];
        game.rootScene.addChild(background);

　　　　　//アナログパッド  
        var apad = new APad();
        apad.moveTo(0, 300);
        game.rootScene.addChild(apad);

　　　　　//自機生成
        var sensuikan = new Sensuikan ();
        game.rootScene.addChild(sensuikan);
        
        game.rootScene.ontouchmove = function (touch) {
            sensuikan.x = touch.x - sensuikan.width / 2;
        }

　　　　　//スコア表示
        var scoreLabel = new ScoreLabel(game.width / 2, 0);
        game.rootScene.addChild(scoreLabel);

　　　　　//時間表示
        var timeLabel = new TimeLabel(0, 0, 'countdown');
        timeLabel.time = 30;
        timeLabel.onenterframe = function (){
            if (timeLabel.time <=0) {
                game.end(scoreLabel.score, scoreLabel.score + '点！', game.assets['clear.png']);
            }
        }  
        
        game.rootScene.addChild(timeLabel);


　　　　　//ライフ表示
        var lifeLabel = new LifeLabel(180, 0, 3);
        game.rootScene.addChild(lifeLabel);

        game.rootScene.onenterframe = function() {
            if (game.frame % 60 == 0) {
                var enemy = new Enemy(Math.random() * (game.width - 16), -16);
                this.addChild(enemy);
            }
　　　　　　　//敵破壊時
            var collidingPairs = Enemy.intersect(Shot);
            collidingPairs.forEach(function(pair){
                game.rootScene.removeChild(pair[0]);
                game.rootScene.removeChild(pair[1]);
                scoreLabel.score += enemy_score;
            });
            game.rootScene.addChild(this);
        }
    }
    game.start();
}