import Deadpool from './sprites/Deadpool';
export default class DeadpoolPlugin extends Phaser.Plugins.BasePlugin {

    constructor (pluginManager)
    {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('deadpool', this.createDeadpool);
    }

    createDeadpool (x, y, key, frame)
    {
        return this.displayList.add(new Deadpool(this.scene, x, y, key, frame, null));
    }

}