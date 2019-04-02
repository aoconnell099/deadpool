import Bullet from './Bullet';

export default class Deadpool extends Phaser.GameObjects.Sprite {        
    constructor(config) { 
        super(config.scene, config.x, config.y, 'deadpool', 'stand_right');
        // Assign the correct scene and set the physics rules
        this.scene = config.scene;
        config.scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.body.setImmovable(true);
        this.setDisplaySize(64, 82);
        
        // Custom elements
        this.health = 100;
        this.speed = 360;
        this.meleeAttack = 20;
        this.shootingAttack = 5;
        this.alive = true;
        this.canMove = true;
        this.canHeal = true;
        this.isAttacking = false;
        this.isShooting = false;
        this.isJumping = false;
        // Movement elements
        this.action = 'stand_';
        this.direction = 'right';
        this.animPrefix = 'dp_';
        this.animSuffix = '';
        // Weapon elements
        // NOTE -- Dont need but leaving in for now in case game design changes to hold more than one weapon
        this.weapon = 'unarmed_';
        this.weaponIndex = 0;
        this.weapons = [];
        this.weapons.push(this.weapon);
        this.weapons.push('swords_');

        // Add the control keys for deadpool
        this.keys = {
            jump: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
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
            this.scene.time.addEvent({ delay: 1000, callback: this.enableHeal, callbackScope: this }); // 1 second delay between heal
            this.heal();
        }
        // Again probably dont need as the need to switch weapons is gone
        if (input.switchGun.isDown) {
            input.switchGun.on('up', (event) => { /* ... */ 
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

        if (this.canMove) {

        if (input.left)
        {
            this.direction = 'left';
            // Left and up or down plays the left animation. Moving only up or down plays the right animation
            if (input.up)
            {
                this.body.setVelocityY(-this.speed);
                this.body.setVelocityX(-this.speed);
            }
            else if (input.down)
            {
                this.body.setVelocityY(this.speed);
                this.body.setVelocityX(-this.speed);
            }
            else {
                this.body.setVelocityX(-this.speed);
            }
        }
        else if (input.right)
        {
            this.direction = 'right';
            if (input.up)
            {
                this.body.setVelocityY(-this.speed);
                this.body.setVelocityX(this.speed);
            }
            else if (input.down)
            {
                this.body.setVelocityY(this.speed);
                this.body.setVelocityX(this.speed);
            }
            else {
                this.body.setVelocityX(this.speed);

            }
        }
        // Holding up or down plays the right animation
        else if (input.up)
        {
            this.body.setVelocityY(-this.speed);
        }
        else if (input.down)
        {
            this.body.setVelocityY(this.speed);
        }

        } //if canMove

        if (input.jump && !this.isJumping) {
            this.isJumping = true;
            console.log('jump');
            this.action = 'jump_';
            this.weapon = 'unarmed_';
            this.scene.time.addEvent({ delay: 800, callback: this.disableJumping, callbackScope: this });
        }

        // First check to see if deadpool is shooting
        else if (input.fire && !this.isShooting && !this.isJumping) {
            this.isShooting = true;
            this.canMove = false;
            // Only need these two lines while using the weapon method of calling the anims
            this.action = 'shoot_';
            this.weapon = 'pistol_';
            // Add the bullet to the game and player Attack group
            let bullet = new Bullet({
                scene: this.scene,
                x: this.x + 32, 
                y: this.y - 17,
                damage: this.shootingAttack,
                dir: this.direction
              });
            this.scene.playerAttack.add(bullet);
            // 1/5 second delay between shots
            this.scene.time.addEvent({ delay: 300, callback: this.enableMove, callbackScope: this });
            this.scene.time.addEvent({ delay: 300, callback: this.disableShooting, callbackScope: this });
        } 
        // Next check for melee attack
        else if (input.melee && !this.isAttacking && !this.isShooting && !this.isJumping)  
        {
            this.isAttacking = true;
            // Only need these two lines while using the weapon method of calling the anims
            // For now use them to set the animation to be played
            // The collider in Game.js checks to see if the player is attacking while colliding and damages the enemy accordingly
            this.action = 'attack_';
            this.weapon = 'swords_';
            // 1/2 second delay between attacks
            this.scene.time.addEvent({ delay: 500, callback: this.disableAttacking, callbackScope: this }); 
        }
        // If not shooting or attacking set the animation to either running if moving or standing if not
        else if ((this.body.velocity.x !== 0 || this.body.velocity.y !== 0) && !this.isAttacking && !this.isShooting && !this.isJumping) {
            this.action = 'run_';
        } else if ((this.body.velocity.x === 0 && this.body.velocity.y === 0) && !this.isAttacking && !this.isShooting && !this.isJumping) {
            this.action = 'stand_';
        }

        let anim = this.animPrefix + this.weapon + this.action + this.direction;
    
        // Animation logic to play the correct animation and revert to standing or running once the attack is finished
        // Check the direction of attack and change the physics box offsets to account for sword swinging
        if (this.action === 'jump_') {
            const targetY = this.y - 30;
            let anims = this.anims;
            //this.anims.play(anim, true);
            // this.scene.tweens.add({
            //     targets: this,
            //     x: this.x,
            //     y: targetY,
            //     ease: 'Linear',
            //     duration: 400,
            //     yoyo: true,
                // onStart: function (tween, targets) {
                //     anims.play(anim, true);
                // },
                // onComplete: function (tween, targets) {
                //     bullet.destroy();
                // }
            // });
            this.scene.tweens.add({
                targets: this,
                x: 700,
                duration: 3000,
                ease: 'Power2',
                yoyo: true,
                delay: 1000
            });
            //this.anims.play(anim, true);
            // Wait 500ms(the duration of the sword swing), then call resetSwords to reset the offset and set the action and weapon to stand and unarmed
            this.scene.time.addEvent({ delay: 800, callback: this.resetJump, callbackScope: this });
        }
        
        else if (this.action === 'attack_') {
            if (this.direction === 'right') {
                this.body.setOffset(75, 0);
            }
            else if (this.direction === 'left') {
                this.body.setOffset(-8, 0);
            }
            this.anims.play(anim, true);
            // Wait 500ms(the duration of the sword swing), then call resetSwords to reset the offset and set the action and weapon to stand and unarmed
            this.scene.time.addEvent({ delay: 500, callback: this.resetSwords, callbackScope: this });
        } else if (this.action === 'shoot_') {
            this.anims.play(anim, true);
            this.body.setVelocity(0);
            // Wait 200ms(the duration of the shot), then call resetShoot to set the action and weapon to stand and unarmed
            this.scene.time.addEvent({ delay: 300, callback: this.resetShoot, callbackScope: this });
        }
        else {
            // Once delayed functions are called the non attacking animations will resume
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
    enableMove() {
        if (!this.canMove) {
            this.canMove = true;
        }
    }
    disableAttacking() {
        if (this.isAttacking) {
            this.isAttacking = false;
        }
    }
    disableShooting() {
        if (this.isShooting) {
            this.isShooting = false;
        }
    }
    disableJumping() {
        if (this.isJumping) {
            this.isJumping = false;
        }
    }
    resetSwords() {
        if (!this.isAttacking) { // Use this instead of this.action === 'attack_' so you can instantly attack again instead of the animation being cut off 1 frame in
            this.body.setOffset(0);
            this.action = 'stand_';
            this.weapon = 'unarmed_'
        }
    }
    resetShoot() {
        if (!this.isShooting) { // Use this instead of this.action === 'attack_' so you can instantly attack again instead of the animation being cut off 1 frame in
            this.action = 'stand_';
            this.weapon = 'unarmed_'
        }
    }
    resetJump() {
        if (!this.isJumping) { // Use this instead of this.action === 'attack_' so you can instantly attack again instead of the animation being cut off 1 frame in
            this.action = 'stand_';
            this.weapon = 'unarmed_'
        }
    }
    damage(amount) 
    {
        if (!this.damaged && this.alive) {
        //this.scene.cameras.main.shake(200, 0.01);
        this.damaged = true;
        let health = this.scene.registry.get('health_current'); // Find out the player's current health
        this.scene.registry.set('health_current', health - amount);  // Update the player's current health
        this.scene.events.emit('healthChange'); // Tell the scene the health has changed so the HealthDisplay is updated
        this.setTint(0x8e2f15);
        // Delay for 1 second before being made vulnerable again
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