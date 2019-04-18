import { Scene } from 'phaser';
import makeAnimations from '../helpers/animations'
export class Title extends Scene {
    constructor () {
        super({
            key: 'title'
        })
    }

    create ()
    {
        //this.add.image(400, 300, 'bg');

        let add = this.add;
        let input = this.input;
        let width = this.game.config.width;
        let height = this.game.config.height;
        let scene = this.scene;
        let sound = this.sound;
        let game = this.game

        WebFont.load({
            google: {
                families: [ 'Great Vibes', 'Roboto' ]
            },
            active: function ()
            {
                add.text((width/2)-160, height/4, 'Deadpool ', { fontFamily: 'Great Vibes', fontSize: 80, color: '#ffffff' }); //.setShadow(2, 2, "#333333", 2, false, true);
                //add.text((width/2)-110, height/4+150, 'Bitch ', { fontFamily: 'Great Vibes', fontSize: 80, color: '#ffffff' });
                add.text((width/2)-150, height/4+250, 'Press Enter to begin', { fontFamily: 'Roboto', fontSize: 28, color: '#ffffff' });

                // var t = add.text(330, 200, 'R.I.P', { fontFamily: 'Nosifer', fontSize: 150, color: '#ff3434' });

                input.keyboard.on('keydown-' + 'ENTER', function (event) { 
                    sound.play('take_on_me');
                    scene.start('game');
                 });
            }
        });
    }
}