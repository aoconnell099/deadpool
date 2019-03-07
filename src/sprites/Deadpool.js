import { Sprite } from 'phaser';
//Phaser.GameObjects.
export default class Deadpool extends Phaser.GameObjects.Sprite {        
    constructor(config) { 
        console.log('before super');
        super(config.scene, config.x, config.y, 'deadpool', 'stand_right');
        config.scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.scene = config.scene;
        this.setDisplaySize(84, 102);
        
        // Custom elements
        this.health = 100;
        this.canHeal = true;
        this.attacking = false;
        this.meleeAttack = 20;
        this.alive = true;
        this.action = 'stand_';
        this.direction = 'right';
        this.animPrefix = 'dp_';
        this.animSuffix = '';
        this.weapon = 'unarmed_';
        this.weaponIndex = 0;
        this.weapons = [];
        this.weapons.push(this.weapon);
        this.weapons.push('swords_');

        this.keys = {
            jump: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACEBAR),
            //jump2: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
            switchGun: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
            fire: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
            melee: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
            up: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            down: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        };
        this.scene.add.existing(this);     
        this.anims.play('dp_unarmed_stand_right');  
        console.log(this.weapons);
    }

    update(time, delta) {
        
        this.body.setVelocity(0);
        let input = {
            left: this.keys.left.isDown,
            right: this.keys.right.isDown,
            down: this.keys.down.isDown,
            up: this.keys.up.isDown,
            jump: this.keys.jump.isDown,
            switchGun: this.keys.switchGun,
            fire: this.keys.fire.isDown,
            melee: this.keys.melee.isDown
        };
        if (this.canHeal) {
            this.canHeal = false;
            this.scene.time.addEvent({ delay: 1000, callback: this.enableHeal, callbackScope: this }); // 4 second delay between punches
            this.heal();
        }
         if (input.switchGun.isDown) {
            input.switchGun.on('up', (event) => { /* ... */ 
             //console.log(event);
            if (this.weaponIndex === 0 && this.weapons.length === 1) {
                this.weaponIndex = 0;
                this.weapon = this.weapons[this.weaponIndex];
            }
            else if (this.weaponIndex > 0 && this.weaponIndex === this.weapons.length - 1) {
                this.weaponIndex = 0;
                this.weapon = this.weapons[this.weaponIndex];
            }
            else if (this.weaponIndex < (this.weapons.length - 1)) {
                this.weaponIndex++; 
                this.weapon =this.weapons[this.weaponIndex];
            }
            });
        }

        if (input.left)
        {
            this.direction = 'left';
            // Left and up or down plays the left animation. Moving only up or down plays the right animation
            if (input.up)
            {
                this.body.setVelocityY(-360);
                this.body.setVelocityX(-360);
            }
            else if (input.down)
            {
                this.body.setVelocityY(360);
                this.body.setVelocityX(-360);
            }
            else {
                this.body.setVelocityX(-360);
            }
        }
        else if (input.right)
        {
            this.direction = 'right';
            if (input.up)
            {
                this.body.setVelocityY(-360);
                this.body.setVelocityX(360);
            }
            else if (input.down)
            {
                this.body.setVelocityY(360);
                this.body.setVelocityX(360);
            }
            else {
                this.body.setVelocityX(360);

            }
        }
        // Holding up or down plays the right animation
        else if (input.up)
        {
            this.body.setVelocityY(-360);
        }
        else if (input.down)
        {
            this.body.setVelocityY(360);
        }

        if (input.melee && !this.attacking) 
        {
            this.attacking = true;
            this.action = 'attack_';
            this.scene.time.addEvent({ delay: 500, callback: this.disableAttacking, callbackScope: this }); // 4 second delay between punches
        }
        else if ((this.body.velocity.x !== 0 || this.body.velocity.y !== 0) && !this.attacking) {
            this.action = 'run_';
        } else if ((this.body.velocity.x === 0 && this.body.velocity.y === 0) && !this.attacking) {
            this.action = 'stand_';
        }

        let anim = this.animPrefix + this.weapon + this.action + this.direction;
        
        // if (this.anims.currentAnim.key !== anim && !this.scene.physics.world.isPaused) {
        //     this.anims.play(anim);
        // }
        //console.log(anim);
        if (this.action === 'attack_') {
            this.anims.play(anim, true);
            this.scene.time.addEvent({ delay: 500, callback: this.resetAnim, callbackScope: this });
        } else {
        this.anims.play(anim, true);
        }
    }

    heal() 
    {
        if (this.scene.registry.get('health_current') < 100) {
            this.scene.registry.set('health_current', this.scene.registry.get('health_current')+1);
            this.scene.events.emit('healthChange');
        }
    }
    enableHeal() {
        if (!this.canHeal) {
            this.canHeal = true;
        }
    }
    disableAttacking() {
        if (this.attacking) {
            this.attacking = false;
        }
    }
    resetAnim() {
        if ( this.action === 'attack_' ) {
            this.action = 'stand_';
        }
    }
    damage(amount) 
    {
        if (!this.damaged && this.alive) {
        //this.hurtSound.play();
        this.scene.cameras.main.shake(4);
        this.damaged = true;
        let health = this.scene.registry.get('health_current'); //find out the player's current health
        this.scene.registry.set('health_current', health - amount);  //update the player's current health
        this.scene.events.emit('healthChange'); //tell the scene the health has changed so the HUD is updated
        this.setTint(0x8e2f15);
        this.scene.time.addEvent({ delay: 1000, callback: this.normalize, callbackScope: this });
        }
    }
  normalize() 
  {
    if (this.alive) {
      this.damaged = false;
      this.setTint(0xffffff);
    }
  }
}