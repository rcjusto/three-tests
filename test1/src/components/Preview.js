import React, {Component} from 'react';
import ApiService from "../services/Api";
import * as THREE from "three";
import AllCubes from "./AllCubes";
import React3 from 'react-three-renderer';
import * as styles from "./Preview.style";

export default class Preview extends Component {

    render() {
        console.log(this.props.data);
        const list = ApiService.getObjectList(this.props.data);
        const lookAt = (this.props.camera && this.props.camera.lookAt) ? this.props.camera.lookAt : [40,0,0];
        const position = (this.props.camera && this.props.camera.position) ? this.props.camera.position : [-40,30,250];
        const width = 300, height = 200;
        const cameraPosition = new THREE.Vector3(position[0], position[1], position[2]);
        const cameraLookAt = new THREE.Vector3(lookAt[0], lookAt[1], lookAt[2]);
        const camera = this.refs.camera;
        return (<div style={styles.CONTAINER}>
            <React3
                width={width}
                height={height}
                antialias
                pixelRatio={window.devicePixelRatio}
                mainCamera="mainCamera"
                sortObjects={false}
                shadowMapEnabled
                shadowMapType={THREE.PCFShadowMap}
                clearColor={0xf8f8f8}
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
                        position={cameraPosition}
                        lookAt={cameraLookAt}
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
                        data={list}
                        selected={null}
                    />
                </scene>
            </React3>
        </div>);
    }
}
