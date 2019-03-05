import phaser from 'phaser'
import { Preloader } from './scenes/Preloader'
import { Game } from './scenes/Game'
import { HUD } from './scenes/HUD'
import HealthDisplay from './scenes/HealthDisplay';
//import { GameOver } from './scenes/GameOver'

const config = {
    width: 800,
    height: 600,
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
const game =  new phaser.Game(config);
