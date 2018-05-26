import React, {Component} from 'react';

import Scene from "../Scene";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Projection from "./Projection";
import Materials from "./Materials";
import Tree from "./Tree";
import ApiService from "../services/Api";
import Properties from "./Properties";
import {confirm} from "./ConfirmModal";
import * as styles from "./Edit.style";

const uuidv4 = require('uuid/v4');

class Edit extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            id: null,
            name: '',
            tree: [],
            list: [],
            camera: {},
            selected: null,
            copiedElement: null
        };
    }

    setId = (l) => {
        l.forEach((e, index) => {
            e.id = uuidv4();
            if (e.children) {
                this.setId(e.children);
            }
        });
    };

    getParentOf = (el, l) => {
        let res = null;
        l.forEach(e => {
            if (e.children) {
                e.children.forEach((c) => {
                    if (c.id === el.id) {
                        res = e;
                    }
                });
            }
        });
        if (res === null) {
            l.forEach(e => {
                if (e.children) {
                    res = this.getParentOf(el, e.children);
                }
            });
        }
        return res;
    };


    componentDidMount() {
        if (this.props.computedMatch) {
            this.loadDoc(this.props.computedMatch.params.id);
        }
    }

    loadDoc(id) {
        ApiService.getOne(id).then(res => {
            this.setState({
                id: id,
                name: res.name
            });
            if (res.data) {
                this.setId(res.data);
                let list = ApiService.getObjectList(res.data);
                this.setState({
                    list: list,
                    tree: res.data,
                    camera: res.camera
                });
            }
        })
    }

    saveDoc() {
        let res = {
            id: this.state.id,
            name: this.state.name,
            data: this.state.tree,
            camera: this.state.camera
        };
        res.data =
            ApiService.update(this.state.id, res).then(res => {
                this.setState({
                    modified: false
                });
            })

    }

    removeElementFromList(list, id) {
        const index = list.findIndex(el => {
            return el.id === id;
        });
        if (index > -1) {
            list.splice(index, 1);
        } else {
            list.forEach(el => {
                if (el.children) {
                    this.removeElementFromList(el.children, id);
                }
            })
        }
    };

    updateElementFromList(list, newel) {
        const index = list.findIndex(el => {
            return el.id === newel.id;
        });
        if (index > -1) {
            list[index] = newel;
        } else {
            list.forEach(el => {
                if (el.children) {
                    this.updateElementFromList(el.children, newel);
                }
            })
        }
    };

    onSelectNode = (id) => {
        this.setState({
            selected: id
        });
    };

    onAddNode = (el) => {
        const id = uuidv4();
        const {tree} = this.state;
        const parent = (el) ? el.children : tree;
        parent.push({
            id: id,
            name: 'New element',
            pos: [0, 0, 0],
            siz: [0, 0, 0]
        });
        let list = ApiService.getObjectList(tree);
        this.setState({
            tree: tree,
            list: list,
            selected: id
        });
        this.saveDoc();
    };

    onAddFolder = (el) => {
        confirm({
            title: "Add New Folder",
            message: "Select the name of the folder",
            showField: true,
            initialValue: "New Folder",
            onConfirm: (name) => {
                const id = uuidv4();
                const {tree} = this.state;
                const parent = (el) ? el.children : tree;
                parent.push({
                    id: id,
                    name: name,
                    children: []
                });
                let list = ApiService.getObjectList(tree);
                this.setState({
                    tree: tree,
                    list: list,
                    selected: null
                });
                this.saveDoc();
            }
        });
    };

    onDelete = (el) => {
        const elType = el.pos ? 'element' : 'folder';
        confirm({
            title: "Delete " + elType,
            message: "You are about to delete the " + elType + ": " + el.name + ". Please confirm.",
            onConfirm: () => {
                let tree = this.state.tree;
                this.removeElementFromList(tree, el.id);
                let list = ApiService.getObjectList(tree);
                this.setState({
                    tree: tree,
                    list: list,
                    selected: null
                });
                this.saveDoc();
            }
        });
    };

    onUpdated = (el) => {
        this.updateElementFromList(this.state.tree, el);
        let list = ApiService.getObjectList(this.state.tree);
        this.setState({
            list: list,
            modified: true
        });
        this.saveDoc();
    };

    copyElement = (el) => {
        this.setState({copiedElement: el});
    };

    pasteElement = (el) => {
        if (this.state.copiedElement) {
            let newElem = JSON.parse(JSON.stringify(this.state.copiedElement));
            this.setId([newElem]);
            const {tree} = this.state;
            if (el.children) {
                el.children.push(newElem);
            } else {
                tree.push(newElem);
            }
            let list = ApiService.getObjectList(tree);
            this.setState({
                tree: tree,
                list: list,
                selected: newElem.id
            });
        }
    };

    duplicateElement = (el) => {
        let newElem = JSON.parse(JSON.stringify(el));
        this.setId([newElem]);
        const {tree} = this.state;
        let par = this.getParentOf(el, this.state.tree);
        if (par) {
            par.children.push(newElem);
        } else {
            tree.push(newElem);
        }
        let list = ApiService.getObjectList(tree);
        this.setState({
            tree: tree,
            list: list,
            selected: newElem.id
        });
    };

    onToggle = (el) => {
        el.hide = !el.hide;
        let list = ApiService.getObjectList(this.state.tree);
        this.setState({
            list: list
        });
    };

    onCameraChanged = (camera) => {
        this.setState({camera: camera});
        this.saveDoc();
    };

    render() {
        const {list, tree, camera, selected, copiedElement} = this.state;
        return (<div style={styles.CONTAINER}>
            <div style={styles.BAR_CONTAINER}>
                <Tree data={tree} selected={selected} clipboard={copiedElement}
                      onSelectNode={this.onSelectNode}
                      onAddNode={this.onAddNode}
                      onAddFolder={this.onAddFolder}
                      onDelete={this.onDelete}
                      onCopy={this.copyElement}
                      onPaste={this.pasteElement}
                      onDuplicate={this.duplicateElement}
                      onToggle={this.onToggle}
                />
                <Properties data={tree} selected={selected} onUpdated={this.onUpdated}/>
                <Projection data={list} selected={selected} axis="x"/>
                <Projection data={list} selected={selected} axis="y"/>
                <Projection data={list} selected={selected} axis="z"/>
                <Materials data={list}/>
            </div>
            <div style={styles.SCENE_CONTAINER}>
                <Scene data={list} camera={camera} selected={selected} onCameraChanged={this.onCameraChanged}/>
            </div>
        </div>);
    }
}

export default Edit;
