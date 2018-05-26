import React from 'react';
import PropTypes from 'prop-types';
import ParsedModel from "./parsers/parsed_model";
import createMaterial from "./parsers/create_material";
import * as THREE from "three";
import Cube from "./Cube";

class StoredMesh extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            selected: false,
            parsedModel: null
        };
    }

    componentDidMount() {
        this.setState({
            selected: this.props.selected
        });
        const loader = new THREE.JSONLoader();
        const self = this;
        loader.load('/samples/marmelab.json', function(geometry) {
            console.log(geometry);
            self.setState({
                geometry: geometry
            });
        });

    }

    componentWillReceiveProps(nextProps) {
        this.setState({selected: nextProps.selected});
    }

    render() {

        const size = new THREE.Vector3(this.props.size[0], this.props.size[1], this.props.size[2]);
        const position = new THREE.Vector3(this.props.position[0], this.props.position[1], this.props.position[2]).add(size.divideScalar(2));
        const rotation = new THREE.Euler(this.props.rotation[0], this.props.rotation[1], this.props.rotation[2], 'XYZ');
        const {geometry} = this.state;

        return geometry ? (<mesh
            castShadow
            receiveShadow
            ref={this.props.name}
            position={position}
            rotation={rotation}
            geometry={geometry}
        >

        </mesh>)
            : (<Cube {...this.props} />);
    }
}

StoredMesh.propTypes = {
    position: PropTypes.array.isRequired,
    size: PropTypes.array.isRequired,
};

export default StoredMesh;