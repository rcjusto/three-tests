import React, {Component} from 'react';
import MainModel from "../../models/Main";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import * as styles from "./TreeView.styles";
import {faCircle, faSquare, faClone} from "@fortawesome/fontawesome-free-regular/index.es";
import {faBan, faCopy, faExpand, faEye, faFolder, faFolderOpen, faPaste, faPlusCircle, faPlusSquare, faTrash} from "@fortawesome/fontawesome-free-solid/index.es";
import {DropdownButton, MenuItem} from "react-bootstrap";
import {modalAddFolder} from "./modals/ModalAddFolder";
import {modalAddElement} from "./modals/ModalAddElement";

export default class TreeView extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            collapsed: {}
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.clipboardEmpty = this.clipboardEmpty.bind(this);
    }

    componentDidMount() {

    }

    toggleCollapse = (node) => {
        const {collapsed} = this.state;
        collapsed[node.id] = !collapsed[node.id];
        this.setState({collapsed});
    };

    toggleVisible = (node) => {
        const {model} = this.props;
        model.toggleVisible(node.id);
    };

    isNodeSelected = (node) => {
        const {model} = this.props;
        return (model.elements[node.id] && model.elements[node.id].selected) || (model.folders[node.id] && model.folders[node.id].selected);
    };

    isNodeVisible = (node) => {
        const {model} = this.props;
        return (model.elements[node.id] && !!model.elements[node.id].visible) || (model.folders[node.id] && !!model.folders[node.id].visible);
    };

    selectNode = (node) => {
        if (this.isNodeSelected(node)) {
            this.toggleCollapse(node);
        } else {
            const {collapsed} = this.state;
            const {model} = this.props;
            model.selectElement(node.id);
            if (node.type === MainModel.TYPE_FOLDER && collapsed[node.id]) {
                this.toggleCollapse(node);
            }
        }
    };

    getIcon = (node) => {
        const {collapsed} = this.state;
        switch (node.type) {
            case MainModel.TYPE_FOLDER:
                return !collapsed[node.id] ? faFolderOpen : faFolder;
            case MainModel.TYPE_BOX:
                return faSquare;
            case MainModel.TYPE_SPHERE:
                return faCircle;
            case MainModel.TYPE_JSON:
                return faClone;
            default:
                return faExpand;
        }
    };

    addFolder = (node) => {
        const {model} = this.props;
        modalAddFolder({
            onConfirm: (name) => {
                model.addNewFolder(name, node ? node.id : null);
            }
        })
    };

    addElement = (node) => {
        const {model} = this.props;
        modalAddElement({
            onConfirm: (name, type) => {
                const el = model.addNewElement(type, node ? node.id : null);
                el.name = name;
                const newEl = model.elements[el.id];
                if (newEl) {
                    newEl.size = [1,1,1];
                    model._triggerChange();
                }
            }
        });
    };

    duplicate = (node) => {
        const {model} = this.props;
        model.duplicateNode(node);
    };

    copy = (node) => {
        const {model} = this.props;
        model.copyNode(node);
    };

    paste = (node) => {
        const {model} = this.props;
        model.pasteOnNode(node);
    };

    deleteElement = (node) => {
        const {model} = this.props;
        model.delElement(node.id);
    };

    clipboardEmpty = () => {
        const {model} = this.props;
        return model.clipboard == null;
    };

    render() {
        const {model} = this.props;
        const {collapsed} = this.state;

        const addElement = (node) => {
            return (<a href="/" onClick={(e) => {
                e.preventDefault();
                this.addElement(node)
            }} className="dropdown" style={styles.LINK_ADD} title="Add object"><FontAwesomeIcon icon={faPlusSquare}/></a>)
        };

        const visible = (node) => {
            const v = this.isNodeVisible(node);
            return (<a href="/" onClick={(e) => {
                e.preventDefault();
                this.toggleVisible(node)
            }} className="dropdown" title="Show/Hide object"><FontAwesomeIcon icon={v ? faEye : faBan}/></a>)
        };

        const menu = (node) => {
            return (<DropdownButton bsSize="xsmall" title="..." pullRight id="dropdown-size-extra-small">
                {node.type === MainModel.TYPE_FOLDER &&
                <MenuItem eventKey="1" onClick={(e) => {
                    e.preventDefault();
                    this.addFolder(node);
                }}><FontAwesomeIcon icon={faFolder}/> Add Folder</MenuItem>
                }
                {node.type === MainModel.TYPE_FOLDER &&
                <MenuItem eventKey="2" onClick={(e) => {
                    e.preventDefault();
                    this.addElement(node);
                }}><FontAwesomeIcon icon={faPlusCircle}/> Add element</MenuItem>
                }
                {node.type === MainModel.TYPE_FOLDER &&
                <MenuItem divider/>
                }

                <MenuItem eventKey="1" onClick={(e) => {
                    e.preventDefault();
                    this.duplicate(node);
                }}><FontAwesomeIcon icon={faClone}/> Duplicate</MenuItem>
                <MenuItem eventKey="1" onClick={(e) => {
                    e.preventDefault();
                    this.copy(node);
                }}><FontAwesomeIcon icon={faCopy}/> Copy</MenuItem>

                {node.type === MainModel.TYPE_FOLDER &&
                <MenuItem eventKey="1" disabled={model.clipboard == null} onClick={(e) => {
                    e.preventDefault();
                    this.paste(node);
                }}><FontAwesomeIcon icon={faPaste}/> Paste</MenuItem>
                }

                <MenuItem divider/>

                <MenuItem eventKey="4" onClick={(e) => {
                    e.preventDefault();
                    this.deleteElement(node);
                }}><FontAwesomeIcon icon={faTrash}/> Delete</MenuItem>
            </DropdownButton>)
        };

        const elemNode = (node, index) => {
            return (<li key={index} style={styles.LI_ELEMENT}>
                <div style={styles.UNSELECTED} className={this.isNodeSelected(node) ? 'selected' : 'hoverable'}>
                    {menu(node)}
                    {visible(node)}
                    <a href="/" onClick={(e) => {
                        e.preventDefault();
                        this.selectNode(node)
                    }} style={styles.LINK_FILE}>{node.name || '[no name]'}</a>
                </div>
            </li>)
        };

        const folderNode = (node, index) => {
            return (<li key={index} style={styles.LI_FOLDER}>
                <div style={styles.UNSELECTED} className={this.isNodeSelected(node) ? 'selected' : 'hoverable'}>
                    {menu(node)}
                    {visible(node)}
                    {addElement(node)}
                    <a href="/" onClick={(e) => {
                        e.preventDefault();
                        this.toggleCollapse(node)
                    }} style={styles.LINK_TREE}>
                        <FontAwesomeIcon icon={this.getIcon(node)}/>
                    </a>
                    <a href="/" onClick={(e) => {
                        e.preventDefault();
                        this.selectNode(node)
                    }} style={styles.LINK_FOLDER}>{node.name || '[no name]'}</a>
                </div>
                <ul style={styles.UL}>
                    {!collapsed[node.id] && node.children.map((n, ind) => {
                        return n.type === MainModel.TYPE_FOLDER
                            ? folderNode(n, ind)
                            : elemNode(n, ind)
                    })}
                </ul>
            </li>)
        };

        return (
            <div className="bar-block">
                <div className="bar-block-name">
                    <a className="right-link" href="/" onClick={(e)=>{e.preventDefault();this.addFolder(null);}} title="Add Folder"><FontAwesomeIcon icon={faFolder}/></a>
                    <a className="right-link" href="/" onClick={(e)=>{e.preventDefault();this.addElement(null);}} title="Add Object"><FontAwesomeIcon icon={faPlusSquare}/></a>
                    Objects
                </div>
                <div style={styles.CONTAINER} className="tree">
                    <ul style={styles.MAIN_UL}>
                        {model.getElementTree().map((node, index) => {
                            return node.type === MainModel.TYPE_FOLDER
                                ? folderNode(node, index)
                                : elemNode(node, index)
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}