import React from 'react';
import {Icon} from "react-fa";
import {DropdownButton} from "react-bootstrap";
import MenuItem from "react-bootstrap/es/MenuItem";


class List extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            expanded: {}
        };
    }

    selectNode = (c) => {
        this.props.onSelectNode(c.id);
        if (c.children) {
            this.expandNode(c);
        }
    };

    addChild = (c) => {
        if (c.children) {
            this.props.onAddNode(c);
        }
    };

    addFolder = (c) => {
        if (c.children) {
            this.props.onAddFolder(c);
        }
    };

    copy = (c) => {
        this.props.onCopy(c);
    };

    paste = (c) => {
        this.props.onPaste(c);
    };

    duplicate = (c) => {
        this.props.onDuplicate(c);
    };

    deleteElement = (c) => {
        this.props.onDelete(c);
    };

    expandNode = (c) => {
        let expanded = this.state.expanded;
        expanded[c.id] = !expanded[c.id];
        this.setState({
            expanded: expanded
        });
    };

    toggleNode = (c) => {
        this.props.onToggle(c)
    };

    render() {
        return (<ul className="tree">
            {this.props.data && this.props.data.map((el, index) => {
                return (<li key={index}>
                    <div className={el.id === this.props.selected ? 'selected hoverable' : 'hoverable'}>
                        {el.children &&
                        <a className="link-plus" href="/" onClick={(e) => {
                            e.preventDefault();
                            this.expandNode(el)
                        }}>
                            <Icon name={this.state.expanded[el.id] ? 'folder-open' : 'folder'}/>
                        </a>
                        }
                        <a className={el.children ? 'link-folder link-node' : 'link-node'} href="/" onClick={(e) => {
                            e.preventDefault();
                            this.selectNode(el);
                        }}>{el.name}</a>

                        <DropdownButton bsSize="xsmall" title="..." pullRight id="dropdown-size-extra-small">
                            {el.children &&
                            <MenuItem eventKey="1" onClick={(e) => {
                                e.preventDefault();
                                this.addFolder(el);
                            }}><Icon name="folder"/> Add Folder</MenuItem>
                            }
                            {el.children &&
                            <MenuItem eventKey="2" onClick={(e) => {
                                e.preventDefault();
                                this.addChild(el);
                            }}><Icon name="plus-circle"/> Add element</MenuItem>
                            }
                            {el.children &&
                            <MenuItem divider/>
                            }

                            <MenuItem eventKey="1" onClick={(e) => {
                                e.preventDefault();
                                this.duplicate(el);
                            }}><Icon name="clone"/> Duplicate</MenuItem>
                             <MenuItem eventKey="1" onClick={(e) => {
                                e.preventDefault();
                                this.copy(el);
                            }}><Icon name="copy"/> Copy</MenuItem>

                            {el.children &&
                            <MenuItem eventKey="1" disabled={!this.props.clipboard} onClick={(e) => {
                                e.preventDefault();
                                this.paste(el);
                            }}><Icon name="paste"/> Paste</MenuItem>
                            }

                            <MenuItem divider/>

                            <MenuItem eventKey="4" onClick={(e) => {
                                e.preventDefault();
                                this.deleteElement(el);
                            }}><Icon name="trash"/> Delete</MenuItem>
                        </DropdownButton>

                        <a className="link-right" href="/" onClick={(e) => {
                            e.preventDefault();
                            this.toggleNode(el);
                        }}><Icon style={el.hide? {color:'#AA0000'} : {color:'#333333'}} name={el.hide ? 'ban' : 'eye'}/></a>

                    </div>
                    {el.children && this.state.expanded[el.id] &&
                    <List data={el.children} selected={this.props.selected}
                          onSelectNode={this.props.onSelectNode}
                          onAddNode={this.props.onAddNode}
                          onAddFolder={this.props.onAddFolder}
                          onDelete={this.props.onDelete}
                          onCopy={this.props.onCopy}
                          onPaste={this.props.onPaste}
                          onToggle={this.props.onToggle}
                          onDuplicate={this.props.onDuplicate}
                    />
                    }
                </li>);
            })}
        </ul>);
    }
}

export default List;