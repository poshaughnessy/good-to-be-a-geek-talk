define([
    'three',
    'detector'
], function(THREE, Detector) {

    var DEMO_ID = 'demo-creative';

    var demo = {

        id: DEMO_ID,

        constructor: function() {

            if( !Detector.webgl ) return;

            // Create a WebGL renderer
            var renderer = new THREE.WebGLRenderer({ antialias: true });

            // Add generated <canvas> to page
            var slide = document.getElementsByClassName(DEMO_ID)[0];
            var container = slide.getElementsByClassName('demo-container')[0];

            container.appendChild( renderer.domElement );

            var width = container.offsetWidth;
            var height = container.offsetHeight;

            renderer.setSize( width, height );

            // Make a scene
            var scene = new THREE.Scene();

            // Create a camera
            var camera = new THREE.PerspectiveCamera(
                    75,           // Field of View
                    width/height, // Aspect ratio
                    1,            // zNear
                    2000         // zFar
            );

            camera.position.z = 1000;

            // Add it to the scene
            scene.add( camera );

            // Sprite stuff

            var geometry = new THREE.Geometry();

            for ( i = 0; i < 100; i ++ ) {

                var vertex = new THREE.Vector3();
                vertex.x = Math.random() * 2000 - 1000;
                vertex.y = Math.random() * 2000 - 1000;
                vertex.z = Math.random() * 2000 - 1000;

                geometry.vertices.push( vertex );

            }

            var sprite = THREE.ImageUtils.loadTexture('../../img/horse_0.png');

            var material = new THREE.ParticleBasicMaterial({size: 50, map: sprite});

            var particle = new THREE.ParticleSystem( geometry, material );

            particle.rotation.x = Math.random() * 6;
            particle.rotation.y = Math.random() * 6;
            particle.rotation.z = Math.random() * 6;

            scene.add( particle );


            var stopped = false;

            this.start = function() {
                stopped = false;
                animate();
            };

            this.stop = function() {
                stopped = true;
            };

            var animate = function() {

                // Optimisation
                if( stopped ) {
                    return;
                }

                renderer.render( scene, camera );

                requestAnimationFrame( animate );

            };

            this.updateSize = function(width, height) {

                console.log('Update size', width, height);

                renderer.setSize( width, height );

                camera.aspect = width / height;
                camera.updateProjectionMatrix();

            };

        }

    };

    return demo;

});
