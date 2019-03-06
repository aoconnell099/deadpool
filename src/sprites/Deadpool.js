import { Sprite } from 'phaser';
//Phaser.GameObjects.
export default class Deadpool extends Phaser.GameObjects.Sprite {        
    constructor(config) { 
        console.log('before super');
        super(config.scene, config.x, config.y, 'deadpool', 'stand_right');
        config.scene.physics.world.enable(this);
        this.scene = config.scene;
        
        // Custom elements
        this.health = 100;
        this.alive = true;
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
            melee: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
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
            switchGun: this.keys.switchGun.isDown,
            fire: this.keys.fire.isDown,
            melee: this.keys.melee.isDown
        };

        if (input.switchGun) {
            if (this.weaponIndex === 0 && this.weapons.length === 1) {
                this.weaponIndex = 0;
                this.weapon = this.weapons[this.weaponIndex];
            }
            else if (this.weaponIndex > 0 && this.weaponIndex === this.weapons.length - 1) {
                this.weaponIndex = 0;
                this.weapon = this.weapons[this.weaponIndex];
            }
            else if (this.weaponIndex < this.weapons.length - 1) {
                this.weaponIndex++;
                this.weapon =this.weapons[this.weaponIndex];
            }
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

        let action = null;

        if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0) {
            action = 'run_';
        } else if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
            action = 'stand_';
        }

        let anim = this.animPrefix + this.weapon + action + this.direction;
        
        // if (this.anims.currentAnim.key !== anim && !this.scene.physics.world.isPaused) {
        //     this.anims.play(anim);
        // }
        this.anims.play(anim, true);
    }
}