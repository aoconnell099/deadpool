import { Sprite } from 'phaser';
import HealthBar from './HealthBar'
import Bullet from './Bullet';
// import { Math } from 'phaser';

export default class Enemy extends Phaser.GameObjects.Sprite {

    constructor (config) //scene, color, x, y
    {
        super(config.scene, config.x, config.y, 'blonde');
        // Assign the correct scene and set the physics rules
        this.scene = config.scene;
        config.scene.physics.world.enable(this);
        this.setPosition(config.x, config.y);
        this.body.setCollideWorldBounds(true);
        // Create a new healthbar for the enemy
        this.hp = new HealthBar(this.scene, config.x - 30, config.y - 80);

        // Custom elements
        this.health = 100; // Base health for all enemies is 100. Health for specialized is multiplied by whatever seems fit (e.g. this.health * 1.5)
        this.attack = 15; // Attack power -- subject to change
        this.walk = 100; // Base walking speed for enemies
        this.run = 200; // Base running speed for enemies
        this.detectionDistance = 300; // Base detection distance for enemies
        this.stoppingDistance = 100; // Base stopping distance to attack for enemies
        this.alive = true; // Tracks if living for movement and screen removal puropses
        this.damaged = false; // For playing the damaged animation and stopping enemy attack for a moment
        // Movement AI 
        this.playerDetected = false;
        this.canMove = true;
        this.canDecide = true; // used for if he can decide to atttack when he is not injured
        this.moveX = 'none';
        this.moveY = 'none';
        this.direction = 'left';
        this.type = 'blonde_1_';
        this.action;

        // Unnecessary for now
        this.canExclaim = true; // Dont need unless get an exclaim sprite for 
        this.number = config.number; // used to track which number enemy they are

        this.scene.add.existing(this);
    }

    update (time, delta)
    {
        this.hp.setXY(this.x-30, this.y-80);
        // If the enemy's alive, not currently damaged, and is within detection range of the player,
        // then track the player with detectBehavior. Else randomly decide where to move every half 
        // second and call movement
        if (this.alive) {
            this.playerDetected = this.detectPlayer();
            if (!this.damaged) {
              if (this.playerDetected) {
                this.detectBehavior();
              } else {
                //decide where to move
                if (this.canDecide) {
                  this.canDecide = false;
                  this.scene.time.addEvent({ delay: 500, callback: this.resetDecide, callbackScope: this });
                  //let decisionX = Phaser.Math.Between(1,4); // Another way of doing it with provided Phaser math class
                  let decisionX = Math.floor(Math.random() * 4) + 1;

                  if (decisionX === 1 || decisionX === 2) {
                    this.moveX = 'none';
                  } else if (decisionX === 3) {
                    this.moveX = 'left';
                  } else if (decisionX === 4) {
                    this.moveX = 'right';
                  }
                  
                  let decisionY = Math.floor(Math.random() * 4) + 1;

                  if (decisionY === 1 || decisionY === 2) {
                    this.moveY = 'none';
                  } else if (decisionY === 3) {
                    this.moveY = 'up';
                  } else if (decisionY === 4) {
                    this.moveY = 'down';
                  }
                }
              }
              // Move based on above behavior
              this.movement();
            }
      
            // If the enemy is still alive and also currently damaged, check if their health is below 0 and kill them if so
            if (this.health <= 0) {
              this.alive = false;
              this.setTint(0x2a0503);
              this.scene.time.addEvent({ delay: 150, callback: this.stopMoving, callbackScope: this });
              this.scene.time.addEvent({ delay: 1000, callback: this.die, callbackScope: this });
            }
      
        //     //hide if out of bounds
        //     // if (this.x > this.scene.physics.world.bounds.width) {
        //     //   this.setAlpha(0);
        //     // } else if (this.x < 0) {
        //     //   this.setAlpha(0);
        //     // } else if (this.y > this.scene.physics.world.bounds.height) {
        //     //   this.setAlpha(0);
        //     // } else if (this.y < 0) {
        //     //   this.setAlpha(0);
        //     // } else {
        //     //   this.setAlpha(1);
        //     // }
          }
    }

    detectPlayer() 
  {
    this.distanceToPlayerX = Math.abs(this.x - this.scene.deadpool.x);
    this.distanceToPlayerY = Math.abs(this.y - this.scene.deadpool.y);  
    return (this.distanceToPlayerY <= this.detectionDistance) && (this.distanceToPlayerX <= this.detectionDistance) && this.alive && !this.damaged;
  }

