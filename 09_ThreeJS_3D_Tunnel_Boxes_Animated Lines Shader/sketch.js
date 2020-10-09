

import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js';
import { TrackballControls } from 'https://unpkg.com/three@0.120.1/examples/jsm/controls/TrackballControls.js';
import { ImprovedNoise } from 'https://unpkg.com/three@0.120.1/examples/jsm/math/ImprovedNoise.js';
import Stats from 'https://unpkg.com/three@0.120.1/examples/jsm/libs/stats.module.js';
import { GlitchPass } from 'https://unpkg.com/three@0.120.1/examples/jsm/postprocessing/GlitchPass.js';
import { RenderPass } from 'https://unpkg.com/three@0.120.1/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from 'https://unpkg.com/three@0.120.1/examples/jsm/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'https://unpkg.com/three@0.120.1/examples/jsm/postprocessing/UnrealBloomPass.js';


var camera, composer, controls, scene, renderer;
var light1;
var boxes = [];
var frame = 0;
var perlin = new ImprovedNoise();

var lastTunnel = new THREE.Object3D()
var currentTunnel = new THREE.Object3D()

var stats;

var time = new Date().getTime();


init();
animate();

function init(){

    // Set up camera
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.5, 4 );
    camera.position.z = 5;
    
    // Set up scene
    createScene();


    


    // Set up renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild(renderer.domElement);


    // Glitch
    composer = new EffectComposer(renderer);

    var renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    var bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
    bloomPass.threshold = 0
    bloomPass.strength = 2;
    bloomPass.radius = 0;
    composer.addPass( bloomPass );

    //Resize Listener
    window.addEventListener('resize', onWindowResize, false);

    // Set up trackball controls
    controls = new TrackballControls( camera, renderer.domElement );
    controls.rotateSpeed = 4.0;
    controls.zoomSpeed = 2.0;
    controls.panSpeed = 4.0;
    controls.keys = [ 65, 83, 68 ];

    // Setup stats
    stats = new Stats();
    document.body.appendChild(stats.dom);

}

function createScene(){
    scene = new THREE.Scene();

    scene.background = new THREE.Color( 0x000000 );
    scene.fog = new THREE.FogExp2( 0x000000, 0.4);


    const plane1 = new THREE.Object3D();

    for(let y = 2; y > -2; y-= 0.15){
        for(let x = -1; x < 1; x+= 0.15){
            
            const geometry = new THREE.BoxBufferGeometry(0.1, 0.1, 1);
            var edges = new THREE.EdgesGeometry( geometry );
            var box = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x49a09d } ) );

            
            const material = new THREE.MeshPhongMaterial({ color: 0xcccccc});


            box.position.x = x;
            box.position.y = y;
           
            plane1.add(box)
            boxes.push(box)
        }
    }


    


    plane1.rotation.x = Math.PI/2;
    plane1.position.y = -1;
    currentTunnel.add(plane1);

    const plane2 = plane1.clone()
    plane2.position.x = -1;
    plane2.position.y = 0
    plane2.rotation.y = -Math.PI/2;
    currentTunnel.add(plane2);

    const plane3 = plane1.clone()
    plane3.position.x = 1;
    plane3.position.y = 0
    plane3.rotation.y = Math.PI/2;
    currentTunnel.add(plane3);

    const plane4 = plane1.clone()
    plane4.position.y = 1;
    plane4.rotation.x = Math.PI/2;
    plane4.rotation.y = Math.PI
    currentTunnel.add(plane4);

    currentTunnel.position.z = 2;
    lastTunnel = currentTunnel.clone()
    lastTunnel.position.z = 6
    scene.add(currentTunnel)
    scene.add(lastTunnel)

    

    // light1 = new THREE.PointLight(0xffffff, 0.5);
    // light1.position.set(0, 0, 4);
    // scene.add(light1);
    // scene.add(new THREE.PointLightHelper(light1));

    
}

function animate() {

    // const now = new Date().getTime();
    // const dt = now - time;
    // time = now;

    requestAnimationFrame( animate );


    frame++
    // controls.update();
    // renderer.render( scene, camera );
    composer.render()
    camera.position.z -= 0.04
    camera.rotation.z = frame/300 * Math.PI
    // light1.position.set(camera.position.x, camera.position.y, camera.position.z)



    if(camera.position.z < (currentTunnel.position.z + 3)){
        lastTunnel.position.z = currentTunnel.position.z - 4;
        
        const tmp = currentTunnel;
        currentTunnel = lastTunnel;
        lastTunnel = tmp;
    }


    var tunnels = [currentTunnel, lastTunnel]
    tunnels.forEach(tunnel => {
        tunnel.children.forEach((wall,index) =>{
            wall.children.forEach(box => {
                // const height = Math.abs(perlin.noise(box.position.x + frame/400,box.position.y + frame/400,camera.position.z))*1.3
                const height = Math.abs(perlin.noise(box.position.x,box.position.y,camera.position.z/4))*1.1
                const size = Math.abs(perlin.noise(box.position.x + frame/1000,box.position.y + frame/1000,index + 1))*8
                const width = Math.abs(perlin.noise(box.position.x + frame/888,box.position.y + frame/888,index + 2))*8
                box.scale.set(size,width,height)
                box.position.z = -height/2;
            })
        })
    })

    
    stats.update();
   

    

    
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}
