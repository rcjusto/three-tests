export default class JSONModels {

    static URL = "http://files-api.rogeliocaballero.com";
    static FOLDER = "/objects";
    static DEFAULT_EXT = ".json";


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

    static put(id,data) {
        return fetch(this.URL + this.FOLDER + "/" + id + this.DEFAULT_EXT,
            {
                method: "PUT",
                body: 'data:text/json;base64,' + Buffer.from(data).toString("base64")
            })
            .then(() => {
                return Promise.resolve();
            })
            .catch(e => {
                return Promise.reject(e);
            })
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
