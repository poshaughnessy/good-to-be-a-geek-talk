require.config({

    paths: {
        detector: 'lib/Detector',
        flyControlsMod: 'lib/FlyControlsMod',
        jquery: 'lib/jquery-1.9.1',
        pace: 'lib/pace',
        phaser: 'lib/phaser.min',
        //pixi: 'lib/pixi',
        stats: 'lib/stats.min',
        three: 'lib/three.min',
        tween: 'lib/tween.min'
    },

    shim: {
        detector: {
            exports: 'Detector'
        },
        flyControlsMod: {
            deps: ['three']
        },
        stats: {
            exports: 'Stats'
        },
        three: {
            exports: 'THREE'
        },
        tween: {
            exports: 'TWEEN'
        }
    }

});

require(['demoController', 'slides'], function(Demos, Slides) {

    Demos.init();

    new Slides(Demos);

});
