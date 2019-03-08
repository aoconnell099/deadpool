import phaser, { Scene } from 'phaser';
import Deadpool from '../sprites/Deadpool';
import Enemy from '../sprites/Enemy';
import Slime from '../sprites/Slime';
import Shooter from '../sprites/Shooter';

export class Game extends Scene {
    constructor () {
        super({
            key: 'game',
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false
                }
            }
        })
        // Probably dont need 
        this.deadpool = null;
        this.background = null;
        this.foreground = null;
    }

    create () {
        //  Background tileSprite of the city skyline and the foreground tileSprite of the highway
        this.background = this.add.tileSprite(1600, 300, 3200, 1024, 'city').setDisplaySize(3200, 600);
        this.foreground = this.add.tileSprite(1600, 300, 3200, 1024, 'road').setDisplaySize(3200, 600);
        this.physics.world.setBounds(300, 220, 2900, 380);       
        console.log(this.registry.get('health_current'));
        // // Using the Scene Data Plugin we can store data on a Scene level
        // this.data.set('lives', 3);
        // this.data.set('level', 5);
        // this.data.set('score', 2000);
    
        // let text = this.add.text(100, 100, '', { font: '64px Courier', fill: '#00ff00' });
    
        // text.setText([
        //     'Level: ' + this.data.get('level'),
        //     'Lives: ' + this.data.get('lives'),
        //     'Score: ' + this.data.get('score')
        // ]);
        //this.scene.launch('HUD'); //launch HUD

        this.enemies = this.add.group();
        this.enemies.runChildUpdate = true;
        this.enemyAttack = this.add.group();
        this.enemyAttack.runChildUpdate = true;

        // Add deadpool to the game
        this.deadpool = new Deadpool({
            scene: this,
            x: 500,
            y: 450,
        });
        this.playerAttack = this.add.group(); //create attack group to hold player's fireballs
        this.playerAttack.runChildUpdate = true;
        //this.deadpool.setDisplaySize(24, 32);//84, 102

        // this.enemy = new Enemy({
        //     scene: this,
        //     x: 800,
        //     y: 450,
        // });
        // this.enemy.setDisplaySize(100, 120);
        let i;
        for (i=0; i<5; i++) {
            let spawnX = Phaser.Math.Between(900,2000);
            let spawnY = Phaser.Math.Between(300,750);
            console.log('spawnX');
            console.log(spawnX);
            console.log('spawnY');
            console.log(spawnY);
            let slime = new Slime({
                scene: this,
                x: spawnX,
                y: spawnY,
            });
            this.enemies.add(slime);
        }
        for (i=0; i<5; i++) {
            let spawnX = Phaser.Math.Between(900,2000);
            let spawnY = Phaser.Math.Between(300,750);
            console.log('spawnX');
            console.log(spawnX);
            console.log('spawnY');
            console.log(spawnY);
            let shooter = new Shooter({
                scene: this,
                x: spawnX,
                y: spawnY,
            });
            this.enemies.add(shooter);
        }
        //this.slime.setSize(84, 102, true);
        //this.slime.setDisplaySize(84, 102);

        // this.enemy2 = this.physics.add.sprite(745, 450, 'slime_left').enableBody(false, true, true);
        // this.enemy2.setDisplaySize(84, 102);
        // this.enemy2.anims.play('slime_stand_left');
        // this.enemy2.setFriction(1, 1);
        // this.enemy2.setCollideWorldBounds(true);

        this.physics.add.collider(this.deadpool, this.enemies, this.playerEnemy);
        this.physics.add.collider(this.playerAttack, this.enemies, this.bulletEnemy);
        this.physics.add.collider(this.deadpool, this.enemyAttack, this.bulletPlayer);

        //check the registry to see if the enemy has already been killed. If not create the enemy in the level and register it with the game
        // regName = `${level}_Enemies_${enemyNum}`;
        // if (this.registry.get(regName) !== 'dead') {
        //   let enemy = new Enemy({
        //   scene: this,
        //   x: object.x + 8, 
        //   y: object.y - 8,
        //   number: enemyNum
        //   });
        //   this.enemies.add(enemy);
        //   this.registry.set(regName, 'active');
        // }
        // enemyNum += 1;
        
        // this.spawnpoints = [];  //create an array to hold the spawnpoints populated by converObjects()
        //set up groups, tell group to run updates on its children, then call the object conversion method
        // this.enemies = this.add.group();
        // this.enemies.runChildUpdate = true;
        // this.enemyAttack = this.add.group();
        // this.enemyAttack.runChildUpdate = true;
        // this.pickups = this.add.group();
        //this.convertObjects();
        // Leave for now -- will eventually be enemy class
         

        // // Add the static square bg first at 0,0 position
        // this.staticBg = this.add.image(0, 0, 'bg-static')
        // // Apply a grey tint to it
        // this.staticBg.setTint(0x444444)
        // this.staticBg.setOrigin(0.5)
        // // Add a tilesprite so the striped image(396x529) can be scrolled indefinitely
        // this.scrollingBg = this.add.tileSprite(0,0,396,529,'bg-overlay')
        // this.scrollingBg.setOrigin(0.5)
        // We can add multiple cameras in a Phaser 3 scene
        // This is how we get the main camera
        //let cam = this.cameras.main;
        // Set its viewport as same as our game dimension
        //cam.setViewport(0,0,800,600);
        // Center align the camera to occupy all our game objects\
        this.cameras.main.zoom = 1.0;

    }
    update (time, delta) {
        this.deadpool.update(time, delta);
        //this.enemy.update(time, delta);
        //this.slime.update(time, delta);
        this.cameras.main.setScroll(this.deadpool.x-340, 0);
        //this.enemy2.setVelocity(0);
        

    }
    
    playerEnemy(player, enemy)
    {    
        if (player.alive && player.attacking){
          enemy.damage(player.meleeAttack);
          //enemy.body.setVelocity(50);
          //this.time.addEvent({ delay: 500, callback: () => {enemy.body.setVelocity(0);}, callbackScope: this });
        }
        else {
            enemy.body.setVelocity(0);
        }
    }

    bulletEnemy(bullet, enemy)
    {
        enemy.body.setVelocity(0);
        bullet.enemyCollide(enemy);
    }
    // Dont really need secon function but for readability left in
    bulletPlayer(player, bullet) 
    {
        //enemy.body.setVelocity(0);
        bullet.enemyCollide(player);
    }  
    
}