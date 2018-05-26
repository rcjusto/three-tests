import * as THREE from 'three';
import Main from '../../models/Main';

export default function SceneSubject(scene, element, textures, jsonObjects) {
    return new Promise((resolve, reject) => {

        const color = element.selected ? 0xff0000 : 0xffffff;
        let mesh;

        function update() {
            mesh.position.set(element.position[0], element.position[1], element.position[2]);
            if (element.scale) mesh.scale.set(element.scale, element.scale, element.scale);
            if (element.rotation) mesh.rotation.set(element.rotation[0], element.rotation[1], element.rotation[2]);
            if (element.size) mesh.scale.set(element.size[0], element.size[1], element.size[2]);
        }

        if (element.type === Main.TYPE_JSON && element.url) {

            jsonObjects.getJsonObject(element.url)
                .then(data => {

                    let materials = data.materials;
                    if (element.selected) {
                        materials = new THREE.MeshStandardMaterial({flatShading: true, color: color});
                    }

                    mesh = new THREE.Mesh(data.geometry, materials);
                    mesh.elementID = element.id;
                    resolve({mesh: mesh, update: update})
                })
                .catch(err => {
                    reject(err);
                });

        } else {

            let geometry;
            switch (element.type.toLowerCase()) {
                case Main.TYPE_CYLINDER:
                    geometry = new THREE.CylinderBufferGeometry(1, 1, 1, 128);
                    break;
                case Main.TYPE_BOX:
                    geometry = new THREE.BoxBufferGeometry(1,1,1);
                    break;
                case Main.TYPE_SPHERE:
                    geometry = new THREE.SphereBufferGeometry(1, 128, 128);
                    break;
                default:
                    geometry = new THREE.IcosahedronBufferGeometry(1, 2);
                    break;

            }

            if (element.texture) {
                textures.getTexture(element.texture)
                    .then(texture => {

                        let material = new THREE.MeshStandardMaterial({flatShading: true, map: texture,  color: color});
                        if (element.selected) {
                            material = new THREE.MeshStandardMaterial({flatShading: true, color: color});
                        }

                        mesh = new THREE.Mesh(geometry, material);
                        mesh.elementID = element.id;
                        resolve({mesh: mesh, update: update});
                    })
                    .catch(() => {
                        mesh = new THREE.Mesh(
                            geometry,
                            new THREE.MeshStandardMaterial({flatShading: true, color: color}));
                        mesh.elementID = element.id;

                        resolve({mesh: mesh, update: update});
                    })
            } else {
                mesh = new THREE.Mesh(
                    geometry,
                    new THREE.MeshStandardMaterial({flatShading: true, color: color}));

                mesh.elementID = element.id;
                resolve({mesh: mesh, update: update});
            }
        }
    })

}