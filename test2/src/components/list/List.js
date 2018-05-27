import React, {Component} from 'react';
import ApiService from "../../services/Api";
import uuidv4 from 'uuid/v4';
import {Link, withRouter} from "react-router-dom";
import SnapShots from "../../services/SnapShots";
import * as styles from "./List.styles";
import {faTrash} from "@fortawesome/fontawesome-free-solid/index.es";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {modalMessage} from "../edit/modals/ModalMessage";

class List extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
        };
        this.addNewModel = this.addNewModel.bind(this);
    }

    componentDidMount() {
        this.loadModels();
    }

    loadModels() {
        ApiService.getAll().then(res => {
            this.setState({data: res.map(el => {
                    return el;
                })})
        });
    }

    addNewModel() {
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
        return (<div className="container-fluid">
            <div className="row">
                <div className="col-sm-8">
                    <h2>Models</h2>
                </div>
                <div className="col-sm-4 text-right">
                    <button onClick={this.addNewModel} className="btn btn-primary" style={{marginTop:'20px'}}>CREATE NEW MODEL</button>
                </div>
            </div>
            <div className="row">
                {this.state.data.map((el,ind) => {
                    const styleImg = JSON.parse(JSON.stringify(styles.MODEL_IMAGE));
                    styleImg.backgroundImage = 'url('+SnapShots.getURL(el.id)+')';
                    return (<div key={ind} className="col-sm-3">
                        <div style={styles.ITEM_CONTAINER}>
                            <Link to={{pathname: '/' + el.id}} style={styleImg} />
                            <a href="/" style={styles.LINK_DELETE} onClick={(e)=>{e.preventDefault();this.delModel(el.id)}}>
                                <FontAwesomeIcon icon={faTrash} />
                            </a>
                            <Link to={{pathname: '/' + el.id}} style={styles.MODEL_NAME} className="no-underline">
                                {el.name}
                            </Link>
                        </div>
                    </div>)
                })}
            </div>
        </div>)
    }

}

export default withRouter(List);