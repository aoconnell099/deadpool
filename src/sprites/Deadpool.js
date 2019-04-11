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
        //this.isShooting = false;
        this.pistol = false;
        this.shotgun = false;
        this.ak = false;
        this.sniper = false;
        this.minigun = false;
        this.grenade = false;
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
        this.weapons = [ 'unarmed_', 'swords_', 'pistol_', 'shotgun_', 'sniper_', 'ak_', 'mg_', 'gren_' ];

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
            down: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            shotgun: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            ak: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            sniper: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            minigun: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R),
            grenade: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T),
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
            melee: this.keys.melee.isDown,
            shotgun: this.keys.shotgun.isDown,
            ak: this.keys.ak.isDown,
            sniper: this.keys.sniper.isDown,
            minigun: this.keys.minigun.isDown,
            grenade: this.keys.grenade.isDown
        };
        let isShooting = (this.pistol || this.shotgun || this.ak || this.sniper || this.minigun || this.grenade);
        //console.log(isShooting);
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
            //console.log('jump');
            this.action = 'jump_';
            this.weapon = 'unarmed_';
            this.scene.time.addEvent({ delay: 800, callback: this.disableJumping, callbackScope: this });
        }

        // First check to see if deadpool is shooting
        else if ((input.fire || input.shotgun || input.sniper || input.ak || input.minigun || input.grenade) 
                && !(isShooting) && !this.isJumping) {    //(this.pistol.isShooting && this.shotgun.isShooting && this.ak.isShooting && this.sniper.isShooting && this.minigun.isShooting && this.grenade.isShooting) 
            if (input.fire) {
                this.scene.time.addEvent({ callback: this.pistolShoot, callbackScope: this, args: ['pistol'] });
            }
            else if (input.shotgun) {
                this.scene.time.addEvent({ callback: this.shotgunShoot, callbackScope: this, args: ['shotgun'] });
            }
            else if (input.ak) {
                this.scene.time.addEvent({ callback: this.akShoot, callbackScope: this, args: ['ak'] });
            }
            else if (input.sniper) {
                this.scene.time.addEvent({ callback: this.sniperShoot, callbackScope: this, args: ['sniper'] });
            }
            else if (input.minigun) {
                this.scene.time.addEvent({ callback: this.minigunShoot, callbackScope: this, args: ['minigun'] });
            }
            else if (input.grenade) {
                this.scene.time.addEvent({ callback: this.grenadeShoot, callbackScope: this, args: ['grenade'] });
            }
        } 
        // Next check for melee attack
        else if (input.melee && !this.isAttacking && !isShooting && !this.isJumping)  
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
        else if ((this.body.velocity.x !== 0 || this.body.velocity.y !== 0) && !this.isAttacking && !isShooting && !this.isJumping) {
            this.action = 'run_';
        } else if ((this.body.velocity.x === 0 && this.body.velocity.y === 0) && !this.isAttacking && !isShooting && !this.isJumping) {
            this.action = 'stand_';
        }

        let anim = this.animPrefix + this.weapon + this.action + this.direction;
    
        // Animation logic to play the correct animation and revert to standing or running once the attack is finished
        // Check the direction of attack and change the physics box offsets to account for sword swinging
        if (this.action === 'jump_') {
            //let targetY = this.y - 30;
            //let anims = this.anims;
            this.anims.play(anim, true);
            this.on('animationstart-dp_unarmed_jump_right', function(event) {
                //console.log(event);
                this.scene.tweens.add({
                    targets: this,
                    x: this.x,
                    y: this.y - 50,
                    ease: 'Linear',
                    duration: 400,
                    yoyo: true,
                    // onStart: function (tween, targets) {
                    //     anims.play(anim, true);
                    //     targetY-=20;
                    // },
                    
                });
            });
            this.on('animationstart-dp_unarmed_jump_left', function(event) {
                //console.log(event);
                this.scene.tweens.add({
                    targets: this,
                    x: this.x,
                    y: this.y-50,
                    ease: 'Linear',
                    duration: 400,
                    yoyo: true,
                    // onStart: function (tween, targets) {
                    //     anims.play(anim, true);
                    //     targetY-=20;
                    // },
                    
                });
            });
            //this.scene.physics.moveTo(this, this.x, this.y-50, 60, 400);
            //this.anims.play(anim, true);
            //this.scene.physics.moveTo(this, this.x, this.y+50, 60, 400);
            
            // var tween = this.scene.tweens.add({
            //     targets: this,
            //     duration: 800,
            //     yoyo: false,
            //     repeat: 0,
            //     ease: 'Linear',
                
            //     y: {
        
            //         getEnd: function (target, key, value)
            //         {
            //             //value += 30;
            //             console.log(targetY);
            //             //console.log(value);
            //             //console.log(key);
            //             return value + 30;
            //         },
        
            //         getStart: function (target, key, value)
            //         {
            //             anims.play(anim, true);
            //             console.log(targetY);
            //             //console.log(value);
            //             //console.log(key);
            //             return value - 30;
            //         }
        
            //     }
        
            // });

            // this.scene.tweens.add({
            //     targets: this,
            //     x: this.x,
            //     y: targetY,
            //     ease: 'Linear',
            //     duration: 400,
            //     yoyo: true,
            //     onStart: function (tween, targets) {
            //         anims.play(anim, true);
            //         targetY-=20;
            //     },
                
            // });
            // this.scene.tweens.add({
            //     targets: this,
            //     y: '-=50',
            //     duration: 400,
            //     ease: 'Power2',
            //     yoyo: true,
            //     // delay: 1000
            // });
            // this.scene.tweens.add({
            //     targets: this,
            //     x: this.x-500,
            //     duration: 2000,
            //     ease: 'Power2',
                
            // });
            
            //this.anims.play(anim, true);
            
            //this.setY(targetY);
            //this.setY(this.y+50);
            // this.y+=50;
            // Wait 500ms(the duration of the sword swing), then call resetSwords to reset the offset and set the action and weapon to stand and unarmed
            this.scene.physics.world.disable(this);
            //this.scene.physics.world.disableBody(this);
            this.scene.time.addEvent({ delay: 800, callback: this.resetJump, callbackScope: this });
        }
        
        else if (this.action === 'attack_') {
            if (this.direction === 'right') {
                this.body.setOffset(175, 0);
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
            // switch (this.weapon) {
            //     case 'pistol_':
            //         this.scene.time.addEvent({ delay: 300, callback: this.resetShoot, callbackScope: this });
            //     case 'shotgun_':
            //         this.scene.time.addEvent({ delay: 1000, callback: this.resetShoot, callbackScope: this });
            //     case 'ak_':
            //         this.ak = false;
            //     case 'minigun_':
            //         this.minigun = false;
            //     case 'sniper':
            //         this.sniper = false
            //     case 'grenade':
            //         this.grenade = false
            //     default:
            //         this.pistol = false;
            // }
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
    disableShooting(gun) {
        //console.log(gun);
        switch (gun) {
            case 'pistol':
                this.pistol = false;
            case 'shotgun':
                this.shotgun = false;
            case 'ak':
                this.ak = false;
            case 'minigun':
                this.minigun = false;
            case 'sniper':
                this.sniper = false
            case 'grenade':
                this.grenade = false
            default:
                this.pistol = false;
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
        if (!(this.pistol || this.shotgun || this.ak || this.sniper || this.minigun || this.grenade)) { // Use this instead of this.action === 'attack_' so you can instantly attack again instead of the animation being cut off 1 frame in
        this.action = 'stand_';
        this.weapon = 'unarmed_';
        }
    }
    resetJump() {
        if (!this.isJumping) { // Use this instead of this.action === 'attack_' so you can instantly attack again instead of the animation being cut off 1 frame in
        this.scene.physics.world.enableBody(this);    
        this.action = 'stand_';
            this.weapon = 'unarmed_';
        }
    }
    pistolShoot() {
        this.pistol = true;
        this.canMove = false;
        // Only need these two lines while using the weapon method of calling the anims
        this.action = 'shoot_';
        this.weapon = 'pistol_';
        
        let bulletPos = (this.direction === 'right') ? this.x + 42 : this.x - 42;
        let bulletAngle = (this.direction === 'right') ? 0 : 180;
        // Add the bullet to the game and player Attack group
        let bullet = new Bullet({
            scene: this.scene,
            x: bulletPos, 
            y: this.y - 17,
            angle: bulletAngle,
            damage: 5,
            dir: this.direction,
            speed: 500,
            scale: 1,
            gunType: 'pistol'
            });
        this.scene.playerAttack.add(bullet);
        // 1/5 second delay between shots
        this.scene.time.addEvent({ delay: 300, callback: this.enableMove, callbackScope: this });
        this.scene.time.addEvent({ delay: 300, callback: this.disableShooting, callbackScope: this, args: ['pistol'] });
    }
    shotgunShoot() {
        this.shotgun = true;
        this.canMove = false;
        // Only need these two lines while using the weapon method of calling the anims
        this.action = 'shoot_';
        this.weapon = 'shotgun_';
        
        let bulletPos = (this.direction === 'right') ? this.x + 42 : this.x - 42;
        // Add the bullet to the game and player Attack group
        let i;
        for (i=0; i<8; i++) {
            let bulletAngle = (this.direction === 'right') ? Phaser.Math.Between(-10, 10) : Phaser.Math.Between(-10, 10) + 180;
            //console.log(bulletAngle);
            let bullet = new Bullet({
                scene: this.scene,
                x: bulletPos, 
                y: this.y-5,
                angle:  bulletAngle,
                damage: 5,
                dir: this.direction,
                speed: 500,
                scale: 1,
                gunType: 'shotgun'
                });
            this.scene.playerAttack.add(bullet);
        }
        
        // 1/5 second delay between shots
        this.scene.time.addEvent({ delay: 300, callback: this.enableMove, callbackScope: this });
        this.scene.time.addEvent({ delay: 600, callback: this.disableShooting, callbackScope: this, args: ['shotgun'] });
    }
    akShoot() {
        this.ak = true;
        this.canMove = false;
        // Only need these two lines while using the weapon method of calling the anims
        this.action = 'shoot_';
        this.weapon = 'ak_';
        
        let bulletPos = (this.direction === 'right') ? this.x + 42 : this.x - 42;
        // Add the bullet to the game and player Attack group
        let bulletAngle = (this.direction === 'right') ? Phaser.Math.Between(-3, 3) : Phaser.Math.Between(-3, 3) + 180;
        //console.log(bulletAngle);
        let bullet = new Bullet({
            scene: this.scene,
            x: bulletPos, 
            y: this.y-3,
            angle:  bulletAngle,
            damage: 4,
            dir: this.direction,
            speed: 650,
            scale: 1,
            gunType: 'ak'
            });
        this.scene.playerAttack.add(bullet);
        
        // 1/5 second delay between shots
        this.scene.time.addEvent({ delay: 300, callback: this.enableMove, callbackScope: this });
        this.scene.time.addEvent({ delay: 150, callback: this.disableShooting, callbackScope: this, args: ['ak'] });
    }
    sniperShoot() {
        this.sniper = true;
        this.canMove = false;
        // Only need these two lines while using the weapon method of calling the anims
        this.action = 'shoot_';
        this.weapon = 'sniper_';

        let particles =  this.scene.add.particles('explosion');

        let emitter = particles.createEmitter({
            frame: 'smoke-puff',
            //angle: { min: 240, max: 300 },
            speed: 1,
            quantity: 1,
            lifespan: 500,
            alpha: { start: 1, end: 0 },
            scale: { start: 0.1, end: 0 },
            //on: false,
            blendMode: 'ADD'
        });
        
        let bulletPos = (this.direction === 'right') ? this.x + 42 : this.x - 42;
        // Add the bullet to the game and player Attack group
        let bulletAngle = (this.direction === 'right') ? 0 : 180;
        //console.log(bulletAngle);
        let bullet = new Bullet({
            scene: this.scene,
            x: bulletPos, 
            y: this.y-7,
            angle:  bulletAngle,
            damage: 15,
            dir: this.direction,
            speed: 1500,
            scale: 2,
            gunType: 'sniper'
            });
        emitter.startFollow(bullet);
        this.scene.playerAttack.add(bullet);
        
        // 1/5 second delay between shots
        this.scene.time.addEvent({ delay: 300, callback: this.enableMove, callbackScope: this });
        this.scene.time.addEvent({ delay: 850, callback: this.disableShooting, callbackScope: this, args: ['sniper'] });
    }
    minigunShoot() {
        this.minigun = true;
        this.canMove = false;
        // Only need these two lines while using the weapon method of calling the anims
        this.action = 'shoot_';
        this.weapon = 'mg_';
        
        let bulletPos = (this.direction === 'right') ? this.x + 42 : this.x - 42;
        // Add the bullet to the game and player Attack group
        let bulletAngle = (this.direction === 'right') ? Phaser.Math.Between(-3, 3) : Phaser.Math.Between(-3, 3) + 180;
        //console.log(bulletAngle);
        let bullet = new Bullet({
            scene: this.scene,
            x: bulletPos, 
            y: this.y+12,
            angle:  bulletAngle,
            damage: 2,
            dir: this.direction,
            speed: 800,
            scale: 1,
            gunType: 'mg'
            });
        this.scene.playerAttack.add(bullet);
        
        // 1/5 second delay between shots
        this.scene.time.addEvent({ delay: 300, callback: this.enableMove, callbackScope: this });
        this.scene.time.addEvent({ delay: 50, callback: this.disableShooting, callbackScope: this, args: ['minigun'] });
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
        this.scene.physics.world.colliders.remove(this.scene.bulletDeadpoolCollider); 
        // Delay for 1 second before being made vulnerable again
        this.scene.time.addEvent({ delay: 1000, callback: this.normalize, callbackScope: this });
        }
    }
    normalize() 
    {
        if (this.alive) {
            this.damaged = false;
            this.setTint(0xffffff);
            this.scene.physics.world.colliders.add(this.scene.bulletDeadpoolCollider);
        }
    }

}