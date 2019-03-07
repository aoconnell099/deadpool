import { Sprite } from 'phaser';
import HealthBar from './HealthBar'
// import { Math } from 'phaser';

export default class Enemy extends Phaser.GameObjects.Sprite {

    constructor (config) //scene, color, x, y
    {
        super(config.scene, config.x, config.y, 'blonde');
        config.scene.physics.world.enable(this);
        this.scene = config.scene;
        this.setPosition(config.x, config.y);
        this.scene.add.existing(this);
        //this.anims.play('blonde_1_stand_left'); // can probably remove soon once more enemies are added
        this.hp = new HealthBar(this.scene, config.x - 30, config.y - 80);

        this.direction = 'left';
        this.type = 'blonde_1_';
        this.action;
        // Enemy config from phaser tilemap pack
        this.number = config.number; // used to track which number enemy they are
        this.body.setDrag(8, 8); // Dont need for now
        this.body.setBounce(.5, .5); // Dont need for now
        this.body.setCollideWorldBounds(true);
        this.health = 100; // Base health for all enemies is 100. Health for specialized is multiplied by whatever seems fit (e.g. this.health * 1.5)
        this.alive = true; // Tracks if living for movement and screen removal puropses
        this.attack = 15; // Attack power -- subject to change
        this.damaged = false; // For playing the damaged animation and stopping enemy attack for a moment
        this.canExclaim = true; // Dont need unless get an exclaim sprite for 
        this.playerDetected = false;
        this.detectionDistance = 300;
        this.stoppingDistance = 100;
        this.canMove = true;
        this.canDecide = true; // used for if he can decide to atttack when he is not injured
        this.moveX = 'none';
        this.moveY = 'none';
        this.walk = 100;
        this.run = 200;

        // Mostly unnecessary but dont want to get rid of yet

        // this.exclaimSound = this.scene.sound.add('enemyExclaim');
        // this.exclaimSound.setVolume(.2);
        // this.exclamation = this.scene.add.image(this.x, this.y - 10, 'atlas', 'exclamation');
        // this.exclamation.alpha = 0;
        // this.deathSound = this.scene.sound.add('enemyDeathSFX');
        // this.deathSound.setVolume(.4);
        // this.dropSound = this.scene.sound.add('itemDropSFX');
        // this.dropSound.setVolume(.2);
        // this.scene.add.existing(this);

        //this.on('animationcomplete', this.animComplete, this);
        //this.play(this.color + 'Idle');
        //var hx = (this.color === 'blue') ? 110 : -40;
        //var hx = 110;
        //this.timer = scene.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: this.fire, callbackScope: this });
        //this.color = config.color;
        //this.setTexture('elves');
    }

