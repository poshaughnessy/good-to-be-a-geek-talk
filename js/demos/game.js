define([
    'phaser'
], function(Phaser) {

    var DEMO_ID = 'demo-game';

    var demo = {

        id: DEMO_ID,

        constructor: function() {

            var slide = document.getElementsByClassName(DEMO_ID)[0];
            var container = slide.getElementsByClassName('demo-container')[0];

            var width = container.offsetWidth;
            var height = container.offsetHeight;

            var game = new Phaser.Game(width, height, Phaser.AUTO, 'phaser-container',
                    {preload: preload, create: create, update: update}, true);

            function preload() {

                game.load.spritesheet('possum', '../../img/awesome-possum-sprite.png', 84, 84);

                game.load.spritesheet('monster', '../../img/monster1/mon1_sprite_walk_left.png', 84, 84);
                //game.load.image('background', '../../img/game-background.png');

            }

            var WALK_X_PER_FRAME = 5,
                NUM_PUNCH_FRAMES = 40,
                possum,
                monster,
                punchCount = NUM_PUNCH_FRAMES;

            function create() {

                /*
                var bg = game.add.sprite(0, game.world.centerY, 'background');
                bg.scale = new Phaser.Point(1.5, 1.5);
                */

                possum = game.add.sprite(0, game.world.centerY, 'possum');

                possum.scale = new Phaser.Point(1.5,1.5);

                possum.animations.add('walk', [0, 1, 2, 3], 15, true, true);
                possum.animations.add('punch', [4, 5, 6, 6, 6], 5, false, true);

                monster = game.add.sprite(game.world.width + 84, game.world.centerY + 42, 'monster');

                monster.animations.add('walk', [0, 1, 2, 3, 4], 15, true, true);
                monster.animations.add('die', [0, 0, 14, 13, 12, 11], 5, false, true);

            }

            function update() {

                if( possum.x > game.world.width ) {
                    possum.x = -WALK_X_PER_FRAME;

                    monster.visible = true;

                }

                if( possum.x >= game.world.centerX - WALK_X_PER_FRAME &&
                    possum.x <= game.world.centerX ) {

                    if( punchCount > 0 ) {

                        possum.animations.play('punch');
                        punchCount--;

                        monster.animations.play('die');

                    } else {

                        punchCount = NUM_PUNCH_FRAMES;
                        possum.x += WALK_X_PER_FRAME;

                        monster.visible = false;
                        monster.x = game.world.width + 84;

                    }

                } else {

                    possum.animations.play('walk');

                    possum.x += WALK_X_PER_FRAME;

                    if( monster.visible ) {

                        monster.animations.play('walk');
                        monster.x -= WALK_X_PER_FRAME;

                    }

                }

            }

        }

    };

    return demo;

});
