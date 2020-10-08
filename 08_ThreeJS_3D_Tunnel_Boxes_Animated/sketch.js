

import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js';
import { TrackballControls } from 'https://unpkg.com/three@0.120.1/examples/jsm/controls/TrackballControls.js';
import { ImprovedNoise } from 'https://unpkg.com/three@0.120.1/examples/jsm/math/ImprovedNoise.js';

var camera, controls, scene, renderer;
var light1;
var boxes = [];
var frame = 0;
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
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild(renderer.domElement);

    //Resize Listener
    window.addEventListener('resize', onWindowResize, false);

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

    for(let y = 1; y > -1; y-= 0.1){
        for(let x = -1; x < 1; x+= 0.1){
            
            const geometry = new THREE.BoxBufferGeometry(0.1, 0.1, 1);
            const material = new THREE.MeshPhongMaterial({ color: 0xcccccc});
            const box = new THREE.Mesh(geometry, material);

            box.position.x = x;
            box.position.y = y;
           

            plane1.add(box)
            boxes.push(box)
        }
    }

   


    // for(let box in boxes){
    //     console.log("createScene -> box", box)
    //     const height = Math.abs(perlin.noise(box.position.x,box.position.y,0))
    //     box.scale.set(1,1,height)
    //     box.position.z = -height/2;
    // }

    
    

    const positions = boxes[0].geometry.attributes.position.array;
    console.log("createScene -> positions", positions)
    const posVectors = []


    for(let i = 0; i < positions.length; i+=3){
        const x = positions[i]
        const y = positions[i+1]
        const z = positions[i+2]
        console.log("createScene -> x,y,z", i/3, ": ", x.toFixed(2)*20,y.toFixed(2)*20,z.toFixed(2)*20)
    }
    
    const vertices = boxes[0].geometry.vertices
    console.log("createScene -> vertices", vertices)

    const arrTwo = posVectors.filter((item, index) => posVectors.indexOf(item) == index);
    console.log("Dupl " + arrTwo);
    


    console.log("createScene -> positions", positions)

    plane1.rotation.x = Math.PI/2;
    plane1.position.y = -1;
    tunnelElement.add(plane1);

    // const plane2 = plane1.clone()
    // plane2.position.x = -1;
    // plane2.position.y = 0
    // plane2.rotation.y = -Math.PI/2;
    // tunnelElement.add(plane2);

    // const plane3 = plane1.clone()
    // plane3.position.x = 1;
    // plane3.position.y = 0
    // plane3.rotation.y = Math.PI/2;;
    // tunnelElement.add(plane3);

    // const plane4 = plane1.clone()
    // plane4.position.y = 1;
    // plane4.rotation.x = -Math.PI/2;
    // tunnelElement.add(plane4);


    tunnelElement.position.z = 2;
    scene.add(tunnelElement)

    // const newTunnelElement = tunnelElement.clone();
    // newTunnelElement.position.z = 0;
    // scene.add(newTunnelElement)
        


    // for(let x = -30; x < 30; x++){
    //     for(let z = -30; z < 30; z++){

    //         const height = (perlin.noise(x/10,0, z/10)+0.6)*10
    //         const size = Math.random() * 3;

    //         const geometry = new THREE.BoxGeometry(size + 1/height * 3, height, size + 1/height*3);
    //         const material = new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: false });
            
            
    //         const box = new THREE.Mesh( geometry, material );
    //         box.position.x = x;
    //         box.position.y = height/2-10 + Math.random()*0.1;
    //         box.position.z = z

    //         scene.add(box)
    //     }
    // }





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

    

    light1 = new THREE.PointLight(0xC6FFDD, 1);
    light1.position.set(0, 0, 4);
    scene.add(light1);
    // scene.add(new THREE.PointLightHelper(light1));

    
}

function animate() {
    requestAnimationFrame( animate );
    frame++
    controls.update();
    renderer.render( scene, camera );
    light1.position.set(camera.position.x, camera.position.y, camera.position.z)

    boxes.forEach((box) => {
        const height = Math.abs(perlin.noise(box.position.x + frame/400,box.position.y + frame/400,0))
        const size = Math.abs(perlin.noise(box.position.x + frame/1000,box.position.y + frame/1000,1))*8
        const width = Math.abs(perlin.noise(box.position.x + frame/888,box.position.y + frame/888,2))*8
        box.scale.set(size,width,height)
        box.position.z = -height/2;
    })
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}
