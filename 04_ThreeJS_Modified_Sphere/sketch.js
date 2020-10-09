
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


    //geometry.vertices.map(vec => vec.add(new THREE.Vector3(2,2,2)));
    
    console.log("createScene -> sphere.vertices", geometry.vertices)
    console.log("createScene -> sphere.faces", geometry.faces)



    // const geometry = new THREE.Geometry();
    // geometry.vertices.push(
    //     new THREE.Vector3(-1, -1,  1),  // 0
    //     new THREE.Vector3( 1, -1,  1),  // 1
    //     new THREE.Vector3(-1,  1,  1),  // 2
    //     new THREE.Vector3( 1,  1,  1),  // 3
    //     new THREE.Vector3(-1, -1, -1),  // 4
    //     new THREE.Vector3( 1, -1, -1),  // 5
    //     new THREE.Vector3(-1,  1, -1),  // 6
    //     new THREE.Vector3( 1,  1, -1),  // 7
    // );

    // geometry.faces.push(
    //     // front
    //     new THREE.Face3(0, 3, 2),
    //     new THREE.Face3(0, 1, 3),
    //     // right
    //     new THREE.Face3(1, 7, 3),
    //     new THREE.Face3(1, 5, 7),
    //     // back
    //     new THREE.Face3(5, 6, 7),
    //     new THREE.Face3(5, 4, 6),
    //     // left
    //     new THREE.Face3(4, 2, 6),
    //     new THREE.Face3(4, 0, 2),
    //     // top
    //     new THREE.Face3(2, 7, 6),
    //     new THREE.Face3(2, 3, 7),
    //     // bottom
    //     new THREE.Face3(4, 1, 0),
    //     new THREE.Face3(4, 5, 1),
    //   );

    //   geometry.computeFaceNormals();


    // const material = new THREE.MeshPhongMaterial({ color: 0xffffff * Math.random(), flatShading: false });
    const material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh)

    

    // Add light
    // const light = new THREE.DirectionalLight(0xffffff);
    // light.position.set(100, 1, 1);
    // scene.add(light);

    
    const light1 = new THREE.PointLight(0xFFFFFF, 1);
    light1.position.set(10, 1, 1);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xFFFFFF, 1);
    light2.position.set(-4, 3, 3);
    scene.add(light2);







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
