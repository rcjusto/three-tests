import React, {Component} from 'react';
import * as styles from "./FloatingBar.styles";
import TreeView from "./TreeView";
import Properties from "./Properties";
import MainModel from "../../models/Main";

class FloatingBar extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {import : ''};
        this.textures = [];
        this.toggleBar = this.toggleBar.bind(this);
        this.handleImportChange = this.handleImportChange.bind(this);
        this.import = this.import.bind(this);
    }

    toggleBar = (e) => {
        e.preventDefault();
        const {hideBar} = this.state;
        this.setState({hideBar: !hideBar})
    };

    handleImportChange(e) {
        this.setState({
            import: e.target.value
        })
    }

    import() {
        const obj = JSON.parse(this.state.import);
        if (obj.data) {
            obj.data.forEach(el => {
                this.importNode(el, null);
            })
        }
    }

    importNode(node, parentId) {
        let {model} = this.props;
        if (node.children) {
            const el = model.addNewFolder(node.name, parentId);
            node.children.forEach(ch => {
                this.importNode(ch, el.id);
            })
        } else {
            const el = model.addNewElement(MainModel.TYPE_BOX, parentId);
            el.name = node.name;
            const newEl = model.elements[el.id];
            newEl.size = node.siz;
            newEl.position = [node.pos[0] + node.siz[0]/2,node.pos[1]+ node.siz[1]/2, node.pos[2]+ node.siz[2]/2];
            newEl.texture = 'wood01.jpg';
        }
    }

    render() {
        let {model} = this.props;
        const selected = model.getSelected();
        return (
            <div style={styles.CONTAINER}>

                <TreeView model={model}/>

                {selected &&
                <Properties model={model} selected={selected}/>
                }

                <div>
                    <textarea style={styles.IMPORT_TEXT} value={this.state.import} onChange={this.handleImportChange}></textarea>
                    <button onClick={this.import}>IMPORT</button>
                </div>

            </div>
        );
    }
}

export default FloatingBar;
