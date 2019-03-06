import { Sprite } from 'phaser';
import HealthBar from './HealthBar'
// import { Math } from 'phaser';

export default class Enemy extends Phaser.GameObjects.Sprite {

    constructor (config) //scene, color, x, y
    {
        super(config.scene, config.x, config.y, 'blonde');
        config.scene.physics.world.enable(this);
        this.scene = config.scene;
        //this.color = config.color;
        //this.setTexture('elves');
        this.setPosition(config.x, config.y);
        //this.play(this.color + 'Idle');
        this.scene.add.existing(this);
        this.anims.play('blonde_1_stand_left');
        //this.on('animationcomplete', this.animComplete, this);
        this.alive = true;
        //var hx = (this.color === 'blue') ? 110 : -40;
        //var hx = 110;
        this.hp = new HealthBar(this.scene, config.x - 30, config.y - 80);
        //this.timer = scene.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: this.fire, callbackScope: this });
        
        // Enemy config from phaser tilemap pack
        this.number = config.number;
        this.body.setDrag(8, 8);
        this.body.setBounce(.5, .5);
        this.health = 100;
        this.alive = true;
        this.attack = 15;
        this.damaged = false;
        this.canExclaim = true;
        // this.exclaimSound = this.scene.sound.add('enemyExclaim');
        // this.exclaimSound.setVolume(.2);
        // this.exclamation = this.scene.add.image(this.x, this.y - 10, 'atlas', 'exclamation');
        //this.exclamation.alpha = 0;
        this.playerDetected = false;
        this.detectionDistance = 400;
        this.stoppingDistance = 85;
        this.canDecide = true;
        this.moveX = 'none';
        this.moveY = 'none';
        this.walk = 100;
        this.run = 200;
        // this.deathSound = this.scene.sound.add('enemyDeathSFX');
        // this.deathSound.setVolume(.4);
        // this.dropSound = this.scene.sound.add('itemDropSFX');
        // this.dropSound.setVolume(.2);
        // this.scene.add.existing(this);
    }

    update (time, delta)
    {
        //super.preUpdate(time, delta);
        //this.body.setVelocity(90, 0);
        this.hp.setXY(this.x-30, this.y-80);
 
        if (this.alive) {
            //this.exclamation.setPosition(this.x, this.y - 12);
            this.playerDetected = this.detectPlayer();
            //console.log(this.playerDected);
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
                  //let decisionX = Phaser.Math.RND.integerInRange(1,4);
                  let decisionX = Math.floor(Math.random() * 4) + 1;
                  console.log(decisionX);
                  if (decisionX === 1 || decisionX === 2) {
                    this.moveX = 'none';
                  } else if (decisionX === 3) {
                    this.moveX = 'left';
                  } else if (decisionX === 4) {
                    this.moveX = 'right';
                  }
                  //let decisionY = Phaser.Math.RND.integerInRange(1,4);
                  let decisionY = Math.floor(Math.random() * 4) + 1;
                  console.log(decisionY);
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
      
        //     // //kill this dude!
        //     // if (this.health <= 0) {
        //     //   this.deathSound.play();
        //     //   this.alive = false;
        //     //   this.setTint(0x2a0503);
        //     //   this.scene.time.addEvent({ delay: 1000, callback: this.die, callbackScope: this });
        //     // }
      
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
    // console.log(this.distanceToPlayerX);
    // console.log(this.distanceToPlayerY);
    // console.log((this.distanceToPlayerY <= this.detectionDistance));
    // console.log((this.distanceToPlayerX <= this.detectionDistance));
    // console.log(this.alive);
    // console.log(!this.damaged);
    
    return ((this.distanceToPlayerY <= this.detectionDistance) &&  (this.distanceToPlayerX <= this.detectionDistance) && this.alive && !this.damaged);//this.scene.deadpool.alive && !this.scene.deadpool.damaged;
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
    if (this.moveX === 'none' || this.distanceToPlayerX <= this.stoppingDistance) {
      this.body.setVelocityX(0);
    } else if (this.moveX === 'left') {
      this.body.setVelocityX(-speed);
    } else if (this.moveX === 'right') {
      this.body.setVelocityX(speed);
    }

    if (this.moveY === 'none' || this.distanceToPlayerY <= this.stoppingDistance) {
      this.body.setVelocityY(0);
    } else if (this.moveY === 'up') {
      this.body.setVelocityY(-speed);
    } else if (this.moveY === 'down') {
      this.body.setVelocityY(speed);
    }
  }

  resetDecide() 
  {
    this.canDecide = true;
  }

  damage(amount) 
  {
    if (!this.damaged) {
      this.health -= amount;
      this.damaged = true;
      this.setTint(0x8e2f15);
      this.scene.time.addEvent({ delay: 1000, callback: this.normalize, callbackScope: this });
    }
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
    this.deathRegister();
    this.exclamation.destroy();
    //this.dropLoot();
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