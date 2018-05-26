import React from 'react';
import {Icon} from "react-fa";
import List from "./List";
import {DropdownButton, MenuItem} from "react-bootstrap";


class Tree extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            expanded: true
        };
    }

    addChild = () => {
        this.props.onAddNode(null);
    };

    addFolder = () => {
        this.props.onAddFolder(null);
    };

    render() {
        return (<div className="list-container">
            <div className="block-title" style={{marginTop: 0}}>
                <a href="/" onClick={(e) => {
                    e.preventDefault();
                    this.setState({expanded: !this.state.expanded})
                }}><Icon name={this.state.expanded ? 'minus-square-o' : 'plus-square-o'}/> Object List</a>
                <DropdownButton bsSize="xsmall" title=" " pullRight id="dropdown-size-extra-small">
                    <MenuItem eventKey="1" onClick={(e) => {
                        e.preventDefault();
                        this.addFolder();
                    }}><Icon name="folder"/> Add Folder</MenuItem>
                    <MenuItem eventKey="2" onClick={(e) => {
                        e.preventDefault();
                        this.addChild();
                    }}><Icon name="plus-circle"/> Add element</MenuItem>
                </DropdownButton>

            </div>
            {this.state.expanded &&
            <div className="block-content">
                <List data={this.props.data} selected={this.props.selected} clipboard={this.props.clipboard}
                      onSelectNode={this.props.onSelectNode}
                      onAddNode={this.props.onAddNode}
                      onAddFolder={this.props.onAddFolder}
                      onDelete={this.props.onDelete}
                      onCopy={this.props.onCopy}
                      onPaste={this.props.onPaste}
                      onToggle={this.props.onToggle}
                      onDuplicate={this.props.onDuplicate}
                />
            </div>
            }
        </div>);
    }
}

export default Tree;