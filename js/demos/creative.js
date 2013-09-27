/*
 * Based on webgl_particles_sprites.html example from Three.js
 */
define([
    'three',
    'detector'
], function(THREE, Detector) {

    var DEMO_ID = 'demo-creative';

    var demo = {

        id: DEMO_ID,

        constructor: function() {

            var renderer,
                container,
                camera,
                scene,
                mouseX = 0,
                mouseY = 0,
                width,
                height,
                stopped = false,
                windowHalfX = window.innerWidth / 2,
                windowHalfY = window.innerHeight / 2;

            if( !Detector.webgl ) return;

            init();

            function init() {

                // Create a WebGL renderer
                renderer = new THREE.WebGLRenderer({ antialias: true });

                // Add generated <canvas> to page
                var slide = document.getElementsByClassName(DEMO_ID)[0];
                container = slide.getElementsByClassName('demo-container')[0];

                container.appendChild( renderer.domElement );

                width = container.offsetWidth;
                height = container.offsetHeight;

                renderer.setSize( width, height );

                // Make a scene
                scene = new THREE.Scene();

                // Create a camera
                camera = new THREE.PerspectiveCamera(
                        75,           // Field of View
                        width/height, // Aspect ratio
                        1,            // zNear
                        2000         // zFar
                );

                camera.position.z = 500;

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

                var sprite1 = THREE.ImageUtils.loadTexture('img/HTML5_Badge_512.png');
                var sprite2 = THREE.ImageUtils.loadTexture('img/HTML5_Badge_512.png');

                var material1 = new THREE.ParticleBasicMaterial({size: 50, map: sprite1, transparent: true, depthTest: false, sizeAttenuation: false});
                var material2 = new THREE.ParticleBasicMaterial({size: 250, map: sprite2, transparent: true, depthTest: false, sizeAttenuation: false});

                var particle1 = new THREE.ParticleSystem( geometry, material1 );
                var particle2 = new THREE.ParticleSystem( geometry, material2 );

                particle1.rotation.set( Math.random() * 6, Math.random() * 6, Math.random() * 6);
                particle2.rotation.set( Math.random() * 6, Math.random() * 6, Math.random() * 6);

                scene.add( particle1 );
                scene.add( particle2 );

                document.addEventListener( 'mousemove', onDocumentMouseMove, false );
                document.addEventListener( 'touchstart', onDocumentTouchStart, false );
                document.addEventListener( 'touchmove', onDocumentTouchMove, false );

            }

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

                render();

                requestAnimationFrame( animate );

            };

            var render = function() {

                var time = Date.now() * 0.00005;

                camera.position.x += ( mouseX - camera.position.x ) * 0.05;
                camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

                camera.lookAt( scene.position );

                for ( i = 0; i < scene.children.length; i ++ ) {

                    var object = scene.children[ i ];

                    if ( object instanceof THREE.ParticleSystem ) {

                        object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );

                    }

                }

                renderer.render( scene, camera );

            };

            this.updateSize = function(width, height) {

                console.log('Update size', width, height);

                renderer.setSize( width, height );

                windowHalfX = width / 2;
                windowHalfY = height / 2;

                camera.aspect = width / height;
                camera.updateProjectionMatrix();

            };

            function onDocumentMouseMove( event ) {

                mouseX = event.clientX - windowHalfX;
                mouseY = event.clientY - windowHalfY;

            }

            function onDocumentTouchStart( event ) {

                if ( event.touches.length === 1 ) {

                    event.preventDefault();

                    mouseX = event.touches[ 0 ].pageX - windowHalfX;
                    mouseY = event.touches[ 0 ].pageY - windowHalfY;

                }

            }

            function onDocumentTouchMove( event ) {

                if ( event.touches.length === 1 ) {

                    event.preventDefault();

                    mouseX = event.touches[ 0 ].pageX - windowHalfX;
                    mouseY = event.touches[ 0 ].pageY - windowHalfY;

                }

            }

        }

    };

    return demo;

});
