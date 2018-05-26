import React from 'react';
import {Icon} from "react-fa";
import {DropdownButton, FormControl, FormGroup, InputGroup} from "react-bootstrap";
import DropDown from "./form/dropdown";
import MenuItem from "react-bootstrap/es/MenuItem";


class Properties extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            expanded: true,
            selectedNode: null
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePosChange = this.handlePosChange.bind(this);
        this.handleSizChange = this.handleSizChange.bind(this);
        this.handleRotationChange = this.handleRotationChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.selected) {
            this.setState({
                selectedNode: null
            });
            this.searchList(nextProps.data, nextProps.selected);
        }

    }

    searchList(list, sel) {
        list.forEach(e => {
            if (e.id === sel) {
                this.setState({
                    selectedNode: e
                })
            } else if (e.children) {
                this.searchList(e.children, sel);
            }
        });
    }

    handleNameChange(event) {
        let selectedNode = this.state.selectedNode;
        selectedNode.name = event.target.value;
        this.props.onUpdated(selectedNode);
    }

    handleTypeChange(type) {
        let selectedNode = this.state.selectedNode;
        selectedNode.type = type;
        this.props.onUpdated(selectedNode);
    }

    handleFileChange(file) {
        let selectedNode = this.state.selectedNode;
        selectedNode.file = file;
        this.props.onUpdated(selectedNode);
    }

    handlePosChange(index, nv) {
        let selectedNode = Object.assign({}, this.state.selectedNode);
        selectedNode.pos = selectedNode.pos || [0,0,0];
        if (!isNaN(nv)) {
            selectedNode.pos[index] = nv;
            this.setState({selectedNode});
            this.props.onUpdated(selectedNode);
        }
    }

    handleSizChange(index, nv) {
        let selectedNode = Object.assign({}, this.state.selectedNode);
        selectedNode.siz = selectedNode.siz || [0,0,0];
        if (!isNaN(nv)) {
            selectedNode.siz[index] = nv;
            this.setState({selectedNode});
            this.props.onUpdated(selectedNode);
        }
    }

    handleRotationChange(index, nv) {
        let selectedNode = Object.assign({}, this.state.selectedNode);
        selectedNode.rotation = selectedNode.rotation || [0,0,0];
        if (!isNaN(nv)) {
            selectedNode.rotation[index] = nv;
            this.setState({selectedNode});
            console.log(this.state.selectedNode);
            this.props.onUpdated(selectedNode);
            console.log(this.state.selectedNode);
        }
    }

    render() {
        let {selectedNode} = this.state;
        const sizes = [0.75, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5];
        const move = [-20, -10, -5, -1, -0.75, -0.5, -0.25, 0.25, 0.5, 0.75, 1, 5, 10, 20];
        return (<div className="list-container">
            {selectedNode &&
            <div>
                <div className="block-title">
                    <a href="/" onClick={(e) => {
                        e.preventDefault();
                        this.setState({expanded: !this.state.expanded})
                    }}>
                        <Icon name={this.state.expanded ? 'minus-square-o' : 'plus-square-o'}/> Properties
                    </a>
                </div>
                {this.state.expanded &&
                <div className="form-prop">
                    <div className="">
                    <div className="field-name">
                        <FormGroup>
                            <InputGroup>
                                <FormControl type="text" value={selectedNode.name} onChange={this.handleNameChange}/>
                                <DropdownButton
                                    componentClass={InputGroup.Button}
                                    id="input-dropdown-addon"
                                    title={selectedNode.type || 'Cube'}
                                    onSelect={this.handleTypeChange}
                                >
                                    <MenuItem eventKey="Cube">Cube</MenuItem>
                                    <MenuItem eventKey="File">File</MenuItem>
                                </DropdownButton>
                            </InputGroup>
                        </FormGroup>
                    </div>
                    </div>
                    {selectedNode.type === 'File' && <div className="row-label-icon">
                        <label><Icon name="arrows"/></label>
                        <FormGroup>
                            <FormControl type="text" value={selectedNode.file} onChange={this.handleFileChange}/>
                        </FormGroup>
                    </div>}
                    {selectedNode.pos && <div className="row-label-icon">
                        <label><Icon name="arrows"/></label>
                        <DropDown index={0} value={selectedNode.pos[0]} options={move} onUpdated={this.handlePosChange}/>
                        <DropDown index={1} value={selectedNode.pos[1]} options={move} onUpdated={this.handlePosChange}/>
                        <DropDown index={2} value={selectedNode.pos[2]} options={move} onUpdated={this.handlePosChange}/>
                    </div>
                    }
                    {selectedNode.siz && <div className="row-label-icon">
                        <label><Icon name="arrows-alt"/></label>
                        <DropDown index={0} value={selectedNode.siz[0]} options={sizes} onUpdated={this.handleSizChange}/>
                        <DropDown index={1} value={selectedNode.siz[1]} options={sizes} onUpdated={this.handleSizChange}/>
                        <DropDown index={2} value={selectedNode.siz[2]} options={sizes} onUpdated={this.handleSizChange}/>
                    </div>
                    }
                    {selectedNode.siz && <div className="row-label-icon">
                        <label><Icon name="undo"/></label>
                        <DropDown index={0} value={selectedNode.rotation ? selectedNode.rotation[0] : 0} options={sizes} onUpdated={this.handleRotationChange}/>
                        <DropDown index={1} value={selectedNode.rotation ? selectedNode.rotation[1] : 0} options={sizes} onUpdated={this.handleRotationChange}/>
                        <DropDown index={2} value={selectedNode.rotation ? selectedNode.rotation[2] : 0} options={sizes} onUpdated={this.handleRotationChange}/>
                    </div>
                    }
                </div>
                }
            </div>
            }
        </div>);
    }
}

export default Properties;