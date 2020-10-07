
// import * as THREE from './three.module.js';
// import { TrackballControls } from './TrackballControls.js';


import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js';
import { TrackballControls } from 'https://unpkg.com/three@0.120.1/examples/jsm/controls/TrackballControls.js';
import { ImprovedNoise } from 'https://unpkg.com/three@0.120.1/examples/jsm/math/ImprovedNoise.js';


var camera, controls, scene, renderer, mesh;

var perlin = new ImprovedNoise();
var noiseOffset = 0;
var sphereVertices;

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

    const geometry = new THREE.SphereGeometry( 1.5, 60, 60);

    sphereVertices = _.cloneDeep(geometry.vertices)
    geometry.vertices.map(vec => {
        return vec.multiplyScalar(1.5+perlin.noise(vec.x,vec.y,vec.z))
    });
    geometry.computeVertexNormals()

    console.log("createScene -> initialVertices", sphereVertices)
    console.log("createScene -> geometry.vertices", geometry.vertices)
    
    // const color = 0xffffff * Math.random();
    const color = 10903978.777085803;
    console.log("createScene -> color", color)
    console.log("createScene -> decimalToHexString(color)", decimalToHexString(color))

    const material = new THREE.MeshPhongMaterial({ color: color, flatShading: false });
    // const material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh)

    

    // Add light
    // const light = new THREE.DirectionalLight(0xffffff);
    // light.position.set(100, 1, 1);
    // scene.add(light);

    
    const light1 = new THREE.PointLight(0xfc00ff, 1);
    light1.position.set(10, 1, 1);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x00dbde, 1);
    light2.position.set(-4, 3, 3);
    scene.add(light2);

}

function animate() {
    mesh.rotation.x += 0.004
    mesh.rotation.y += 0.004
    noiseOffset += 0.006

    const newVertices = _.cloneDeep(sphereVertices);

    newVertices.map(vec => {
        return vec.multiplyScalar(1 + perlin.noise(vec.x + noiseOffset,vec.y + noiseOffset,vec.z + noiseOffset))
    });
    mesh.geometry.vertices = newVertices;
    mesh.geometry.computeVertexNormals()


    // //mesh.geometry.vertices[0].multiplyScalar(1 + noiseOffset)
    
    // mesh.geometry.vertices.map(vec => {
    //     //return vec.multiplyScalar(0.5 + perlin.noise(vec.x,vec.y,vec.z + noiseOffset))
    //     return vec.multiplyScalar(1+noiseOffset)
        
    //     // return vec.multiplyScalar(1 + Math.sin(noiseOffset))
    // });

    // console.log("animate -> Math.sin(noiseOffset)", Math.sin(noiseOffset))

    // // scene.remove(mesh)
    // // scene.add(mesh)

    // // mesh.geometry.computeFaceNormals();

    // mesh.geometry.verticesNeedUpdate = true;
    // mesh.geometry.normalsNeedUpdate = true;
    

    // mesh.geometry.verticesNeedUpdate = true;
    mesh.geometry.elementsNeedUpdate = true;
    // mesh.geometry.morphTargetsNeedUpdate = true;
    // mesh.geometry.uvsNeedUpdate = true;
    // mesh.geometry.normalsNeedUpdate = true;
    // mesh.geometry.colorsNeedUpdate = true;
    // mesh.geometry.tangentsNeedUpdate = true;


    controls.update();
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
}


function decimalToHexString(number)
{
  if (number < 0)
  {
    number = 0xFFFFFFFF + number + 1;
  }

  return number.toString(16).toUpperCase();
}