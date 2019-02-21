import phaser from 'phaser'
import { Preloader } from './scenes/preloader'
const config = {
    width: 800,
    height: 600,
    parent: 'content',
    scene: [
        Preloader
    ]
}
const game =  new phaser.Game(config)