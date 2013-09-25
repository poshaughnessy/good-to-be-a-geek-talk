define([
    'jquery',
    'demos/dinosaur',
    'demos/creative',
    'demos/game'
], function($, demo1, demo2, demo3) {

    var DemoController = {

        width: 0,
        height: 0,

        demos: [
            demo1,
            demo2,
            demo3
        ],

        onSlide: function(slideNumber) {

            this.stopDemos();

            var $currentSlide = $('.slide:eq('+slideNumber+')');

            for( var i=0; i < this.demos.length; i++ ) {

                var demo = this.demos[i];

                if( $currentSlide.hasClass( demo.id ) ) {

                    if( !demo.object || demo.object.start === 'undefined' ) {
                        var constructor = demo.constructor;
                        demo.object = new constructor();
                    }

                    if( demo.object.start ) {
                        demo.object.start();
                    }

                }

            }

        },

        stopDemos: function() {

            for( var i=0; i < this.demos.length; i++ ) {

                var demo = this.demos[i];

                if( demo.object ) {
                    if( typeof demo.object.stop !== 'undefined' ) {
                        demo.object.stop();
                    }
                }

            }

        },

        init: function() {

            this.setSize();

            console.log('width', this.width);
            console.log('height', this.height);

            var self = this;

            window.addEventListener( 'resize', function() {

                self.setSize();

                for( var i=0; i < self.demos.length; i++ ) {

                    var demo = self.demos[i];

                    if( demo.updateSize ) {
                        demo.updateSize(self.width, self.height);
                    }

                }

            }, false );

        },

        setSize: function() {

            // Set demo size
            var $slideContents = $('.slide .contents');
            this.width = $slideContents.width();
            this.height = $slideContents.height();

            console.log('width', this.width);
            console.log('height', this.height);

        }

    };

    return DemoController;

});