    update (time, delta)
    {
        //super.preUpdate(time, delta);
        //this.body.setVelocity(90, 0);
        this.hp.setXY(this.x-30, this.y-80);
 
        if (this.alive) {
            //this.exclamation.setPosition(this.x, this.y - 12);
            this.playerDetected = this.detectPlayer();
            if (!this.damaged) {
              if (this.playerDetected) {
                // if (this.canExclaim) {
                //   this.canExclaim = false;
                //   //this.exclaimSound.play();
                //   //this.exclamation.alpha = 1;
                //   //this.scene.time.addEvent({ delay: 500, callback: this.hideExclaim, callbackScope: this });
                // }
                //call the player detected behavior
                this.detectBehavior();
              } else {
                // if (!this.canExclaim){
                //   this.canExclaim = true;
                // }
                //decide where to move
                if (this.canDecide) {
                  this.canDecide = false;
                  this.scene.time.addEvent({ delay: 500, callback: this.resetDecide, callbackScope: this });
                  //let decisionX = Phaser.Math.Between(1,4); //broken in current version of phaser
                  let decisionX = Math.floor(Math.random() * 4) + 1;
                  //console.log(decisionX);
                  if (decisionX === 1 || decisionX === 2) {
                    this.moveX = 'none';
                  } else if (decisionX === 3) {
                    this.moveX = 'left';
                  } else if (decisionX === 4) {
                    this.moveX = 'right';
                  }
                  //let decisionY = Phaser.Math.Between(1,4);  //broken in current version of phaser
                  //console.log(decisionY);
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
      
              //move based on above behavior
              this.movement();
            }
      
            //kill this dude!
            if (this.health <= 0) {
              //this.deathSound.play();
              this.alive = false;
              this.setTint(0x2a0503);
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
    } else if (this.x < this.scene.deadpool.x) {
      this.moveX = 'right';
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
      this.direction = 'left';
      this.body.setVelocityX(-speed);
    } else if (this.moveX === 'right') {
      this.direction = 'right';
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

  damage(amount) 
  {
    if (!this.damaged) {
      this.health -= amount;
      this.hp.decrease(amount);
      this.damaged = true;
      this.setTint(0x8e2f15);
      this.knockback();
      this.scene.time.addEvent({ delay: 1000, callback: this.normalize, callbackScope: this });
    }
  }

  knockback()
  {
    if (this.x > this.scene.deadpool.x) {
      this.body.setVelocityX(600);
    } else if (this.x < this.scene.deadpool.x) {
      this.body.setVelocityX(-600);
    }
    this.scene.time.addEvent({ delay: 200, callback: this.stopMoving, callbackScope: this });
  }

  stopMoving()
  {
    this.body.setVelocity(0);
  }

  normalize() 
  {
    this.damaged = false;
    this.setTint(0xffffff);
  }

  hideExclaim() 
  {
    this.exclamation.alpha = 0;
  }

  die()
  {
    //this.deathRegister();
    //this.exclamation.destroy();
    //this.dropLoot();
    this.hp.destroy();
    this.destroy();
  }

  deathRegister()
  {
    this.scene.registry.set(`${this.scene.registry.get('load')}_Enemies_${this.number}`, 'dead'); //register this enemy as dead so it is not added to future instances of this level.
  }

  dropLoot() 
  {
    let decision = Phaser.Math.RND.integerInRange(1, 20);
    if (decision === 1 ) {
      let heart = new Heart({
        scene: this.scene,
        x: this.x, 
        y: this.y,
        number: 0
      });
      this.scene.pickups.add(heart);
      this.dropSound.play();
    }  else if (decision === 2 ) {
      let jug = new Jug({
        scene: this.scene,
        x: this.x, 
        y: this.y,
        number: 0
      });
      this.scene.pickups.add(jug);
      this.dropSound.play();
    } else if (decision > 2 && decision <= 6) {
      let potion = new Potion({
        scene: this.scene,
        x: this.x, 
        y: this.y,
        number: 0
      });
      this.scene.pickups.add(potion);
      this.dropSound.play();
    } else if (decision > 6 && decision <= 10) {
      let meat = new Meat({
        scene: this.scene,
        x: this.x, 
        y: this.y,
        number: 0
      });
      this.scene.pickups.add(meat);
      this.dropSound.play();
    }
  }

    animComplete (animation)
    {
        // if (animation.key === this.color + 'Attack')
        // {
        //     this.play(this.color + 'Idle');
        // }
    }

    // damage (amount)
    // {
    //     if (this.hp.decrease(amount))
    //     {
    //         this.alive = false;

    //         // this.play(this.color + 'Dead');

    //         // (this.color === 'blue') ? bluesAlive-- : greensAlive--;
    //     }
    // }

    fire ()
    {
        var target = (this.color === 'blue') ? getGreen() : getBlue();

        if (target && this.alive)
        {
            this.play(this.color + 'Attack');

            var offset = (this.color === 'blue') ? 20 : -20;
            var targetX = (this.color === 'blue') ? target.x + 30 : target.x - 30;

            this.missile.setPosition(this.x + offset, this.y + 20).setVisible(true);

            this.scene.tweens.add({
                targets: this.missile,
                x: targetX,
                ease: 'Linear',
                duration: 500,
                onComplete: function (tween, targets) {
                    targets[0].setVisible(false);
                }
            });

            target.damage(Phaser.Math.Between(2, 8));

            this.timer = this.scene.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: this.fire, callbackScope: this });
        }
    }

}