import React, {Component} from 'react';
import ThreeContainer from "../ThreeContainer";
import * as styles from "./Editor.styles";
import FloatingBar from "./FloatingBar";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faExpandArrowsAlt, faLongArrowAltLeft} from "@fortawesome/fontawesome-free-solid/index.es";
import ApiService from "../../services/Api";
import MainModel from "../../models/Main";

class Editor extends Component {

    constructor(props, context) {
        super(props, context);
        this.model = new MainModel();
        this.state = {
            data: [],
            updateTree: false,
            hideBar: false
        };
        this.handleElementClicked = this.handleElementClicked.bind(this);
    }

    addSamplePbjects() {
        const folder = this.model.addNewFolder('prueba');

        this.model.addElement({
            type: 'box',
            position: [60, 0, 20],
            size: [60,20,5],
            texture: 'wood_clear.jpg'
        }, folder.id);

        this.model.addElement({
            type: 'cylinder',
            position: [-40, 0, -20],
            size: [30,20,10],
            selected: true,
            texture: 'metal_black_01.jpg'
        }, folder.id);

        this.model.addElement({
            type: 'sphere',
            position: [0, 0, -20],
            size: [10,10,10],
            texture: 'wood01.jpg'
        }, folder.id);

        this.model.addElement({
            type: 'json',
            position: [0, 10, -30],
            url: 'cube.json',
            size: [10,10,10]
        }, folder.id);

        this.model.addElement({
            type: 'json',
            position: [40, 0, -30],
            url: 'marmelab.json',
            size: [5,5,5],
            rotation: [0, Math.PI/4 , 0]
        }, folder.id);
    }

    componentDidMount() {
        if (this.props.computedMatch) {
            this.loadDoc(this.props.computedMatch.params.id);
        }
        this.model.onChanged = (changes) => {
            const newState = {};
            if (changes.tree) {
                newState.updateTree = !this.state.updateTree
            }
            if (changes.list) {
                newState.data = this.model.getElementList()
            }
            this.setState(newState);
            this.saveDoc();
        };
    }

    loadDoc(id) {
        this.setState({id: id});
        ApiService.getOne(id)
            .then(res => {
                this.model.fromJSON(res.data);
                this.state({
                    name: res.name,
                    desc: res.desc
                })
            })
            .catch(err => {

            })
    }

    saveDoc() {
        if (this.state.id) {
            const data = {
                id: this.state.id,
                name: this.state.name,
                desc: this.state.desc,
                data: this.model.toJSON()
            };
            /**
            ApiService.update(this.state.id, data)
                .then(res => {
                    this.setState({updated: true});
                });
            **/
        }
    }

    handleElementClicked(data) {
        if (data.ctrlKey) {
            this.model.selectElement(data.id);
        }
    }

    render() {
        const {data, updateTree, hideBar} = this.state;

        return (<div style={styles.CONTAINER}>
            {!hideBar &&
            <div style={styles.BAR_CONTAINER}>
               <a style={styles.HIDE_BAR} href="/" title="Hide this bar" onClick={(e) => {e.preventDefault();this.setState({hideBar:true});this.model.selectElement(0);}}><FontAwesomeIcon icon={faLongArrowAltLeft}/></a>
               <div style={styles.BAR}>
                    <FloatingBar model={this.model} update={updateTree}/>
                </div>
            </div>
            }
            {hideBar &&
            <a style={styles.SHOW_BAR} href="/" title="Show properties bar" onClick={(e) => {e.preventDefault();this.setState({hideBar:false})}}><FontAwesomeIcon icon={faExpandArrowsAlt}/></a>
            }
            <div style={styles.CANVAS}>
                <ThreeContainer data={data} onElementClicked={this.handleElementClicked}/>
            </div>
        </div>);
    }
}

export default Editor;
