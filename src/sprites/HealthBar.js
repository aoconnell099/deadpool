export default class HealthBar {

    constructor (scene, x, y)
    {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.health = 100;
        this.maxHealth = 100;
        this.p = 76 / 100;

        this.draw();

        scene.add.existing(this.bar);
    }

    setHealth(newHealth)
    {
        this.health = newHealth;
        this.maxHealth = newHealth
    }
    destroy()
    {
        this.bar.destroy();
    }
    setXY(x, y)
    {
        this.x = x;
        this.y = y;
        this.draw();
    }

    altSetXY(x, y)
    {
        this.bar.setPosition(x, y);
        this.draw();
    }

    decrease (amount)
    {
        this.health -= amount;

        if (this.health < 0)
        {
            this.health = 0;
        }

        this.draw();

        return (this.health === 0);
    }

    draw ()
    {
        this.bar.clear();

        //  Background
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, 80, 16);

        //  Health
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 2, this.y + 2, 76, 12);

        if (this.health < 30)
        {
            this.bar.fillStyle(0xff0000);
        }
        else
        {
            this.bar.fillStyle(0x00ff00);
        }

        var d = Math.floor(this.p * ((this.health/this.maxHealth)) * 100);

        this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
    }

}