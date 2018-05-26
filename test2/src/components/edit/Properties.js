import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import * as styles from "./Properties.styles";
import DropDown from "./Dropdown";
import {LABELED_ROW} from "./Properties.styles";
import {Button, DropdownButton, FormControl, InputGroup, MenuItem} from "react-bootstrap";
import {faCaretDown, faCubes, faExpandArrowsAlt, faImage, faLocationArrow, faTag, faUndoAlt} from "@fortawesome/fontawesome-free-solid/index.es";
import MainModel from "../../models/Main";
import Textures from "../../services/Textures";
import {modalSelTexture} from "./modals/ModalSelTexture";
import JSONModels from "../../services/JSONModels";

export default class Properties extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            element: null,
            node: null,
            textures: [],
            objects: []
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePositionChange = this.handlePositionChange.bind(this);
        this.handleRotationChange = this.handleRotationChange.bind(this);
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.handlePropChange = this.handlePropChange.bind(this);
        this.handleTextureChange = this.handleTextureChange.bind(this);
        this.handleObjectChange = this.handleObjectChange.bind(this);
    }

    handleNameChange(event) {
        let {node} = this.state;
        if (node.name !== event.target.value) {
            node.name = event.target.value;
            this.setState({node});
            this.props.model._triggerChange({tree: true, list: false});
        }
    }

    handleTextureChange() {
        let {element} = this.state;
        modalSelTexture({
            textures: this.state.textures,
            selected: element.texture,
            onConfirm: (texture) => {
                element.texture = texture;
                this.setState({element});
            }
        })
    }

    handleObjectChange(event) {
        let {element} = this.state;
        if (element.url !== event.target.value) {
            element.url = event.target.value;
            this.setState({element});
            this.props.model._triggerListChange();
        }
    }

    handlePropChange(event) {
        let {element} = this.state;
        element[event.target.name] = event.target.value;
        this.setState({element});
    }

    handlePositionChange(index, value) {
        let {element} = this.state;
        element.position[index] = value;
        this.setState({element});
    }

    handleRotationChange(index, value) {
        let {element} = this.state;
        if (!element.rotation) element.rotation = [0, 0, 0];
        element.rotation[index] = value;
        this.setState({element});
    }

    handleSizeChange(index, value) {
        let {element} = this.state;
        if (!element.size) element.size = [0, 0, 0];
        element.size[index] = value;
        this.setState({element});
    }

    componentDidMount() {
        Textures.getAll()
            .then(res => {
                this.setState({textures: res});
            });

        JSONModels.getAll()
            .then(res => {
                this.setState({objects: res});
            });

        if (this.props.model) {
            this.setState({
                element: this.props.selected,
                node: this.props.model._findNodeRecursive(this.props.selected.id)
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.model && prevProps.selected && prevProps.selected !== this.props.selected) {
            this.setState({
                element: this.props.selected,
                node: this.props.model._findNodeRecursive(this.props.selected.id)
            });
        }
    }

    render() {
        let {element, node, objects} = this.state;
        const styleTexture = {
            backgroundImage: (element && element.texture) ? 'url(' + Textures.getURL(element.texture) + ')' : 'none'
        };


        return (
            <div className="bar-block-next">
                <div className="bar-block-name">Properties</div>
                <div style={styles.CONTAINER} className="properties-block">
                    {node &&
                    <div style={LABELED_ROW} className="clearfix">
                        <div style={styles.LABELED_ROW_LABEL}>
                            <FontAwesomeIcon icon={faTag}/>
                        </div>
                        <div style={styles.COL_1_1}>
                            <FormControl type="text" name="name" value={node.name} onChange={this.handleNameChange}/>
                        </div>
                    </div>
                    }
                    {element && element.type !== MainModel.TYPE_FOLDER &&
                    <div style={LABELED_ROW} className="clearfix">
                        <div style={styles.LABELED_ROW_LABEL}>
                            <FontAwesomeIcon icon={faLocationArrow}/>
                        </div>
                        {[0, 1, 2].map((ind) => {
                            return (<div key={ind} style={styles.COL_1_3}>
                                <DropDown index={ind} value={element.position[ind] || 0} options={[]} onUpdated={this.handlePositionChange}/>
                            </div>);
                        })}
                    </div>}
                    {element && element.type !== MainModel.TYPE_FOLDER &&
                    <div style={LABELED_ROW} className="clearfix">
                        <div style={styles.LABELED_ROW_LABEL}>
                            <FontAwesomeIcon icon={faUndoAlt}/>
                        </div>
                        {[0, 1, 2].map((ind) => {
                            return (<div key={ind} style={styles.COL_1_3}>
                                <DropDown index={ind} value={element.rotation ? element.rotation[ind] : 0} options={[]} onUpdated={this.handleRotationChange}/>
                            </div>);
                        })}
                    </div>}
                    {element && element.type !== MainModel.TYPE_FOLDER &&
                    <div style={LABELED_ROW} className="clearfix">
                        <div style={styles.LABELED_ROW_LABEL}>
                            <FontAwesomeIcon icon={faExpandArrowsAlt}/>
                        </div>
                        {[0, 1, 2].map((ind) => {
                            return (<div key={ind} style={styles.COL_1_3}>
                                <DropDown index={ind} value={element.size ? element.size[ind] : 0} options={[]} onUpdated={this.handleSizeChange}/>
                            </div>);
                        })}
                    </div>}
                    {element && element.type !== MainModel.TYPE_JSON && element.type !== MainModel.TYPE_FOLDER &&
                    <div style={LABELED_ROW} className="clearfix">
                        <div style={styles.LABELED_ROW_LABEL}>
                            <FontAwesomeIcon icon={faImage}/>
                        </div>
                        <div style={styles.COL_1_1}>
                            <InputGroup>
                                <div className="form-control" style={styleTexture}/>
                                <InputGroup.Button>
                                    <Button onClick={this.handleTextureChange}>
                                        <FontAwesomeIcon icon={faCaretDown}/>
                                    </Button>
                                </InputGroup.Button>
                            </InputGroup>
                        </div>
                    </div>
                    }
                    {element && element.type === MainModel.TYPE_JSON &&
                    <div style={LABELED_ROW} className="clearfix">
                        <div style={styles.LABELED_ROW_LABEL}>
                            <FontAwesomeIcon icon={faCubes}/>
                        </div>
                        <div style={styles.COL_1_1}>
                            <InputGroup>
                                <div className="form-control" style={styleTexture}>
                                    {element.url}
                                </div>
                                {objects && objects.length > 0 &&
                                <DropdownButton componentClass={InputGroup.Button} pullRight id="input-dropdown-addon" title="">
                                    {objects.map((s, ind) => {
                                        return (<MenuItem key={ind} onClick={(e) => {
                                            e.preventDefault();
                                            this.handleObjectChange({
                                                target: {
                                                    value: s
                                                }
                                            })
                                        }}>{s}</MenuItem>)
                                    })}
                                </DropdownButton>
                                }
                            </InputGroup>
                        </div>
                    </div>
                    }
                </div>
            </div>
        )
    }
}