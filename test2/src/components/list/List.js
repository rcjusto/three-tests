import React, {Component} from 'react';
import ApiService from "../../services/Api";
import uuidv4 from 'uuid/v4';
import {Link} from "react-router-dom";

export default class List extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
        };
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
            .then(res => {
                this.loadModels();
            })
            .catch(err => {

            })
    }

    render() {
        return (<div className="container-fluid">
            <div className="row">
                {this.state.data.map((el,ind) => {
                    return (<div key={ind} className="col-sm-3">
                        <div>
                            <Link to={{pathname: '/' + el.id}} >{el.id}</Link>
                            {el.name}
                        </div>
                    </div>)
                })}
            </div>
            <button onClick={this.addNewModel}>CREATE</button>
        </div>)
    }

}