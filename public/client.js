import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import Stats from './jsm/libs/stats.module.js'
import { GUI } from './jsm/libs/lil-gui.module.min.js'

// Set up the scene
const scene = new THREE.Scene();

// Set up the camera
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera.position.set(0, 0, 3); // Adjusted position to center the globe

// Set up the renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); // Adjusted size to match viewport
document.getElementById('rendererContainer').appendChild(renderer.domElement); // Append to container div

// Create a sphere geometry with higher resolution
const geometry = new THREE.SphereGeometry(1, 64, 64);

// Create a material with a high-resolution texture and anisotropic filtering
const loader = new THREE.TextureLoader();
const texture = loader.load('/assets/globe_flat.jpeg');
texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.6,
    metalness: 0.3
});

// Create a mesh with the geometry and material
const globe = new THREE.Mesh(geometry, material);
globe.scale.multiplyScalar(1.5); // Increase the size by 50%
scene.add(globe);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Increase ambient light intensity
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2); // Increase directional light intensity
directionalLight.position.set(1, 1, 1).normalize(); // Set position
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1); // Increase point light intensity
pointLight.position.set(5, 10, 5);
scene.add(pointLight);

// Set up the globe's pivot point
const pivot = new THREE.Object3D();
pivot.add(globe);
scene.add(pivot);

// Set up the controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.enablePan = true;
controls.enableRotate = true;

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    pivot.rotation.y += 0.005; // Rotate the pivot instead of the globe
    renderer.render(scene, camera);
}
animate();

// Resize event listener
window.addEventListener('resize', () => {
    const aspect = window.innerWidth / window.innerHeight;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight); // Adjusted size to match viewport
});
