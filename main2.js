window.onload = function () {
	enchant();
	
  game = new Core (320, 480);
    
    game.preload('background.png','sensuikan.png', 
        'sensuikan01.png', 'bullet.png', 
        'clear.png', 'effect0.png','spritesheet.png', 'exp.png', 'start.png');

	game.onload = function () {

    
    var createStartScene = function() {

            var background = new Sprite (320,480);
            background.image = game.assets['background.png'];
            game.rootScene.addChild(background);

            var scene = new Scene();                   // 新しいシーンを作る
            scene.image = game.assets['background.png']       // シーンの背景色を設定

            // スタート画像設定
            var startImage = new Sprite(236, 48);
            startImage.image = game.assets['start.png']; 
                 // スプライトを作る
            // 画像を設定
            startImage.x = 38;                         // 横位置調整
            startImage.y = 215;                        // 縦位置調整
            scene.addChild(startImage);                // シーンに追加

            // タイトルラベル設定
            var title = new Label('深海脱出ゲーム');   // ラベルを作る
            title.width = 320;
            title.textAlign = 'center';                // 文字を中央寄せ
            title.color = '#ffffff';                   // 文字を白色に
            title.x = 0;                               // 横位置調整
            title.y = 70;                              // 縦位置調整
            title.font = '44px sans-serif';            // 28pxのゴシック体にする
            scene.addChild(title);                     // シーンに追加

            // 説明ラベル設定
            var info = new Label('STARTを押して開始'); // ラベルを作る
            info.width = 320;
            info.textAlign = 'center';                 // 文字を中央寄せ
            info.color = '#ffffff';                    // 文字を白色に
            info.x = 0;                                // 横位置調整
            info.y = 300;                              // 縦位置調整
            info.font = '16px sans-serif';             // 28pxのゴシック体にする
            scene.addChild(info);                      // シーンに追加

            // スタート画像にタッチイベントを設定
            startImage.addEventListener(Event.TOUCH_START, function(e) {
                // 現在表示しているシーンをゲームシーンに置き換える
                game.replaceScene(createGameScene());
            });

            // タイトルシーンを返します。
            return scene;
      };

      var createGameScene = function() {

            var scroll = 0; // スクロール量を記録する変数

            // 固定の値であることをわかりやすくするために大文字で書いています
            // 固定の値は「定数」と呼ばれ、言語によっては別の書き方をする場合があります
            // JavaScriptにもconstという書き方がありますが、対応していないブラウザがあるため使っていません
            var SCROLL_SPEED = 1; 
            var groundline = 250;  // スクロールの速さ(固定)

            var scene = new Scene();                   // 新しいシーンをつくる
            scene.backgroundColor = '#fff';         // シーンの背景色を設定

            // スクロールする背景1の設定
            var bg1 = new Sprite(320, 480);            // スプライトをつくる
            scene.backgroundColor = '#000053'; // 画像を設定
            bg1.x = 0;                                 // 横位置調整
            bg1.y = 0;                                 // 縦位置調整
            scene.addChild(bg1);                       // シーンに追加

            // スクロールする背景2の設定
            var bg2 = new Sprite(320, 480);            // スプライトをつくる
            bg2.image = game.assets['background.png']; // 画像を設定
            bg2.x = 480;                               // 横位置調整 320px右に配置(bg1の右隣に隙間なく並べる)
            bg2.y = 0;                                 // 縦位置調整
            scene.addChild(bg2);                       // シーンに追加

            // スコア表示用ラベルの設定
            var scoreLabel = new Label("地上まで");            // ラベルをつくる
            scoreLabel.color = '#fff';                 // 白色に設定
            scene.addChild(scoreLabel);  

                    // シーンに追加

            var player = new Sprite(100, 80);
                  player.image = game.assets['sensuikan01.png'];
                  player.x = 150;
                  player.y = 300;
                  player.scaleX = 1;
                  player.scaleY = 1;
                  player.frame = 4;
                  
                  scene.addChild(player);
             
            var PlayerBullet = new Sprite(100,100);
                      PlayerBullet.image = game.assets['bullet.png'];
                      PlayerBullet.x = player.x;
                      PlayerBullet.y = player.y;
                      PlayerBullet.onenterframe = function(){
                      
                       
                      if (this.y < 0) {
                         this.scene.removeChild(this);
                      }
                      this.y -=8;

                     
                      if(PlayerBullet.y > 480){
                         scene.removeChild(PlayerBullet);
                        }
                    };
           scene.addChild(PlayerBullet);

            var ten = new Sprite(32, 32);
            ten. image = game.assets['spritesheet.png'];
            ten.x = 100;
            ten.y = 100;
            scene.addChild(ten);

            var playergoal = function(){
                game.pushScene(createGameoverScene(scroll));
            }

            // 毎フレームイベントをシーンに追加
            scene.addEventListener(Event.ENTER_FRAME, function(){

                scroll += SCROLL_SPEED;
                scrolla = 3000-scroll;                       // 走った距離を記録
                scoreLabel.text ='地上まで' + scrolla.toString()+'㍍'; // スコア表示を更新


                if(scroll === 3000){
                    playergoal();
                }

                if(scroll === 2800){
                    ten.y = 10;
                }

                                           
                var lifeLabel = new LifeLabel(180, 0, 3);
                scene.addChild(lifeLabel);
    
                

               // 敵を格納する配列
                enemies = [];

                if (rand(100) < 5  && game.death == false) {
                  var enemy = new enemy(rand(320), 0, rand(3));
                  enemy.id = game.frame;
                  enemies[enemy.id] = enemy;
                }


            });
            //ゲームシーンを返します
         return scene;
        }

          　　　/*ゴールシーン*/
            var creategoalScene=function(scroll){
                var scene =new Scene();
                scene.backgroundColor='#228b22'


                var goal=new Sprite(320,225);
                goal.image=game.assets['goal.png'];
                goal.x=0;
                goal.y=70;
                scene.addChild(goal);

                var clear=new Sprite(267,48);
                clear.image=game.assets['clear.png'];
                clear.x=30;
                clear.y=260;
                scene.addChild(clear);

                var endlabel=new Label('空気がうまい!');
                endlabel.width=320;
                endlabel.textAlign='center';
                endlabel.color='#eee8aa';
                endlabel.x=0;
                endlabel.y=40;
                endlabel.font='50px sans-serif';
                endlabel.fontWeight='bolder';
                scene.addChild(endlabel);


                return scene;

            }


        /**
        * ゲームオーバーシーン
        *
        * ゲームオーバーシーンを作り、返す関数です。
        */
        var createGameoverScene = function(scroll) {

                                     // シーンに追加
            var scene = new Scene();                                   // 新しいシーンを作る
            scene.backgroundColor = 'rgba(0, 0, 0, 0.5)';              // シーンの背景色を設定

            // ゲームオーバー画像を設定
            var gameoverImage = new Sprite(189, 97);                   // スプライトを作る
            gameoverImage.image = game.assets['end.png'];  // 画像を設定
            gameoverImage.x = 70;                                      // 横位置調整
            gameoverImage.y = 50;                                     // 縦位置調整
            scene.addChild(gameoverImage);                             // シーンに追加

            // リトライボタンを設定
            var buttonRetry = new Sprite(320, 32);                     // スプライトを作る
            var info = new Label('クリックしてもう一度'); // ラベルを作る
            info.width = 320;
            info.textAlign = 'center';                 // 文字を中央寄せ
            info.color = '#ffffff';                    // 文字を白色に
            info.x = 0;                                // 横位置調整
            info.y = 180;                              // 縦位置調整
            info.font = '16px sans-serif';             // 28pxのゴシック体にする
            scene.addChild(info);                      // シーンに追加
            buttonRetry.x = 0;                                         // 横位置調整
            buttonRetry.y = 180;                                       // 縦位置調整
                                          // シーンに追加

            // リトライボタンにタッチイベントを追加する
            buttonRetry.addEventListener(Event.TOUCH_END, function(){
                game.popScene();                                      // このシーンを剥がす（pop）
                game.replaceScene(createStartScene());                // ゲームシーンをタイトルシーンと入れ替える(replace)
            });
            scene.addChild(buttonRetry);
            return scene;

            // スコア表示用ラベルの設定
            var scoreLabel = new Label(scroll.toString());                        // ラベルを作る
            scoreLabel.width = 320;                                    // 幅を設定
            scoreLabel.textAlign = 'center';                           // 文字を中央寄せ
            scoreLabel.color = '#ffffff';                              // 文字を白色に
            scoreLabel.x = 0;                                          // 横位置調整
            scoreLabel.y = 12;                                         // 縦位置調整
            scoreLabel.font = '96px sans-serif';                       // 28pxのゴシック体にする
            scene.addChild(scoreLabel);                                // シーンに追加

            // スコア説明ラベル設定
            var scoreInfoLabel = new Label('㍍走り抜いた');            // ラベルを作る
            scoreInfoLabel.width = 320;                                // 幅を設定
            scoreInfoLabel.textAlign = 'center';                       // 文字を中央寄せ
            scoreInfoLabel.color = '#ffffff';                          // 文字を白色に
            scoreInfoLabel.x = 0;                                      // 横位置調整
            scoreInfoLabel.y = 330;                                    // 縦位置調整
            scoreInfoLabel.font = '32px sans-serif';                   // 28pxのゴシック体にする
            scene.addChild(scoreInfoLabel);   

            
            // ゲームオーバーシーンを返します。
            return scene;

        };


        // ゲームの_rootSceneをスタートシーンに置き換える
        game.replaceScene(createStartScene());
    }
	game.start();
}
