window.onload = function () {
	enchant();
	
  game = new Core (320, 480);
  game.fps = 24;
  game.keybind(13,'enter');
    
    game.preload('background.png','sensuikan.png', 
        'sensuikan01.png', 'bullet.png', 
        'clear.png', 'effect0.png','spritesheet.png', 'exp.png', 'start.png');

	game.onload = function () {

    
    var createStartScene = function() {

            var background = new Sprite (320,480);
            background.image = game.assets['background.png'];
            game.rootScene.addChild(background);

            var scene = new Scene();                   
            scene.image = game.assets['background.png']   


            // スタート画像設定
            var startImage = new Sprite(236, 48);
            startImage.image = game.assets['start.png']; 
                 
            // 画像設定
            startImage.x = 38;                         
            startImage.y = 215;                        
            scene.addChild(startImage);                

            // タイトルラベル設定
            var title = new Label('深海脱出ゲーム');   
            title.width = 320;
            title.textAlign = 'center';                 
            title.color = '#ffffff';                   
            title.x = 0;                                
            title.y = 70;                               
            title.font = '44px sans-serif';            
            scene.addChild(title);                     

            
            var info = new Label('STARTを押して開始'); 
            info.width = 320;
            info.textAlign = 'center';                 
            info.color = '#ffffff';                    
            info.x = 0;                                
            info.y = 300;                             
            info.font = '16px sans-serif';             
            scene.addChild(info);     

                   

           
            startImage.addEventListener(Event.TOUCH_START, function(e) {
                
                game.replaceScene(createGameScene());
            });

            
            return scene;
      };

      var createGameScene = function() {

            var scroll = 0; 

            
            var SCROLL_SPEED = 10; 
            var groundline = 250;  

            var scene = new Scene();                    

            // スクロールする背景1
            var bg1 = new Sprite(320, 320);            
            bg1.image = game.assets['background.png']; 
            bg1.x = 0;                                 
            bg1.y = 0;                                 
            scene.addChild(bg1);                       

            // スクロールする背景2
            var bg2 = new Sprite(320, 320);            
            bg2.image = game.assets['background.png']; 
            bg2.x = 0;                               
            bg2.y = 320;                                 
            scene.addChild(bg2);      

            
            // スコア表示用
            var scoreLabel = new Label("地上まで");            
            scoreLabel.color = '#fff';                 
            scene.addChild(scoreLabel);  

                    

            var player = new Sprite(100, 78);
                  player.image = game.assets['sensuikan01.png'];
                  player.x = 150;
                  player.y = 300;
                  player.scaleX = 1;
                  player.scaleY = 1;
                  player.frame = 4;
                  scene.addChild(player);
                  
            var ten = new Sprite(32, 32);
                  ten. image = game.assets['spritesheet.png'];
                  ten.x = 100;
                  ten.y = 100;
                  ten.animeWaitMax = 7;    
                  ten.animeWaitCount = 0;
                  ten.addEventListener('enterframe',function(){
                  if(this.animeWaitCount > this.animeWaitMax){
                    this.animeWaitCount=0;
                    this.frame++;
                  }else{
                    this.animeWaitCount++;
                  }
                });
                  scene.addChild(ten);

            var shot = new Sprite(16,16);
                shot.image=game.assets['bullet.png'];
                shot.x = player.x;
                shot.y = +10000;
                shot.onenterframe=function(){
                    var input = game.input;
                    if(input.enter === true){
                        shot.x = player.x;
                        shot.y = player.y;
                        
                    }    
                    this.y -= 10;
                    if(input.enter === false){

                        return;
                     }   
                    if(shot.y < 0){
                         scene.removeChild(shot);
            
                        
                    }
                };
                scene.addChild(shot);

            var enemyshot = new Sprite(16,16);
                enemyshot.image = game.assets['bullet.png'];
                enemyshot.x = ten.x;
                enemyshot.y = -10000;
                enemyshot.onenterframe=function(){
                    if(enemyshot.y > 320){
                         scene.removeChild(enemyshot);
            
                        
                    }
                };
                scene.addChild(enemyshot);


            var playerend = function(){
                game.pushScene(createGameoverScene(scroll));
            }

            scene.addEventListener(Event.ENTER_FRAME, function(){

                scroll += SCROLL_SPEED;
                scrolla = 3000-scroll;                       
                scoreLabel.text ='地上まで' + scrolla.toString()+'㍍'; 


                if(scroll === 3000){
                    playerend();
                }

                if(scroll%700 === 0){
                    ten.y = 100;
                }



                                           
                var lifeLabel = new LifeLabel(180, 0, 3);
                scene.addChild(lifeLabel);


                // 背景をスクロール
                bg1.y -= SCROLL_SPEED;                
                bg2.y -= SCROLL_SPEED;                
                if (bg1.y <= -320) {                  
                    bg1.y = 320;                      
                }
                if (bg2.y <= -320) {                  
                    bg2.y = 320;                      
                }         
            });
            
         return scene;
        }

          　　　
        var createGameoverScene = function(scroll) {

                                     
            var scene = new Scene();                                   
            scene.backgroundColor = 'rgba(0, 0, 0, 0.5)';              

            
            var gameoverImage = new Sprite(189, 97);                   
            gameoverImage.image = game.assets['clear.png'];  
            gameoverImage.x = 70;                                     
            gameoverImage.y = 50;                                     
            scene.addChild(gameoverImage);                             

            // リトライボタン
            var buttonRetry = new Sprite(320, 32);                     
            var info = new Label('クリックしてもう一度'); 
            info.width = 320;
            info.textAlign = 'center';                 
            info.color = '#ffffff';                    
            info.x = 0;                               
            info.y = 180;                              
            info.font = '16px sans-serif';             
            scene.addChild(info);                      
            buttonRetry.x = 0;                                         
            buttonRetry.y = 180;                                       
                                        

            
            buttonRetry.addEventListener(Event.TOUCH_END, function(){
                game.popScene();                                      
                game.replaceScene(createStartScene());                
            });
            scene.addChild(buttonRetry);
            return scene;

            // スコア表示
            var scoreLabel = new Label(scroll.toString());                        
            scoreLabel.width = 320;                                    
            scoreLabel.textAlign = 'center';                           
            scoreLabel.color = '#ffffff';                              
            scoreLabel.x = 0;                                          
            scoreLabel.y = 12;                                         
            scoreLabel.font = '96px sans-serif';                       
            scene.addChild(scoreLabel);                                

            return scene;

        };


        
        game.replaceScene(createStartScene());
    }
	game.start();
}
