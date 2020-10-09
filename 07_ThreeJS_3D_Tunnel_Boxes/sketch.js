

import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js';
import { TrackballControls } from 'https://unpkg.com/three@0.120.1/examples/jsm/controls/TrackballControls.js';
import { ImprovedNoise } from 'https://unpkg.com/three@0.120.1/examples/jsm/math/ImprovedNoise.js';

var camera, controls, scene, renderer;
var light1;
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


    const geometry = new THREE.PlaneBufferGeometry( 2, 2, 1 );
    const material = new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true, side: THREE.DoubleSide});
    
    
    const tunnelElement = new THREE.Object3D()

    const plane1 = new THREE.Mesh( geometry, material );
    
    for(let x = -1; x < 1; x+= 0.1){
        for(let y = -1; y < 1; y+= 0.1){

            const height = Math.abs(perlin.noise(x,y,0))
            const geometry = new THREE.BoxBufferGeometry(0.1, 0.1, height);
            const material = new THREE.MeshPhongMaterial({ color: 0xcccccc});
            const box = new THREE.Mesh(geometry, material);

            box.position.x = x;
            box.position.y = y;
            box.position.z = -height/2;

            plane1.add(box)
        }
    }

    plane1.rotation.x = Math.PI/2;
    plane1.position.y = -1;
    tunnelElement.add(plane1);

    const plane2 = plane1.clone()
    plane2.position.x = -1;
    plane2.position.y = 0
    plane2.rotation.y = -Math.PI/2;
    tunnelElement.add(plane2);

    const plane3 = plane1.clone()
    plane3.position.x = 1;
    plane3.position.y = 0
    plane3.rotation.y = Math.PI/2;;
    tunnelElement.add(plane3);

    const plane4 = plane1.clone()
    plane4.position.y = 1;
    plane4.rotation.x = -Math.PI/2;
    tunnelElement.add(plane4);


    tunnelElement.position.z = 2;
    scene.add(tunnelElement)

    const newTunnelElement = tunnelElement.clone();
    newTunnelElement.position.z = 0;
    scene.add(newTunnelElement)
    

    light1 = new THREE.PointLight(0xC6FFDD, 1);
    light1.position.set(0, 0, 4);
    scene.add(light1);
    // scene.add(new THREE.PointLightHelper(light1));

    
}

function animate() {
    controls.update();
    renderer.render( scene, camera );
    light1.position.set(camera.position.x, camera.position.y, camera.position.z)
    
    requestAnimationFrame( animate );
}
