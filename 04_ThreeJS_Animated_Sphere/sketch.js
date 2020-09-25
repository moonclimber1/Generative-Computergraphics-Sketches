
// import * as THREE from './three.module.js';
// import { TrackballControls } from './TrackballControls.js';


import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js';
import { TrackballControls } from 'https://unpkg.com/three@0.120.1/examples/jsm/controls/TrackballControls.js';


var camera, controls, scene, renderer, mesh;

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
    scene.background = new THREE.Color( 0xcccccc );


    const geometry = new THREE.SphereBufferGeometry(1,20,20)
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff * Math.random(), flatShading: false });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh)

    

    // Add light
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(100, 1, 1);
    scene.add(light);





    // scene.fog = new THREE.FogExp2( 0xcccccc, 0.1 );
    
    // let startColor = new THREE.Color(0x30cfd0)
    // let endColor = new THREE.Color(0x330867)

    // const cubeNr = 1000;
    // for(let i = 0; i < cubeNr; i++){
    //     let geometry = new THREE.BoxGeometry();
    //     let material = new THREE.MeshBasicMaterial();
    //     material.color = new THREE.Color(startColor).lerp(endColor, i/cubeNr)

    //     let cube = new THREE.Mesh( geometry, material );
        
    //     cube.position.x = ( Math.random() - 0.5 ) * 30;
    //     cube.position.y = ( Math.random() - 0.5 ) * 30;
    //     cube.position.z = ( Math.random() - 0.5 ) * 30;

    //     scene.add( cube );
    // }
}

function animate() {
    requestAnimationFrame( animate );
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01
    controls.update();
    renderer.render( scene, camera );
}
