enchant();

window.onload = function () {

  core =new Core(320, 290);
  core.fps = 24;

  // スコア
  core.score = 0;
  // ライフ
  core.life = 3;
  // ウェイトのカウンタ
  core.wait = 0;
  // 自機の死亡
  core.death = false;
  // ゲームオーバー
  core.over = false;

  
  core.preload('background.png','sensuikan.png', 
        'sensuikan01.png', 'bullet.png', 'enemy03.png', 'player.png',
        'clear.png', 'effect0.png','spritesheet.png', 'exp.png');

  core.onload = function() { 

    
    background = new Background();
    
    
    player = new Player(144, 138);

    
    var scoreLabel = new ScoreLabel(5, 0);
    scoreLabel.score = 0;
    scoreLabel.easing = 0;
    core.rootScene.addChild(scoreLabel);
    
    
    var lifeLabel = new LifeLabel(180, 0, 3);
    core.rootScene.addChild(lifeLabel);
    
    //アナログ
    apad = new APad();
    apad.x = 220;
    apad.y = 220;
    core.rootScene.addChild(apad);

    
    enemies = [];

    
    core.rootScene.addEventListener('enterframe', function() {
      
      
      scoreLabel.score = core.score;
      
      lifeLabel.life = core.life;
      
      if (core.over) core.end();
      
      if (core.death == true) {
        core.wait ++;
        player.visible = player.visible ? false : true;
        if (core.wait == core.fps * 5) {
          core.death = false;
          player.visible = true;
          core.wait = 0;
        }
      }
      
      if (rand(100) < 5  && core.death == false) {
        var enemy = new Enemy(rand(320), 0, rand(3));
        enemy.id = core.frame;
        enemies[enemy.id] = enemy;
      }

    });

  }
  core.start();
}

// 自機
var Player = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y) {
    enchant.Sprite.call(this, 32, 32);
    
    var image = new Surface(128, 32);
    
    image.draw(core.assets['spritesheet.png'], 0, 0, 128, 32, 0, 0, 128, 32);
    this.image = image;
    this.frame = 0;
    this.x = x;
    this.y = y;
    
    this.addEventListener('enterframe', function() {
      
      
      
      
      if (apad.vy < 0) this.frame = 1;
      if (apad.vy > 0) this.frame = 2;
      if (apad.vy == 0) this.frame = 0;
      
      
      this.x = apad.vx * core.width / 2  + x;
      this.y = apad.vy * core.height / 2  + y;
      // 8フレーム毎に弾を発射する
      if (core.frame % 8 == 0) {
        // 自弾を生成する
        var s = new PlayerBullet(this.x + 12, this.y - 8);
      }
    });
    core.rootScene.addChild(this);
  }
});

// 背景
var Background = enchant.Class.create(enchant.Sprite, {
  initialize: function() {
    enchant.Sprite.call(this, 320, 640);
    this.x = 0;
    this.y = -280;
    this.frame = 0;
    this.image = core.assets['background.png'];
    
    this.addEventListener('enterframe', function() {
      // 背景をy方向
      this.y ++;
      
      if (this.y >= 0) this.y = -280;
    });
    core.rootScene.addChild(this);
  }
});

// 敵
var Enemy = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y, type) {
    enchant.Sprite.call(this, 32, 32);
    this.image = core.assets['spritesheet.png'];
    this.x = x; 
    this.y = y;
    this.vx = 4;      
    this.type = type; 

    this.tick = 0;    
    this.angle = 0;   

    
    this.addEventListener('enterframe', function() {

      
      
      
      if (this.type == 0) {
        this.frame = 15 + core.frame % 3;
        this.y += 3;
      }

      
      if (this.type == 1) {
        this.frame = 22 + core.frame % 3;
        this.y += 6;
      }

      
      if (this.type == 2) {
        this.frame = 25 + core.frame % 4;
        if (this.x < player.x - 64) {
          this.x += this.vx 
        } else if (this.x > player.x + 64) {
          this.x -= this.vx;
        } else {
          this.vx = 0;
          this.y += 8;
        }
      }
      
      
      if (this.y > 280 || this.x > 320 || this.x < -this.width || this.y < -this.height) {
        
        this.remove();
      } else if(this.tick++ % 32 == 0 ) {
      
        if (rand(100) < 50) {
          
          var sx = player.x + player.width / 2 - this.x;
          var sy = player.y + player.height / 2- this.y;
          var angle = Math.atan(sx / sy);
          var s = new EnamyBullet(this.x + this.width / 2, this.y + this.height / 2 ,angle);
        }
      }   
    });
    core.rootScene.addChild(this);
  },
  remove: function() {
    core.rootScene.removeChild(this);
    delete enemies[this.id];
    delete this;
  }
});

// 弾
var Bullet = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y, angle) {
    enchant.Sprite.call(this, 8, 8);
    var image = new Surface(32, 32);
    image.draw(core.assets['spritesheet.png'], 32, 64, 32, 32, 0, 0, 32, 32);
    this.image = image;
    this.x = x;
    this.y = y;
    this.angle = angle; 
    this.speed = 20;    
    
    this.addEventListener('enterframe', function() {
      
      this.x += this.speed * Math.sin(this.angle);
      this.y += this.speed * Math.cos(this.angle);
    
      if (this.y > 320 || this.x > 320 || this.x < -this.width || this.y < -this.height) {
        this.remove();
      }
    });
    core.rootScene.addChild(this);
  },
  remove: function() {
    core.rootScene.removeChild(this);
    delete this;
  }
});

// 自弾
var PlayerBullet = enchant.Class.create(Bullet, {
  initialize: function(x, y) {
    Bullet.call(this, x, y, Math.PI);
    this.frame = 10;
    
    this.addEventListener('enterframe', function() {
      
      for (var i in enemies) {
        
        if (enemies[i].intersect(this)) {
          
          var effect = new Explosion(enemies[i].x - enemies[i].width / 2, enemies[i].y - enemies[i].height / 2);
          
          enemies[i].remove();
          
          core.score += 100;  
        }
      }
    });
  }
});

// 敵弾
var EnamyBullet = enchant.Class.create(Bullet, {
  initialize: function(x, y, angle) {
    Bullet.call(this, x, y, angle);
    this.speed = 4; 
    this.frame = 7;
    
    this.addEventListener('enterframe', function() {
      
      
      if (player.within(this, 8) && core.death == false) {
        
        var effect = new Explosion(player.x - player.width / 2, player.y - player.height / 2);
        core.death = true;
        player.visible = false;
        
        core.life--;
        
        if (core.life == 0 ) core.over = true;
      }
    });
  }
});



var Explosion = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y) {
    enchant.Sprite.call(this, 64, 64);
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.image = core.assets['exp.png'];
    this.tick = 0;      
    
    this.addEventListener('enterframe', function() {
      
      this.frame = this.tick ++;
      if (this.frame == 16) this.remove();
    });
    core.rootScene.addChild(this);
  },
  remove: function() {
    core.rootScene.removeChild(this);
    delete this;
  }
});