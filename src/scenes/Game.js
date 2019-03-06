import phaser, { Scene } from 'phaser';
import Deadpool from '../sprites/Deadpool';
import Enemy from '../sprites/Enemy';

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
        this.physics.world.bounds.width = 3000;
        this.physics.world.bounds.height = 400;
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
        // Add deadpool to the game
        this.deadpool = new Deadpool({
            scene: this,
            x: 500,
            y: 450,
        });
        this.deadpool.setDisplaySize(84, 102);

        this.enemy = new Enemy({
            scene: this,
            x: 800,
            y: 450,
        });
        this.enemy.setDisplaySize(100, 120);

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
        // this.enemy = this.physics.add.sprite(745, 450, 'blonde').enableBody(false, true, true);
        // this.enemy.setDisplaySize(125, 150);
        // this.enemy.setFriction(1, 1);
        // this.enemy.setCollideWorldBounds(true);

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
        this.enemy.update(time, delta);
        this.cameras.main.setScroll(this.deadpool.x-340, 0);
        this.enemy.anims.play('blonde_1_stand_left');

    }
}