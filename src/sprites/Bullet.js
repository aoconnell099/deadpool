export default class Bullet extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'bullet');
        config.scene.physics.world.enable(this);
        this.scene = config.scene;
        this.damage = 5;
        this.dir = config.dir;
        this.setPosition(config.x, config.y);
        this.scene.add.existing(this);
    }

    update(time, delta) 
    {
        if (this.dir === 'right') {
            this.body.setVelocity(500, 0);
        }
        else if (this.dir === 'left') {
            this.body.setVelocity(-500, 0);
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