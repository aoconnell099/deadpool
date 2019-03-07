import Enemy from './Enemy';

export default class Slime extends Enemy {
    constructor(config) {
        super(config);
        this.number;
        this.setTexture('slime_left');
        //this.setFrame('stand1');
        this.type = 'slime_';
        this.body.setSize(32, 40, true);
        this.setDisplaySize(68, 86);
        //this.anims.play('slime_stand_left');
        this.canAttack = true;
    }

    punch()
    {
        console.log('punch');
        this.scene.registry.set('health_current', this.scene.registry.get('health_current')-this.attack);
        
    }

    enablePunch() {
        this.canAttack = true;
    }
    enableMovement() {
        this.canMove = true;
    }
    resetAnim() {
        if ( this.action === 'punch_' ) { // && this.canAttack === false
            this.action = 'stand_';
        }
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
    if(this.canMove) {
        if (this.moveX === 'none' || this.distanceToPlayerX <= this.stoppingDistance+10) {
        this.body.setVelocityX(0);
        } else if (this.moveX === 'left') {
        this.direction = 'left';
        this.body.setVelocityX(-speed);
        } else if (this.moveX === 'right') {
        this.direction = 'right';
        this.body.setVelocityX(speed);
        }

        if (this.moveY === 'none' || this.distanceToPlayerY <= this.stoppingDistance-50) {
        this.body.setVelocityY(0);
        } else if (this.moveY === 'up') {
        this.body.setVelocityY(-speed);
        } else if (this.moveY === 'down') {
        this.body.setVelocityY(speed);
        }
    }
    //let action = null;
    if ((this.distanceToPlayerX <= this.stoppingDistance + 25 && this.distanceToPlayerY <= this.stoppingDistance-50) && this.canAttack) {
        this.action = 'punch_';
        this.canAttack = false;
        this.canMove = false;
        this.body.setVelocity(0);
        this.punch();
        this.scene.time.addEvent({ delay: 5000, callback: this.enablePunch, callbackScope: this });
        this.scene.time.addEvent({ delay: 1600, callback: this.enableMovement, callbackScope: this });
    }
    else if ((this.body.velocity.x !== 0 || this.body.velocity.y !== 0) && this.canMove) {
        this.action = 'walk_';
    } else if ((this.body.velocity.x === 0 && this.body.velocity.y === 0) && this.canMove) {
        this.action = 'stand_';
    }

    let anim = this.type + this.action + this.direction;
    console.log(anim);
    //this.anims.stop();
    if (this.action === 'punch_') {
        this.anims.play(anim, true);
        this.scene.time.addEvent({ delay: 800, callback: this.resetAnim, callbackScope: this });
        //this.on('animationcomplete', this.resetAnim, this);
    } else {
    this.anims.play(anim, true);
    }
    
    
  }
}