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
        // this.cameras.main.setBackgroundColor('#D12531');
        // this.fullBar = this.add.graphics();
        // this.fullBar.fillStyle(0x101010, 1); 
        // this.fullBar.fillRect((this.cameras.main.width / 4)-8,(this.cameras.main.height /2) - 24, (this.cameras.main.width / 2) + 16, 32);
        // this.progress = this.add.graphics();

        // //pass loading progress as value to loading bar and redraw as files load
        // this.load.on('progress', function (value) {
        //     this.progress.clear();
        //     this.progress.fillStyle(0xF4F9FF, 1);
        //     this.progress.fillRect((this.cameras.main.width / 4), (this.cameras.main.height /2) - 16, (this.cameras.main.width / 2) * value, 16);
        // }, this); 

        // //cleanup our graphics on complete
        // this.load.on('complete', function () {
        //     this.progress.destroy();
        //     this.fullBar.destroy();
        // }, this);

        this.load.image('f1', 'assets/intro_vid/1.png');
        this.load.image('f2', 'assets/intro_vid/2.png');
        
        this.load.image('f4', 'assets/intro_vid/4.png');
        this.load.image('f5', 'assets/intro_vid/5.png');
        this.load.image('f6', 'assets/intro_vid/6.png');
        this.load.image('f7', 'assets/intro_vid/7.png');
        this.load.image('f8', 'assets/intro_vid/8.png');
        this.load.image('f9', 'assets/intro_vid/9.png');
        this.load.image('f10', 'assets/intro_vid/10.png');
        this.load.image('f11', 'assets/intro_vid/11.png');
        this.load.image('f12', 'assets/intro_vid/12.png');
        this.load.image('f13', 'assets/intro_vid/13.png');
        this.load.image('f14', 'assets/intro_vid/14.png');
        this.load.image('f15', 'assets/intro_vid/15.png');
        this.load.image('f16', 'assets/intro_vid/16.png');
        this.load.image('f17', 'assets/intro_vid/17.png');
        this.load.image('f18', 'assets/intro_vid/18.png');
        this.load.image('f19', 'assets/intro_vid/19.png');
        
        
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
        this.load.atlas('explosion', 'assets/items/explosions.png', 'assets/items/explosions.json');
        this.load.atlas('explosion2', 'assets/items/explosions2.png', 'assets/items/explosions2.json');
        this.load.audio('take_on_me', 'assets/music/take_on_me.mp3');
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        this.initRegistry();
        makeAnimations(this);
        // this.background = this.add.tileSprite((this.game.config.width * 10) / 2, this.game.config.height / 2, this.game.config.width * 10, 1024, 'city').setDisplaySize(this.game.config.width * 10, this.game.config.height);
        // this.foreground = this.add.tileSprite((this.game.config.width * 10) / 2, this.game.config.height / 2, this.game.config.width * 10, 1024, 'road').setDisplaySize(this.game.config.width * 10, this.game.config.height);
        this.vid = this.add.sprite(this.game.config.width/2, this.game.config.height/2, 'f1').setDisplaySize(this.game.config.width, this.game.config.height).play('intro_vid');
        this.vid.on('animationcomplete-intro_vid', function(event) {
            //console.log(event);
            console.log(this);
            this.scene.scene.start('title');
            //this.scene.time.addEvent({ callback: this.startScene, callbackScope: this });
        });
    }

    startScene() {
        console.log(this.scene);
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


  