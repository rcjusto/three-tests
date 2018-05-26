import * as THREE from 'three';
import JSONModels from "../../services/JSONModels";

export default class TexturesCache {

    constructor() {
        this.jsonLoader = new THREE.JSONLoader();
        this.objectLoader = new THREE.ObjectLoader();
        this._objects = {};
    }

    getJsonObject(url) {
        return new Promise((resolve, reject) => {
            if (this._objects[url]) {
                resolve(this._objects[url]);
            } else {
                let self = this;
                const file = JSONModels.getURL(url);
                this.tryJSONLoader(file)
                    .then((data) => {
                        self._objects[url] = data;
                        resolve(self._objects[url]);
                    })
                    .catch(() => {
                        this.tryObjectLoader(file)
                            .then(data => {
                                self._objects[url] = data;
                                resolve(self._objects[url]);
                            })
                    });
            }
        })
    }

    tryJSONLoader(file) {
        return new Promise((resolve, reject) => {
            try {
                this.jsonLoader.load(
                    file,
                    function (geometry, materials) {
                        resolve({geometry: geometry, materials: materials});
                    },
                    undefined,
                    function (err) {
                        reject(err);
                    }
                );
            } catch (err) {
                reject(err);
            }
        }) ;
    }

    tryObjectLoader(file) {
        return new Promise((resolve, reject) => {
            this.objectLoader.load(
                file,
                function ( geometry, materials ) {
                    resolve({geometry: geometry, materials: materials});
                },
                undefined,
                function ( err ) {
                    reject(err);
                }
            )
        }) ;
    }

}
