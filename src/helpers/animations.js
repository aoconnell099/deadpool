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
    // scene.anims.create({
    //     key: 'dp_pistol_stand_right',
    //     frames: [ {key:'deadpool', frame: 'pistol_stand_right'} ],
    //     frameRate: 20,
    //     repeat: -1
    // });

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

    //running left anims
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

    //jumping anims
    scene.anims.create({
        key: 'dp_unarmed_jump_left',
        frames: [ {key:'deadpool', frame: 'jumpL1'}, {key:'deadpool', frame: 'jumpL2'}, {key:'deadpool', frame: 'jumpL3'}, {key:'deadpool', frame: 'jumpL4'} ],
        frameRate: 5,
        repeat: 0
    });
    scene.anims.create({
        key: 'dp_unarmed_jump_right',
        frames: [ {key:'deadpool', frame: 'jumpR1'}, {key:'deadpool', frame: 'jumpR2'}, {key:'deadpool', frame: 'jumpR3'}, {key:'deadpool', frame: 'jumpR4'} ],
        frameRate: 5,
        repeat: 0
    });

    //attack anims 
    scene.anims.create({
        key: 'dp_swords_attack_left',
        frames: [ {key:'deadpool', frame: 'swords_stand_left'}, {key:'deadpool', frame: 'swords_swing_left'} ],
        frameRate: 6,
        repeat: 0
    });
    scene.anims.create({
        key: 'dp_swords_attack_right',
        frames: [ {key:'deadpool', frame: 'swords_stand_right'}, {key:'deadpool', frame: 'swords_swing_right'} ],
        frameRate: 6,
        repeat: 0
    });
    scene.anims.create({
        key: 'dp_pistol_shoot_right',
        frames: [ { key: 'deadpool', frame: 'shootR2' }, { key: 'deadpool', frame: 'shootR1' } ],
        frameRate: 6,
        repeat: 0
    });
    scene.anims.create({
        key: 'dp_pistol_shoot_left',
        frames: [ { key: 'deadpool', frame: 'shootL2' }, { key: 'deadpool', frame: 'shootL1' } ],
        frameRate: 6,
        repeat: 0
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
        key: 'slime_stand_left',
        frames: [ {key:'slime_left', frame: 'stand1'}, {key:'slime_left', frame: 'stand2'}, {key:'slime_left', frame: 'stand3'}, {key:'slime_left', frame: 'stand4'}, {key:'slime_left', frame: 'stand5'}, {key:'slime_left', frame: 'stand6'} ],
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'slime_stand_right',
        frames: [ {key:'slime_right', frame: 'stand7'}, {key:'slime_right', frame: 'stand8'}, {key:'slime_right', frame: 'stand9'}, {key:'slime_right', frame: 'stand10'}, {key:'slime_right', frame: 'stand11'}, {key:'slime_right', frame: 'stand12'} ],
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'slime_walk_left',
        frames: [ {key:'slime_left', frame: 'walk1'}, {key:'slime_left', frame: 'walk2'}, {key:'slime_left', frame: 'walk3'}, {key:'slime_left', frame: 'walk4'}, {key:'slime_left', frame: 'walk5'}, {key:'slime_left', frame: 'walk6'}, {key:'slime_left', frame: 'walk7'}, {key:'slime_left', frame: 'walk8'} ],
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'slime_walk_right',
        frames: [ {key:'slime_right', frame: 'walk9'}, {key:'slime_right', frame: 'walk10'}, {key:'slime_right', frame: 'walk11'}, {key:'slime_right', frame: 'walk12'}, {key:'slime_right', frame: 'walk13'}, {key:'slime_right', frame: 'walk14'}, {key:'slime_right', frame: 'walk15'}, {key:'slime_right', frame: 'walk16'} ],
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'slime_punch_left',
        frames: [ {key:'slime_left', frame: 'punch1'}, {key:'slime_left', frame: 'punch2'}, {key:'slime_left', frame: 'punch3'}, {key:'slime_left', frame: 'punch4'}, {key:'slime_left', frame: 'punch5'}, {key:'slime_left', frame: 'punch6'}, {key:'slime_left', frame: 'punch7'}, {key:'slime_left', frame: 'punch8'} ],
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'slime_punch_right',
        frames: [ {key:'slime_right', frame: 'punch9'}, {key:'slime_right', frame: 'punch10'}, {key:'slime_right', frame: 'punch11'}, {key:'slime_right', frame: 'punch12'}, {key:'slime_right', frame: 'punch13'}, {key:'slime_right', frame: 'punch14'}, {key:'slime_right', frame: 'punch15'}, {key:'slime_right', frame: 'punch16'} ],
        frameRate: 10,
        repeat: 0
    });
}