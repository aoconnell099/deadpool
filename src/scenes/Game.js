import phaser, { Scene } from 'phaser';
import Deadpool from '../sprites/Deadpool';
import Enemy from '../sprites/Enemy';
import Slime from '../sprites/Slime';
import Shooter from '../sprites/Shooter';

//TODO: clean up imports

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
    //     this.deadpool = null;
    //     this.background = null;
    //     this.foreground = null;
    }

    create () {
        // NOTE -- Using the Scene Data Plugin we can store data on a Scene level using this.data. Might be better than using the register in certain cases
        // Background tileSprite of the city skyline and the foreground tileSprite of the highway
        //this.background = this.add.tileSprite(1600, 300, 3200, 1024, 'city').setDisplaySize(3200, 600);
        //this.foreground = this.add.tileSprite(1600, 300, 3200, 1024, 'road').setDisplaySize(3200, 600);
        this.background = this.add.tileSprite((this.game.config.width * 10) / 2, this.game.config.height / 2, this.game.config.width * 10, 1024, 'city').setDisplaySize(this.game.config.width * 10, this.game.config.height);
        this.foreground = this.add.tileSprite((this.game.config.width * 10) / 2, this.game.config.height / 2, this.game.config.width * 10, 1024, 'road').setDisplaySize(this.game.config.width * 10, this.game.config.height);
        // Set the bounds to be the upper railing and the bottom of the road
        console.log((51/100) * this.game.config.height);
        this.worldBoundsX = this.game.config.width * 10;
        this.worldBoundsY = Math.floor((51/100) * this.game.config.height);
        this.physics.world.setBounds(350, Math.floor((44/100) * this.game.config.height), (this.game.config.width * 10) - 350, this.game.config.height - Math.floor((44/100) * this.game.config.height));       

        // Create groups to hold a current list of enemies, enemyAttacks(bullets, etc.) , and playerAttacks(bullets)
        // Set running the child updates on them to true so that each element of the groups run their update methods
        this.enemies = this.add.group();
        this.enemies.runChildUpdate = true;
        this.enemyAttack = this.add.group();
        this.enemyAttack.runChildUpdate = true;
        this.playerAttack = this.add.group();
        this.playerAttack.runChildUpdate = true;

        

        // Add deadpool to the game
        this.deadpool = new Deadpool({
            scene: this,
            x: 500,
            y: Math.floor((44/100) * this.game.config.height) + 100,
        });
        // For now use this for loop method to add enemies to the game
        // Create 5 new slime people at a random x and y within the world bounds and add them to the enemies group
        let i;
        for (i=0; i<5; i++) {
            let spawnX = Phaser.Math.Between(1200, this.game.config.width * 10);
            let spawnY = Phaser.Math.Between(Math.floor((55/100) * this.game.config.height), this.game.config.height);
            
            let slime = new Slime({
                scene: this,
                x: spawnX,
                y: spawnY,
            });
            this.enemies.add(slime);
        }
        // Do the same for shooters
        for (i=0; i<5; i++) {
            let spawnX = Phaser.Math.Between(1200, this.game.config.width * 10);
            let spawnY = Phaser.Math.Between(Math.floor((55/100) * this.game.config.height), this.game.config.height);
            
            let shooter = new Shooter({
                scene: this,
                x: spawnX,
                y: spawnY,
            });
            this.enemies.add(shooter);
        }
        // Add the colliders 
        this.deadpoolEnemyCollider = this.physics.add.collider(this.deadpool, this.enemies, this.playerEnemy);
        this.bulletEnemyCollider = this.physics.add.collider(this.playerAttack, this.enemies, this.bulletEnemy);
        this.bulletDeadpoolCollider = this.physics.add.collider(this.deadpool, this.enemyAttack, this.bulletPlayer);

        
        this.cameras.main.zoom = 1.0;
        this.cameras.main.fadeIn(3000, 0, 0, 0);
        //console.log(this.global12);
        this.events.on('resize', this.resize, this);
        window.addEventListener('resize', function (event) {
            console.log('window resized window listener')
            this.resize(window.innerWidth, window.innerHeight);
        
        }, false);
        //console.log(this.scene);
        this.scene.get('healthDisplay').scene.setActive(true);//.setActive(true);
        console.log(this.healthText);
        //this.healthText.scene.run('healthDisplay');
        //this.game.scene.getScene('healthDisplay').setActive(true, 'healthDisplay');

    }
    update (time, delta) {
        // Manually update deadpool because he is not in a group
        // NOTE -- Can probably change his update method to preUpdate so you don't have to call update manually
        this.deadpool.update(time, delta);
        // Set the camera a little bit behind deadpool so you can see whats in front of you
        // NOTE -- Can probably do this.cameras.startFollow(this.deadpool) or something like that in create after creating deadpool
        // to achieve the same effect
        this.cameras.main.setScroll(this.deadpool.x-340, 0);    

    }
    
    playerEnemy(player, enemy)
    {   // Enemy.damage() takes care of checking if the enemy is currently in a damaged state
        if (player.alive && player.isAttacking){
          enemy.damage(player.meleeAttack, 500);
        }
        else {
            // Stops the enemy from sliding across the level when you run into them
            enemy.body.setVelocity(0);
        }
    }

    bulletEnemy(bullet, enemy)
    {
        //this.physics.world.removeCollider(bulletEnemyCollider);
        // Stops the enemy from sliding from impact of bullet
        enemy.body.setVelocity(0);
        // All enemyCollide does is call enemy.damage(same as above) which damages the enemy for the amount of bullet damage and destroys the bullet
        bullet.enemyCollide(enemy);
    }
    // Can add an if statement to bulletEnemy checking if enemy is deadpool and it would eliminate the need for this function
    // TODO: implement changes above
    bulletPlayer(player, bullet) 
    {
        bullet.enemyCollide(player);
    }  

    resize (width, height)
    {
        if (width === undefined) { width = this.sys.game.config.width; }
        if (height === undefined) { height = this.sys.game.config.height; }

        this.cameras.resize(width, height);

        this.background.setSize(width, height).setDisplaySize(width * 10, height);
        this.foreground.setSize(width, height).setDisplaySize(width * 10, height);
    }
    
}