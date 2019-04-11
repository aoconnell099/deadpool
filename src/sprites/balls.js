window.onload = function () 
{ var game = new Phaser.Game(800, 
    600, 
    Phaser.AUTO, 
    'phaser-example', 
    { preload: preload, create: create, update: update });
     var image; 
     function preload() 
     { game.load.spritesheet('player', 'assets/metalslug_mummy37x45.png', 37, 45, 18); } 
     var cursors; 
     var player; 
     var animationRunning = false; function create() 
     { 
        player = game.add.sprite(300, 200, 'player'); 
        cursors = game.input.keyboard.createCursorKeys(); 
        player.animations.add('walk'); 
        animationRunning = false; 
        player.anchor.setTo(0.5, 0.5); 
    } 
    function theEnd(item) 
    { player.animations.stop('walk', true); 
    console.log("END"); 
    animationRunning = false; 
} 
function update() 
{ if (cursors.left.isDown && animationRunning === false) 
    { tweenLeft = game.add.tween(player).to({ x: player.x - 50 }, 900, Phaser.Easing.Linear.None, true);
     player.scale.setTo(-1, 1); 
     animationRunning = true; 
     tweenLeft.onComplete.addOnce(theEnd, this); 
     player.animations.play('walk', 20, true); }
      else if (cursors.right.isDown && animationRunning === false) 
      { tweenRight = game.add.tween(player).to({ x: player.x + 50 }, 900, Phaser.Easing.Linear.None, true); 
      player.scale.setTo(1, 1); 
      animationRunning = true; 
      player.animations.play('walk', 20, true); 
      tweenRight.onComplete.addOnce(theEnd, this); 
    } 
} 
};