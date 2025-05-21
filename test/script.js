import {Pane} from '../node_modules/tweakpane/dist/tweakpane.min.js';
import * as TweakpaneMediaPlugin from '../dist/tweakpane-plugin-media.js';
import * as THREE from 'three'

window.THREE = THREE;

const image = document.querySelector('img');
const video = document.querySelector('video');

const PARAMS = {
    image,
    video,
}

const pane = new Pane();

// Register plugin
pane.registerPlugin(TweakpaneMediaPlugin);

pane.addBinding(PARAMS, 'image', {
    label: 'Image',
    view: 'image',
    height: 100,
    objectFit: 'cover',
    showMonitor: true,
}).on('change', (ev) => {
    console.log({ new: ev.value });
    image.src = ev.value.src;
});

pane.addBinding(PARAMS, 'video', {
    label: 'Video',
    view: 'video',
    height: 100,
    objectFit: 'cover',
    showMonitor: true,
}).on('change', (ev) => {
    console.log({ new: ev.value });
    video.src = ev.value.src;
});

const material = new THREE.MeshBasicMaterial();
const texture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/uv_grid_opengl.jpg')
material.map = texture;


pane.addBinding(material, 'map', {
    label: 'Texture',
    view: 'texture',
    height: 100,
    showMonitor: true
  }).on('change', (ev) => { 
    console.log('change', ev);
    
    // if(ev.value.isTexture) {
    //     material.map = ev.value;
    // }
});

// Create a scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(600, 400);
document.body.appendChild(renderer.domElement);
renderer.domElement.style.position = 'absolute'
renderer.domElement.style.top = '0'
// Create a cube and apply the material
const geometry = new THREE.BoxGeometry();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position the camera
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube for some animation
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();