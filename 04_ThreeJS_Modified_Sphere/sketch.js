
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
    scene.background = new THREE.Color( 0x292929 );


    // const geometry = new THREE.SphereBufferGeometry(1,20,20)


    const geometry = new THREE.SphereGeometry( 1, 30, 30);
    geometry.vertices.map(vec => {
        return vec.multiplyScalar(1+Math.random()*0.8)
    });
    geometry.computeVertexNormals()


    // const material = new THREE.MeshPhongMaterial({ color: 0xffffff * Math.random(), flatShading: false });
    const material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh)


    // Add light (only for the Phong Material)

    // const light1 = new THREE.PointLight(0xFFFFFF, 1);
    // light1.position.set(10, 1, 1);
    // scene.add(light1);

    // const light2 = new THREE.PointLight(0xFFFFFF, 1);
    // light2.position.set(-4, 3, 3);
    // scene.add(light2);

}

function animate() {
    requestAnimationFrame( animate );
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01
    controls.update();
    renderer.render( scene, camera );
}
