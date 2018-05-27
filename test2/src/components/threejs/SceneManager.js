import * as THREE from 'three';
import GeneralLights from './GeneralLights';
import SceneSubject from './SceneSubject';
import TexturesCache from './TexturesCache';
import JsonObjectsCache from "./JsonObjectsCache";

const OrbitControls = require('three-orbit-controls')(THREE);

export default (canvas, callbacks) => {

    const clock = new THREE.Clock();

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    };

    const textures = new TexturesCache();
    const jsonObjects = new JsonObjectsCache();

    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 20, 100);
    controls.enableKeys = false;
    if (camera.lookAt && camera.lookAt.length === 3) {
        controls.target = new THREE.Vector3(camera.lookAt[0], camera.lookAt[1], camera.lookAt[2]);
    } else {
        controls.target = new THREE.Vector3(50, 0, 0);
    }
    controls.update();
    let sceneLights = createSceneLights(scene);
    let sceneSubjects = [];
    document.addEventListener('mousedown', onDocumentMouseDown, false);

    function buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#eeeeee");

        return scene;
    }

    function buildRender({width, height}) {
        const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, alpha: true, preserveDrawingBuffer: true});
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        return renderer;
    }

    function buildCamera({width, height}) {
        const aspectRatio = width / height;
        const fieldOfView = 35;
        const nearPlane = 1;
        const farPlane = 1000;
        return new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    }

    function createSceneLights(scene) {
        return [new GeneralLights(scene, 0), new GeneralLights(scene, 1)];
    }

    function updateSceneSubjects(elements) {
        scene.children = scene.children.filter(el => {
            return el.type !== 'Mesh'
        });
        sceneSubjects = [];
        if (elements) {
            elements.forEach(element => {
                addSceneSubject(element);
            });
        }
    }

    function addSceneSubject(element) {
        new SceneSubject(scene, element, textures, jsonObjects).then(subject => {
            scene.add(subject.mesh);
            subject.update();
            sceneSubjects.push(subject);
        });
    }

    function getSnapShot() {
        return renderer.domElement.toDataURL("image/jpeg");
    }

    function onWindowResize() {
        const {width, height} = canvas;
        screenDimensions.width = width;
        screenDimensions.height = height;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    function update() {
        const elapsedTime = clock.getElapsedTime();

        for (let i = 0; i < sceneSubjects.length; i++)
            sceneSubjects[i].update(elapsedTime);

        for (let i = 0; i < sceneLights.length; i++)
            sceneLights[i].update(elapsedTime);

        controls.update();
        renderer.render(scene, camera);
    }

    function onDocumentMouseDown(event) {
        let mouse = {};
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        const vector = new THREE.Vector3(mouse.x, mouse.y, 1);
        vector.unproject(camera);

        const ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

        // create an array containing all objects in the scene with which the ray intersects
        const intersects = ray.intersectObjects(scene.children);
        if (intersects.length>0 && intersects[0].object.elementID) {
            if (callbacks['mousedown']) {
                callbacks['mousedown']({
                    id: intersects[0].object.elementID,
                    ctrlKey: event.ctrlKey,
                    altKey: event.altKey,
                    shiftKey: event.shiftKey
                });
            }
        }
    }

    return {
        update,
        onWindowResize,
        updateSceneSubjects,
        addSceneSubject,
        getSnapShot
    }
}