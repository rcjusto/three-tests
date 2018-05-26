import * as THREE from 'three';
import Textures from "../../services/Textures";

export default class TexturesCache {

    constructor() {
        this.loader = new THREE.TextureLoader();
        this._textures = {};
    }

    getTexture(url) {
        return new Promise((resolve, reject) => {
            if (this._textures[url]) {
                resolve(this._textures[url]);
            } else {
                let self = this;
                this.loader.load(
                    // resource URL
                    Textures.getURL(url),

                    // onLoad callback
                    function ( texture ) {
                        self._textures[url] = texture;
                        resolve(self._textures[url]);
                    },

                    // onProgress callback currently not supported
                    undefined,

                    // onError callback
                    function ( err ) {
                        reject(err);
                    }
                )
            }
        })
    }


}
