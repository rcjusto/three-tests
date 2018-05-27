export default class SnapShots {

    static URL = "http://files-api.rogeliocaballero.com";
    static FOLDER = "/snapshots";
    static DEFAULT_EXT = ".jpg";


    static getAll() {
        return fetch(SnapShots.URL + SnapShots.FOLDER + "/", {
            method: "GET",
        })
            .then(res => {
                return this.makeResponse(res);
            })
            .catch(e => {
                return Promise.reject(e);
            })
    }

    static getURL(id) {
        return this.URL + this.FOLDER + "/" + id + this.DEFAULT_EXT;
    }

    static put(id,data) {
        return fetch(this.URL + this.FOLDER + "/" + id + this.DEFAULT_EXT,
            {
                method: "PUT",
                body: data
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
