export default class Bullet extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'bullet');
        config.scene.physics.world.enable(this);
        this.scene = config.scene;
        this.damage = config.damage;
        this.dir = config.dir;
        this.speed = config.speed;
        this.angle = config.angle;
        this.setAngle(config.angle);
        this.setPosition(config.x, config.y);
        this.setScale(config.scale);
        this.scene.add.existing(this);
    }

    update(time, delta) 
    {
        if (this.dir === 'right') {
            this.body.setVelocity(Math.cos(Phaser.Math.DegToRad(this.angle)) * this.speed, Math.sin(Phaser.Math.DegToRad(this.angle)) * this.speed);
        }
        else if (this.dir === 'left') {
            this.body.setVelocity(Math.cos(Phaser.Math.DegToRad(this.angle)) * this.speed, Math.sin(Phaser.Math.DegToRad(this.angle)) * this.speed);
        }
        //hide if out of bounds
        // console.log(this.scene.physics.world.bounds.width);
        // console.log(this.scene.physics.world.bounds.height);
        // console.log(this.x);
        // console.log(this.y);
        
        // if (this.x > this.scene.physics.world.bounds.width) {
        //     this.setAlpha(0);
        // } else if (this.x < 0) {
        //     this.setAlpha(0);
        // } else if (this.y > this.scene.game.config.height) {
        //     this.setAlpha(0);
        // } else if (this.y < 0) {
        //     this.setAlpha(0);
        // } else {
        //     this.setAlpha(1);
        // }
        //hide if out of bounds
        if (this.x > this.scene.physics.world.bounds.width) {
            this.destroy();
        } else if (this.x < 0) {
            this.destroy();
        } else if (this.y > this.scene.game.config.height) {
            this.destroy();
        } else if (this.y < 0) {
            this.destroy();
        } 
    }

    enemyCollide (enemy) 
    {
        // this.emitter.explode( 32, this.x, this.y );
        // this.enemySound.play();
        enemy.damage(this.damage);
        this.destroy();
    }
}