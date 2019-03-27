import { Scene } from 'phaser';
import makeAnimations from '../helpers/animations'
export class Preloader extends Scene {
    constructor () {
        super({
            key: 'preloader'
        })
    }
    preload () {
        //create a background and prepare loading bar
        this.cameras.main.setBackgroundColor('#D12531');
        this.fullBar = this.add.graphics();
        this.fullBar.fillStyle(0x101010, 1); 
        this.fullBar.fillRect((this.cameras.main.width / 4)-8,(this.cameras.main.height /2) - 24, (this.cameras.main.width / 2) + 16, 32);
        this.progress = this.add.graphics();

        //pass loading progress as value to loading bar and redraw as files load
        this.load.on('progress', function (value) {
            this.progress.clear();
            this.progress.fillStyle(0xF4F9FF, 1);
            this.progress.fillRect((this.cameras.main.width / 4), (this.cameras.main.height /2) - 16, (this.cameras.main.width / 2) * value, 16);
        }, this); 

        //cleanup our graphics on complete
        this.load.on('complete', function () {
            this.progress.destroy();
            this.fullBar.destroy();
        }, this);
        
        // Load the assets into the game
        this.load.spritesheet('blonde', 'assets/chars/shooters/blonde1.png', { frameWidth: 439, frameHeight: 284 });
        this.load.spritesheet('black', 'assets/chars/shooters/black1.png', { frameWidth: 439, frameHeight: 284 });
        //this.load.spritesheet('deadpool_shooting', 'assets/deadpoolshooting4.png', { frameWidth: 197, frameHeight: 150 });
        this.load.image('city', 'assets/levels/backround.png');
        this.load.image('road', 'assets/levels/ground.png');
        this.load.image('bullet', 'assets/items/bullet.png');
        //this.load.atlas('deadpool', 'assets/chars/deadpool/deadpool_spritesheet.png', 'assets/chars/deadpool/deadpool_spritesTP.json');
        //this.load.atlas('deadpool_shooting', 'assets/deadpoolshooting3.png', 'assets/deadpool_shooting.json');
        this.load.atlas('deadpool', 'assets/chars/deadpool/deadpool.png', 'assets/chars/deadpool/deadpool.json');
        this.load.atlas('deadpoolGunner', 'assets/chars/deadpool/deadpool_guns.png', 'assets/chars/deadpool/deadpool_guns.json');
        this.load.atlas('slime_left', 'assets/chars/slime/slime_spritesheet_left.png', 'assets/chars/slime/slime_spritesheet_left.json');
        this.load.atlas('slime_right', 'assets/chars/slime/slime_spritesheet_right.png', 'assets/chars/slime/slime_spritesheet_right.json');
        this.load.audio('take_on_me', 'assets/music/take_on_me.mp3');
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        this.initRegistry();
        makeAnimations(this);
        
        this.scene.start('title');
    }

    initRegistry() 
    {
        // The game registry provides a place accessible by all scenes to set and get data.
        // Here we store our key that tells the LevelScene what map to load.
        this.registry.set('newGame', true);
        this.registry.set('health_max', 100);
        this.registry.set('health_current', 100);
        this.registry.set('load', 'Level1');
        this.registry.set('spawn', 'spawnCenter');
    }
}


  