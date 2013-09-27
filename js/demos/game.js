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

            var game = new Phaser.Game(width, height, Phaser.AUTO, container,
                    {preload: preload, create: create, update: update}, true);

            function preload() {

                game.load.spritesheet('possum', '../../img/awesome-possum-sprite.png', 84, 84);

            }

            var WALK_X_PER_FRAME = 5,
                NUM_PUNCH_FRAMES = 60,
                possum,
                punchCount = NUM_PUNCH_FRAMES;

            function create() {

                possum = game.add.sprite(0, game.world.centerY, 'possum');

                possum.scale = new Phaser.Point(1.5,1.5);

                possum.animations.add('walk', [0, 1, 2, 3], 15, true, true);
                possum.animations.add('punch', [4, 5, 6, 6], 5, false, true);

            }

            function update() {

                if( possum.x > game.world.width ) {
                    possum.x = -WALK_X_PER_FRAME;
                }

                if( possum.x == game.world.centerX ) {

                    if( punchCount > 0 ) {

                        possum.animations.play('punch');
                        punchCount--;

                    } else {

                        punchCount = NUM_PUNCH_FRAMES;
                        possum.x += WALK_X_PER_FRAME;

                    }

                } else {

                    possum.animations.play('walk');

                    possum.x += WALK_X_PER_FRAME;

                }

            }

        }

    };

    return demo;

});
