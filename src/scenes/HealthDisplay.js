export default class HealthDisplay extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'healthDisplay', active: true });

        //this.health = this.registry.get('health_max');
    }

    create ()
    {
        //  Our Text object to display the Score
        this.health = this.add.text(1, 1, 'Health: 100 / 100').setScrollFactor(0);
        //let info = this.add.text(400, 300, 'Health: 100', { font: '48px Arial', fill: '#000000' });
        //  Grab a reference to the Game Scene
        let level = this.scene.get('game');

        //level.events.on('coinChange', this.updateCoins, this);  //watch the level to see if the coin count has changed. Event emitted by coin class.
        level.events.on('healthChange', this.updateHealth, this);  //watch the level to see if the coin health has changed. Event emitted by player and meat class.
        //level.events.on('magicChange', this.updateMagic, this);  //watch the level to see if the coin magic has changed. Event emitted by player and potion class.
        
        //level.events.on('gameOver', this.gameOver, this); //watch for Game Over
  

        //  Listen for events from it
        // ourGame.events.on('addScore', function () {

        //     this.score += 10;

        //     info.setText('Score: ' + this.score);

        // }, this);
    }
    updateHealth() 
    {
      this.health.setText(`Health: ${this.registry.get('health_current')} / ${this.registry.get('health_max')}`);
    //   if (this.registry.get('health_current') <= 1 && !this.alarmed) {
    //     this.alarmed = true;
    //     //this.healthAlarm.play();
    //   } else if (this.registry.get('health_current') > 1 && this.alarmed) {
    //     this.alarmed = false;
    //     //this.healthAlarm.stop();
    //   }
    }
}