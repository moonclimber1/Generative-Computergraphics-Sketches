

import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js';
import { TrackballControls } from 'https://unpkg.com/three@0.120.1/examples/jsm/controls/TrackballControls.js';
import { ImprovedNoise } from 'https://unpkg.com/three@0.120.1/examples/jsm/math/ImprovedNoise.js';

var camera, controls, scene, renderer;
var perlin = new ImprovedNoise();

init();
animate();

function init(){

    // Set up camera
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;
    
    // Set up scene
    createScene();

    // Set up renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild(renderer.domElement);

    // Set up trackball controls
    controls = new TrackballControls( camera, renderer.domElement );
    controls.rotateSpeed = 4.0;
    controls.zoomSpeed = 2.0;
    controls.panSpeed = 4.0;
    controls.keys = [ 65, 83, 68 ];
}

function createScene(){
    scene = new THREE.Scene();

    scene.background = new THREE.Color( 0x000000 );



    for(let x = -30; x < 30; x++){
        for(let z = -30; z < 30; z++){

            const height = (perlin.noise(x/10,0, z/10)+0.6)*10
            const size = Math.random() * 3;

            const geometry = new THREE.BoxBufferGeometry(size, height, size);
            const material = new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: false });
            
            
            const box = new THREE.Mesh( geometry, material );
            box.position.x = x;
            box.position.y = height/2-10 + Math.random()*0.1;
            box.position.z = z

            scene.add(box)
        }
    }

    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity = 0.3;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);

    const light1 = new THREE.PointLight(0xfc00ff, 1);
    light1.position.set(10, 3, 15);
    scene.add(light1);

    scene.add(new THREE.PointLightHelper(light1));

    const light2 = new THREE.PointLight(0x00dbde, 1);
    light2.position.set(-10, 3, -15);
    scene.add(light2);

    scene.add(new THREE.PointLightHelper(light2));
}

function animate() {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
}
