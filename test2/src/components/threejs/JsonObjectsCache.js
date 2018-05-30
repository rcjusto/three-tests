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
                fetch(file)
                    .then(res => {
                        res.json()
                            .then(data => {
                                if (data.object) {
                                    this.objectLoader.parse(data, (obj) => {
                                        self._objects[url] = {type: 'object', obj: obj};
                                        resolve(self._objects[url]);
                                    })
                                } else {
                                    const obj = this.jsonLoader.parse(data);
                                    self._objects[url] = {type:'json', obj:obj};
                                    resolve(self._objects[url]);
                                }
                            })
                    })
                    .catch(err => {
                        console.log(err);
                        reject(err)
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
        });
    }

    tryObjectLoader(file) {
        return new Promise((resolve, reject) => {
            this.objectLoader.load(
                file,
                function (geometry, materials) {
                    resolve({geometry: geometry, materials: materials});
                },
                undefined,
                function (err) {
                    reject(err);
                }
            )
        });
    }

}
