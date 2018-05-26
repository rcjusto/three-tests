export default class JSONModels {

    static URL = "http://files-api.rogeliocaballero.com";
    static FOLDER = "/objects";


    static getAll() {
        return fetch(JSONModels.URL + JSONModels.FOLDER + "/", {
            method: "GET",
        })
            .then(res => {
                return JSONModels.makeResponse(res);
            })
            .catch(e => {
                return Promise.reject(e);
            })
    }

    static getURL(id) {
        return JSONModels.URL + JSONModels.FOLDER + "/" + id;
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
