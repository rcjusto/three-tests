class ApiService {

    static URL = "http://json-api.rogeliocaballero.com";
    static FOLDER = "/wood-models-2";
    static API_KEY = "123";


    static getAll() {
        return fetch(ApiService.URL + ApiService.FOLDER, {
            headers: {
                'Authorization': ApiService.API_KEY
            },
            method: "GET",
        })
            .then(res => {
                return ApiService.makeResponse(res);
            })
            .catch(e => {
                return Promise.reject(e);
            })
    }

    static getOne(id) {
        return fetch(ApiService.URL + ApiService.FOLDER + "/" + id, {
            headers: {
                'Authorization': ApiService.API_KEY
            },
            method: "GET",
        })
            .then(res => {
                return ApiService.makeResponse(res);
            })
            .catch(e => {
                return Promise.reject(e);
            })
    }

    static create(data) {
        return fetch(ApiService.URL + ApiService.FOLDER, {
            headers: {
                'Authorization': ApiService.API_KEY,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(res => {
                return ApiService.makeResponse(res);
            })
            .catch(e => {
                return Promise.reject(e);
            })
    }

    static update(id, data) {
        return fetch(ApiService.URL + ApiService.FOLDER + "/" + id, {
            headers: {
                'Authorization': ApiService.API_KEY,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(data)
        })
            .then(res => {
                return ApiService.makeResponse(res);
            })
            .catch(e => {
                return Promise.reject(e);
            })
    }

    static delete(id) {
        return fetch(ApiService.URL + ApiService.FOLDER + "/" + id, {
            headers: {
                'Authorization': ApiService.API_KEY,
                'Content-Type': 'application/json'
            },
            method: "DELETE"
        })
            .then(res => {
                return Promise.resolve(res);
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

    static getObjectList = (l) => {
        let list = [];
        l.forEach((e) => {
            if (!e.hide) {
                if (e.pos && e.siz) {
                    list.push({
                        id: e.id,
                        name: e.name,
                        position: e.pos,
                        rotation: e.rotation,
                        size: e.siz,
                        type: e.type || "wood"
                    });
                }
                if (e.children) {
                    list = list.concat(ApiService.getObjectList(e.children));
                }
            }
        });
        return list;
    };


}

export default ApiService;