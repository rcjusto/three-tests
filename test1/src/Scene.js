import React, {Component} from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import AllCubes from './components/AllCubes';

import './App.css';
const OrbitControls = require('three-orbit-controls')(THREE);

class Scene extends Component {

    constructor(props, context) {
        super(props, context);

        this.timeout = null;
        this.state = {
            control: {},
            width: 100,
            height: 100
        };
        this.position = new THREE.Vector3(0,0,250);

        this.onControlsChanged = this.onControlsChanged.bind(this);
        this.savePosition = this.savePosition.bind(this);
    }

    savePosition() {
        this.props.onCameraChanged({
            lookAt: [this.state.controls.target.x, this.state.controls.target.y, this.state.controls.target.z],
            position: [this.state.camera.position.x, this.state.camera.position.y, this.state.camera.position.z]
        });
        clearTimeout(this.timeout);
    }

    onControlsChanged() {
        if (this.state.camera) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(this.savePosition, 2000);
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this._updateDimensions);

        let {camera} = this.refs;

        const controls = new OrbitControls(camera, document.getElementsByTagName("canvas")[0]);
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.05;
        controls.noKeys = true;
        controls.addEventListener('change',this.onControlsChanged ,false);

        if (this.props.camera && this.props.camera.lookAt && this.props.camera.lookAt.length===3) {
            controls.target = new THREE.Vector3(this.props.camera.lookAt[0], this.props.camera.lookAt[1], this.props.camera.lookAt[2]);
        } else {
            controls.target = new THREE.Vector3(50,0,0);
        }
        controls.update();

        this.setState({
            camera: camera,
            controls: controls
        });
        this._updateDimensions();
    }

    _updateDimensions = () => {
        this.setState({
            width : this.refs.container ? this.refs.container.parentNode.clientWidth: window.innerWidth,
            height: window.innerHeight
        });
    };

    componentWillUnmount() {
        window.removeEventListener("resize", this._updateDimensions);
    }

    render() {
        const {width, height, camera, controls} = this.state;

        if (this.props.camera && this.props.camera.position && this.props.camera.position.length===3) {
            this.position = new THREE.Vector3(this.props.camera.position[0],this.props.camera.position[1],this.props.camera.position[2]);
        }
        if (controls) controls.update();
        return (<div
            ref="container"
        >
            <React3
                width={width || 100}
                height={height || 100}
                antialias
                pixelRatio={window.devicePixelRatio}
                mainCamera="mainCamera"
                sortObjects={false}
                shadowMapEnabled
                shadowMapType={THREE.PCFShadowMap}
                clearColor={0xf0f0f0}
            >
                <resources>
                    <boxGeometry
                        resourceId="boxGeometry"
                        width={40}
                        height={40}
                        depth={40}
                    />
                    <meshBasicMaterial
                        resourceId="highlightMaterial"
                        color={0xffff00}
                        wireframe
                    />
                </resources>
                <scene ref="scene">
                    <perspectiveCamera
                        fov={35}
                        aspect={width / height}
                        near={1}
                        far={10000}
                        name="mainCamera"
                        ref="camera"
                        position={this.position}
                    />
                    <ambientLight
                        color={0x505050}
                        intensity={2}
                    />
                    <spotLight
                        color={0xffffff}
                        intensity={1}
                        position={new THREE.Vector3(-100, 20, 100)}
                        lookAt={new THREE.Vector3(44, -30, 20)}

                        castShadow
                        shadowCameraNear={200}
                        shadowCameraFar={10000}
                        shadowCameraFov={50}

                        shadowBias={-0.00022}

                        shadowMapWidth={2048}
                        shadowMapHeight={2048}
                    />
                    <AllCubes
                        camera={camera}
                        data={this.props.data}
                        selected={this.props.selected}
                    />
                </scene>
            </React3>
        </div>);
    }
}

export default Scene;