  detectBehavior()
  {
    if (this.x > this.scene.deadpool.x) {
      this.moveX = 'left';
      this.direction = 'left';
    } else if (this.x < this.scene.deadpool.x) {
      this.moveX = 'right';
      this.direction = 'right';
    } else {
      this.moveX = 'none';
    }
    if (this.y > this.scene.deadpool.y) {
      this.moveY = 'up';
    } else if (this.y < this.scene.deadpool.y) {
      this.moveY = 'down';
    } else {
      this.moveY = 'none';
    }
  }

  movement()
  {
    this.distanceToPlayerX = Math.abs(this.x - this.scene.deadpool.x);
    this.distanceToPlayerY = Math.abs(this.y - this.scene.deadpool.y);
    let speed;
    if (this.playerDetected) {
      speed = this.run;
    } else {
      speed = this.walk;
    }
    
    if (this.moveX === 'none' || this.distanceToPlayerX <= this.stoppingDistance+10) {
      this.body.setVelocityX(0);
    } else if (this.moveX === 'left') {
      //this.direction = 'left';
      this.body.setVelocityX(-speed);
    } else if (this.moveX === 'right') {
      //this.direction = 'right';
      this.body.setVelocityX(speed);
    }

    if (this.moveY === 'none' || this.distanceToPlayerY <= this.stoppingDistance-25) {
      this.body.setVelocityY(0);
    } else if (this.moveY === 'up') {
      this.body.setVelocityY(-speed);
    } else if (this.moveY === 'down') {
      this.body.setVelocityY(speed);
    }
    let action = null;

    if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0) {
        action = 'walk_';
    } else if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
        action = 'stand_';
    }

    let anim = this.type + action + this.direction;
    this.anims.play(anim, true);
  }

  resetDecide() 
  {
    this.canDecide = true;
  }

  damage(amount, time) 
  {
    //console.log(this.scene.worldBoundsX);
    //console.log(this.scene.physics.world.colliders);
    //let collider = this.scene.physics.world.colliders._active[1];
    if (!this.damaged) {
      this.health -= amount;
      //console.log(this.health);
      this.hp.decrease(amount);
      this.setTint(0x8e2f15);
      this.scene.physics.world.colliders.remove(this.scene.bulletEnemyCollider);
      //this.scene.physics.world.colliders.remove(this.scene.deadpoolEnemyCollider); 
      this.knockback(amount);
      this.damaged = true;
      this.scene.time.addEvent({ delay: time, callback: this.normalize, callbackScope: this });
    }
    else {
      if (this.health > 0) {
        this.scene.time.addEvent({ delay: 150, callback: this.stopMoving, callbackScope: this });
      }
    }
  }

  knockback(amount) // Amount is based off of the damage given (melee does 15, bullets do 5)
  {
    if (!this.damaged) {
      if (this.x > this.scene.deadpool.x) {
        this.body.setVelocityX(amount * 30);
      } else if (this.x < this.scene.deadpool.x) {
        this.body.setVelocityX(-amount * 30); 
      }
      if (this.health > 0) {
        this.scene.time.addEvent({ delay: 150, callback: this.stopMoving, callbackScope: this });
      }
    }
  }
  
  stopMoving()
  {
    this.body.setVelocity(0);
  }

  normalize() //enemyType
  {
    this.scene.physics.world.colliders.add(this.scene.bulletEnemyCollider);
    if (this.alive) {
      //console.log(this.game);
      this.damaged = false;
      // if (enemyType === 'enemy') { leave in for now if needed for different types of enemies
      //   this.scene.physics.world.colliders.add(this.scene.bulletEnemyCollider);
      // }
      //this.scene.physics.world.colliders.add(this.scene.bulletEnemyCollider);
      //this.scene.physics.world.colliders.add(this.scene.deadpoolEnemyCollider); 
      this.setTint(0xffffff);
    }
  }

  die()
  {
    this.hp.destroy();
    this.destroy();
  }

  fire ()
  {
    if (this.alive)
    {
      let targetX = this.scene.deadpool.x - this.x;
      let targetY = this.scene.deadpool.y - this.y;
      let bulletAngle = (this.direction === 'right') ? Phaser.Math.RadToDeg(Math.atan(targetY/targetX)) : Phaser.Math.RadToDeg(Math.atan(targetY/targetX)) + 180;
      //console.log(this.direction);
      let bullet = new Bullet({
        scene: this.scene,
        x: this.x, 
        y: this.y,
        angle: bulletAngle,
        damage: Phaser.Math.Between(2, 8),
        dir: this.direction,
        speed: 500,
        scale: 1
      });
      this.scene.enemyAttack.add(bullet);
      // this.scene.tweens.add({
      //     targets: bullet,
      //     x: targetX,
      //     y: targetY,
      //     ease: 'Linear',
      //     duration: 500,
      //     onComplete: function (tween, targets) {
      //         bullet.destroy();
      //     }
      // });
    }
  }

}