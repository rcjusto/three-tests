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
        if (callbacks['mousedown']) {
            callbacks['mousedown']({
                id: intersects.length > 0 && intersects[0].object.elementID ? intersects[0].object.elementID : null,
                ctrlKey: event.ctrlKey,
                altKey: event.altKey,
                shiftKey: event.shiftKey
            });
        }
    }

    function getCameraAxis() {
        const v = [camera.position.x - controls.target.x,camera.position.y - controls.target.y, camera.position.z - controls.target.z];
        if (v[0] >= v[1] && v[0] >= v[2]) return 'X';
        else if (v[1] >= v[0] && v[1] >= v[2]) return 'Y';
        else return 'Z';
    }

    return {
        update,
        onWindowResize,
        updateSceneSubjects,
        addSceneSubject,
        getSnapShot,
        getCameraAxis
    }
}