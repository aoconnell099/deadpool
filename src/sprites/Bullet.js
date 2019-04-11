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
    }

    enemyCollide (enemy) 
    {
        // this.emitter.explode( 32, this.x, this.y );
        // this.enemySound.play();
        enemy.damage(this.damage);
        this.destroy();
    }
}