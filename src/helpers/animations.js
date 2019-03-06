export default function makeAnimations(scene) {
    // Deadpool's Animations
    //-----------------------------------

    // standing anims
    scene.anims.create({
        key: 'dp_unarmed_stand_right',
        frames: [ {key:'deadpool', frame: 'stand_right'} ],
        frameRate: 20,
        repeat: -1
    });
    scene.anims.create({
        key: 'dp_unarmed_stand_left',
        frames: [ {key:'deadpool', frame: 'stand_left'} ],
        frameRate: 20,
        repeat: -1
    });
    scene.anims.create({
        key: 'dp_swords_stand_right',
        frames: [ {key:'deadpool', frame: 'swords_stand_right'} ],
        frameRate: 20,
        repeat: -1
    });
    scene.anims.create({
        key: 'dp_swords_stand_left',
        frames: [ {key:'deadpool', frame: 'swords_stand_left'} ],
        frameRate: 20,
        repeat: -1
    });
    scene.anims.create({
        key: 'dp_pistol_stand_right',
        frames: [ {key:'deadpool', frame: 'pistol_stand_right'} ],
        frameRate: 20,
        repeat: -1
    });

    //running right anims
    scene.anims.create({
        key: 'dp_unarmed_run_right',
        frames: [ {key:'deadpool', frame: 'step_right_1/3'}, {key:'deadpool', frame: 'step_right_2'}, {key:'deadpool', frame: 'step_right_1/3'}, {key:'deadpool', frame: 'step_right_4'} ],
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'dp_swords_run_right',
        frames: [ {key:'deadpool', frame: 'swords_step_right_1/3'}, {key:'deadpool', frame: 'swords_step_right_2'}, {key:'deadpool', frame: 'swords_step_right_1/3'}, {key:'deadpool', frame: 'swords_step_right_4'} ],
        frameRate: 10,
        repeat: -1
    });

    //running right anims
    scene.anims.create({
        key: 'dp_unarmed_run_left',
        frames: [ {key:'deadpool', frame: 'step_left_1/3'}, {key:'deadpool', frame: 'step_left_2'}, {key:'deadpool', frame: 'step_left_1/3'}, {key:'deadpool', frame: 'step_left_4'} ],
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'dp_swords_run_left',
        frames: [ {key:'deadpool', frame: 'swords_step_left_1/3'}, {key:'deadpool', frame: 'swords_step_left_2'}, {key:'deadpool', frame: 'swords_step_left_1/3'}, {key:'deadpool', frame: 'swords_step_left_4'} ],
        frameRate: 10,
        repeat: -1
    });

    //attack anims
    scene.anims.create({
        key: 'dp_swords_attack_left',
        frames: [ {key:'deadpool', frame: 'swords_stand_left'}, {key:'deadpool', frame: 'swords_swing_left'} ],
        frameRate: 5,
        //repeat: -1
    });
    scene.anims.create({
        key: 'dp_swords_attack_right',
        frames: [ {key:'deadpool', frame: 'swords_stand_right'}, {key:'deadpool', frame: 'swords_swing_right'} ],
        frameRate: 5,
       // repeat: -1
    });
    scene.anims.create({
        key: 'dp_pistol_shoot_right',
        frames: [ {key:'deadpool', frame: 'pistol_shoot_right'} ],
        frameRate: 20,
        repeat: -1
    });
    // End of Deadpool's animations

    // Enemy Animations
    //------------------------------------
    scene.anims.create({
        key: 'blonde_1_stand_left',
        frames: [ { key: 'blonde', frame: 0 } ],
        frameRate: 20,
        repeat: -1
    });
    // Slime monster
    scene.anims.create({
        key: 'slime_punch_left',
        frames: [ {key:'slime_left', frame: 'punch1'}, {key:'slime_left', frame: 'punch2'}, {key:'slime_left', frame: 'punch3'}, {key:'slime_left', frame: 'punch4'}, {key:'slime_left', frame: 'punch5'}, {key:'slime_left', frame: 'punch6'}, {key:'slime_left', frame: 'punch7'}, {key:'slime_left', frame: 'punch8'} ],
        frameRate: 10,
        repeat: -1
    });
}