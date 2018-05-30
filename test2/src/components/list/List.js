import React, {Component} from 'react';
import ApiService from "../../services/Api";
import uuidv4 from 'uuid/v4';
import {Link, withRouter} from "react-router-dom";
import SnapShots from "../../services/SnapShots";
import * as styles from "./List.styles";
import {faCopy, faPlusCircle, faTrash} from "@fortawesome/fontawesome-free-solid/index.es";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {modalMessage} from "../edit/modals/ModalMessage";
import Header from "../Header";

class List extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
        };
        this.onAction = this.onAction.bind(this);
    }

    componentDidMount() {
        this.loadModels();
    }

    loadModels() {
        ApiService.getAll().then(res => {
            this.setState({
                data: res.map(el => {
                    return el;
                })
            })
        });
    }

    onAction(action) {
        if (action.id === 'create') {
            const json = {
                id: uuidv4(),
                name: 'new model',
                desc: '',
                data: {
                    tree: [],
                    elements: {},
                    folders: {}
                }
            };
            ApiService.create(json)
                .then((res) => {
                    this.props.history.push('/' + res.id);
                });
        }
    }
    cloneModel(id) {
        ApiService.getOne(id)
            .then((res) => {
                const json = {
                    id: uuidv4(),
                    name: res.name + ' [copy]',
                    desc: '',
                    data: JSON.parse(JSON.stringify(res.data))
                };
                ApiService.create(json)
                    .then((res) => {
                        this.props.history.push('/' + res.id);
                    });
            });
    }

    delModel(id) {
        modalMessage({
            title: 'Delete Model',
            message: 'You are about to delete the selected model. Please Confirm.',
            buttons: {cancel: true},
            onConfirm: () => {
                ApiService.delete(id).then(() => {
                    this.loadModels();
                })
            }
        });

    }

    render() {
        return (<div style={styles.CONTAINER}>
            <Header title={'Models'}  actions={[{id: 'create', label: 'Create new Model', icon: faPlusCircle}]} onAction={this.onAction}/>
            <div className="container-fluid" style={{height:'100%',position:'relative',overflow:'auto',padding:'20px'}}>
                <div className="row">
                    {this.state.data.map((el, ind) => {
                        const styleImg = JSON.parse(JSON.stringify(styles.MODEL_IMAGE));
                        styleImg.backgroundImage = 'url(' + SnapShots.getURL(el.id) + ')';
                        return (<div key={ind} className="col-sm-3">
                            <div style={styles.ITEM_CONTAINER}>
                                <Link to={{pathname: '/' + el.id}} style={styleImg}/>
                                <a href="/" style={styles.LINK_DELETE} onClick={(e) => {
                                    e.preventDefault();
                                    this.delModel(el.id)
                                }}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </a>
                                <a href="/" style={styles.LINK_DELETE} onClick={(e) => {
                                    e.preventDefault();
                                    this.cloneModel(el.id)
                                }}>
                                    <FontAwesomeIcon icon={faCopy}/>
                                </a>
                                <Link to={{pathname: '/' + el.id}} style={styles.MODEL_NAME} className="no-underline">
                                    {el.name}
                                </Link>
                            </div>
                        </div>)
                    })}
                </div>
            </div>
        </div>)
    }

}

export default withRouter(List);