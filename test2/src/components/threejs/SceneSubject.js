import * as THREE from 'three';
import Main from '../../models/Main';

export default function SceneSubject(scene, element, textures, jsonObjects) {
    return new Promise((resolve, reject) => {

        const color = element.selected ? 0xff0000 : 0xffffff;
        let mesh;

        function update() {
            const size = element.size || [0,0,0];
            switch (element.type) {
                case Main.TYPE_BOX:
                    mesh.position.set(element.position[0] + size[0]/2, element.position[1] + size[1]/2, element.position[2]+size[2]/2);
                    break;
                case Main.TYPE_SPHERE:
                    mesh.position.set(element.position[0] + size[0], element.position[1] + size[0], element.position[2]+size[0]/2);
                    break;
                case Main.TYPE_CYLINDER:
                    mesh.position.set(element.position[0] + size[0]/2, element.position[1] + size[0]/2, element.position[2]+size[2]/2);
                    break;
                case Main.TYPE_JSON:
                    mesh.position.set(element.position[0] + size[0]/2, element.position[1] + size[1]/2, element.position[2]+size[2]/2);
                    mesh.scale.set(element.size[0], element.size[1], element.size[2]);
                    break;
                default:
            }
            if (element.rotation) mesh.rotation.set(element.rotation[0], element.rotation[1], element.rotation[2]);
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

            const w = element.size ? element.size[0] : 1;
            const h = element.size ? element.size[1] : 1;
            const d = element.size ? element.size[2] : 1;
            let geometry;
            switch (element.type.toLowerCase()) {
                case Main.TYPE_CYLINDER:
                    geometry = new THREE.CylinderBufferGeometry(w, w, h, 128);
                    break;
                case Main.TYPE_BOX:
                    geometry = new THREE.BoxBufferGeometry(w,h,d);
                    break;
                case Main.TYPE_SPHERE:
                    geometry = new THREE.SphereBufferGeometry(w, 128, 128);
                    break;
                default:
                    geometry = new THREE.IcosahedronBufferGeometry(w, 128);
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