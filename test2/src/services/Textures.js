export default class Textures {

    static URL = "http://files-api.rogeliocaballero.com";
    static FOLDER = "/materials";


    static getAll() {
        return fetch(Textures.URL + Textures.FOLDER + "/", {
            method: "GET",
        })
            .then(res => {
                return Textures.makeResponse(res);
            })
            .catch(e => {
                return Promise.reject(e);
            })
    }

    static getURL(id) {
        return Textures.URL + Textures.FOLDER + "/" + id;
    }

    static makeResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject({
                error: res.statusText,
                code: res.status
            });
        }
    }

}
