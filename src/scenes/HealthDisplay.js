export default class HealthDisplay extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'healthDisplay', active: true });
    }

    create ()
    {
        //  Our Text object to display the current health
        this.health = this.add.text(1, 1, 'Health: 100 / 100').setScrollFactor(0);
        //let info = this.add.text(400, 300, 'Health: 100', { font: '48px Arial', fill: '#000000' });
        
        //  Grab a reference to the Game Scene
        let level = this.scene.get('game');

        // Watch the level to see if the health has changed. Event emitted by Deadpool class.
        level.events.on('healthChange', this.updateHealth, this); 
        // level.events.on('gameOver', this.gameOver, this); // Watch for Game Over // DONT NEED YET
        
    }
    updateHealth() 
    {
        this.health.setText(`Health: ${this.registry.get('health_current')} / ${this.registry.get('health_max')}`);
        // Look at the HUD example on github if you want to play alarms or do anything special as deadpools health gets low
    }
    gameOver()
    {
      this.health.destroy();
    }
}