import phaser from 'phaser'
import { Preloader } from './scenes/Preloader'
import { Game } from './scenes/Game'
import HealthDisplay from './scenes/HealthDisplay';
//import { GameOver } from './scenes/GameOver'

const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    autoResize: true,
    parent: 'content',
       physics: {
        default: 'arcade'
    },
    scene: [
        Preloader,
        Game,
        HealthDisplay,
        //GameOver
    ]
};
const global12 = 10;
const game =  new phaser.Game(config);
