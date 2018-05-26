import React, {Component} from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import ApiService from "./services/Api";
import Link from "react-router-dom/es/Link";
import * as styles from "./Home.style";
import {Icon} from "react-fa";
import {Modal} from "react-bootstrap";
import Preview from "./components/Preview";

const uuidv4 = require('uuid/v4');

class Home extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            creating: false,
            deleting: null,
            list: [],
            data: {
                name: '',
                description: ''
            }
        };
    }

    componentDidMount() {
        ApiService.getAll().then(res => {
            this.setState({
                list: res
            })
        })
    }

    validForm = () => {
        let errors = [];
        if (this.state.name.trim().length < 1) {
            errors.push('Name is required');
        }
        return errors.length < 1;
    };

    deleteModel = () => {
        ApiService.delete(this.state.deleting.id).then(res => {
            this.setState({deleting: null});
            ApiService.getAll().then(res => {
                this.setState({
                    list: res
                })
            })
        })
    };

    confirmDeleting = (model) => {
        this.setState({deleting: model});
    };

    closeDeleting = () => {
        this.setState({deleting: null});
    };

    cloneModel = (model) => {
        model.id = uuidv4();
        model.name += ' - cloned';
        ApiService.create(model).then(res => {
            ApiService.getAll().then(res => {
                this.setState({
                    list: res
                })
            })
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.validForm()) {
            let data = {
                data: '',
                id: uuidv4(),
                name: this.state.name,
                description: this.state.description
            };
            ApiService.create(data).then(res => {
                ApiService.getAll().then(res => {
                    this.setState({
                        name: '',
                        description: '',
                        list: res,
                        creating: false
                    })
                })
            })
        }
    };

    render() {
        const {creating, list, deleting} = this.state;
        return (<div style={styles.CONTAINER}>
            <div className="container">
                <Modal show={deleting} onHide={this.closeDeleting}>
                    <Modal.Header closeButton>
                        <Modal.Title><Icon name="warning"/> Deleting Design</Modal.Title>
                    </Modal.Header>
                    {deleting &&
                    <Modal.Body>
                        <p>You are about to delete the design <strong>{deleting.name}</strong>.</p>
                        <p>Deleted designs can not be recovered. Please, confirm.</p>
                    </Modal.Body>
                    }
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={this.deleteModel}>Delete Design</button>
                        <button className="btn btn-default" onClick={this.closeDeleting}>Cancel</button>
                    </Modal.Footer>
                </Modal>

                {creating &&
                <div>
                    <h2>Create New Design</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" value={this.state.name} onChange={e => {
                                this.setState({name: e.target.value})
                            }}/>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" className="form-control" value={this.state.description} onChange={e => {
                                this.setState({description: e.target.value})
                            }}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Create</button>
                            <button type="button" className="btn btn-default" onClick={() => {
                                this.setState({creating: false})
                            }}>Cancel
                            </button>
                        </div>
                    </form>
                </div>
                }
                {!creating &&
                <div className="row">
                    <div className="col-xs-6">
                        <h2>Designs</h2>
                    </div>
                    <div className="col-xs-6 align-right">
                        <button type="button" className="btn btn-primary" style={styles.BTN_CREATE} onClick={() => {
                            this.setState({creating: true})
                        }}><Icon name="plus-circle"/> Create Design
                        </button>
                    </div>
                    <div className="col-xs-12">
                        <ul style={styles.ITEM_CONTAINER}>
                            {list.map((el, index) => {
                                return (<li key={index} className="hoverable" style={styles.LIST_ITEM}>
                                    <div style={styles.ITEM_TITLE}>
                                        <Link to={{pathname: '/' + el.id}}>
                                            <span style={styles.DESIGN_TITLE}>{el.name}</span>
                                        </Link>
                                    </div>
                                    <div style={styles.PREVIEW}>
                                        <Link to={{pathname: '/' + el.id}}>
                                            {el.data && false &&
                                            <Preview data={el.data} camera={el.camera}/>
                                            }
                                        </Link>
                                    </div>
                                    <div style={styles.ITEM_LINKS}>
                                        <a href="/" onClick={(e) => {
                                            e.preventDefault();
                                            this.cloneModel(el)
                                        }}><Icon name="clone"/> Clone</a>
                                        <span>&nbsp;&nbsp;&nbsp;</span>
                                        <a href="/" onClick={(e) => {
                                            e.preventDefault();
                                            this.confirmDeleting(el)
                                        }}><Icon name="trash"/> Delete</a>
                                    </div>
                                </li>)
                            })}
                        </ul>
                    </div>
                </div>
                }
            </div>
        </div>);
    }
}

export default Home;
