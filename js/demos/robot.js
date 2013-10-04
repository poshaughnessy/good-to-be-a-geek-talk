define([
    'three',
    'detector',
    'flyControlsMod'
], function(THREE, Detector) {

    var DEMO_ID = 'demo-robot';

    var demo = {

        id: DEMO_ID,

        constructor: function() {

            if( !Detector.webgl ) return;

            // Create a WebGL renderer
            var renderer = new THREE.WebGLRenderer({ antialias: true });

            // Add generated <canvas> to page
            var slide = document.getElementsByClassName(DEMO_ID)[0];
            var container = slide.getElementsByClassName('demo-container')[0];
            var loadingIcon = container.getElementsByClassName('loading')[0];

            loadingIcon.style.display = 'block';

            container.appendChild( renderer.domElement );

            var width = container.offsetWidth;
            var height = container.offsetHeight;

            renderer.setSize( width, height );

            // Make a scene
            var scene = new THREE.Scene();

            // Create a camera
            var camera = new THREE.PerspectiveCamera(
                    45,           // Field of View
                    width/height, // Aspect ratio
                    1,            // zNear
                    10000         // zFar
            );

            camera.position.y = 250;
            camera.position.z = 1000;

            // Add it to the scene
            scene.add( camera );

            var controls = new THREE.FlyControlsMod( camera );

            controls.movementSpeed = 50;
            controls.rollSpeed = 0.1;
            controls.dragToLook = true; // Just moving mouse shouldn't change rotation

            // Lights
            var ambientLight = new THREE.AmbientLight( 0xCCCCCC );
            scene.add( ambientLight );

            var spotLight = new THREE.SpotLight(0xFFFFFF, 1.0, 2000);
            spotLight.position.set( 50, 50, 500 ); // x, y, z
            spotLight.target.position.set( 0, 250, 0 );
            scene.add( spotLight );

            // Robot
            var loader = new THREE.JSONLoader();
            var mesh;

            var clock = new THREE.Clock();

            var filePath = 'models/robot_cartoon_02/robot_cartoon_02.js';

            loader.load(filePath, function(geometry, materials) {

                mesh = new THREE.Mesh( geometry,
                        new THREE.MeshFaceMaterial( materials ) );

                //mesh.rotation.y = Math.PI;
                mesh.rotation.x = Math.PI / 2;
                mesh.rotation.z = -Math.PI / 3;
                mesh.position.set( 0, 0, 0 );

                scene.add( mesh );

                loadingIcon.style.display = 'none';

                animate();

            });

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

                var delta = clock.getDelta();

                controls.update(delta);

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
