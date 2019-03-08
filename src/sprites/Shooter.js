import Enemy from './Enemy';
import Bullet from './Bullet';

export default class Shooter extends Enemy {
    constructor(config) {
        super(config);
        this.number;
        this.anims.play('blonde_1_stand_left');
        this.type = 'blonde_1_';
        this.detectionDistance = 600;
        this.stoppingDistance = 350;
        this.setDisplaySize(84, 102);
        this.canFire = true;
    }

    enableMovement() {
        this.canMove = true;
    }
    enableFiring() {
        this.canFire = true;
    }
    resetAnim() {
        if ( this.action === 'punch_' ) {
            this.action = 'stand_';
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
    if(this.canMove) {
        if (this.moveX === 'none' || this.distanceToPlayerX <= this.stoppingDistance) {
        this.body.setVelocityX(0);
        } else if (this.moveX === 'left') {
        this.direction = 'left';
        this.body.setVelocityX(-speed);
        } else if (this.moveX === 'right') {
        this.direction = 'right';
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
    
    if ((this.distanceToPlayerX <= this.stoppingDistance && this.distanceToPlayerY <= this.stoppingDistance-100) && this.canFire) {
        this.canFire = false;
        this.scene.time.addEvent({ delay: 1000, callback: this.enableFiring, callbackScope: this });
        this.fire();
        
    }

    // While using this sprite no animations can be played so logic isnt needed

    // else if ((this.body.velocity.x !== 0 || this.body.velocity.y !== 0) && this.canMove) {
    //     this.action = 'walk_';
    // } else if ((this.body.velocity.x === 0 && this.body.velocity.y === 0) && this.canMove) {
    //     this.action = 'stand_';
    // }

    // let anim = this.type + this.action + this.direction;
    // // If the action is punch, then play the punch animation and change the animation back to stand after 800ms(the length of the animation)
    // // Else play anim
    // if (this.action === 'punch_') {
    //     this.anims.play(anim, true);
    //     this.scene.time.addEvent({ delay: 800, callback: this.resetAnim, callbackScope: this });
    // } else {
    // this.anims.play(anim, true);
    // }
    
    
  }

}