import React from 'react';
import PropTypes from 'prop-types';

import * as THREE from 'three';
import wood from '../wildtextures-dark-wood-board.jpg';
import wall from '../wall.jpg';
import floor from '../floor.jpg';

class Cube extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.color = {
            "wood": 0xffffff,
            "wall": 0xffffff,
        };
        this.pressedColor = 0xff0000;

        this.state = {
            selected: false,
        };
    }

    componentDidMount() {
        this.setState({
            selected: this.props.selected
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ selected: nextProps.selected });
    }

    render() {
        let texture = wood;
        let repeat = new THREE.Vector2( 1, 1 );
        if (this.props.type==='wall') {
            texture = wall;
        } else if (this.props.type==='floor') {
            texture = floor;
            repeat = new THREE.Vector2( 4, 4 );
        }
        const size = new THREE.Vector3(this.props.size[0], this.props.size[1], this.props.size[2]);
        const position = new THREE.Vector3(this.props.position[0], this.props.position[1], this.props.position[2]).add(size.divideScalar(2));
        const rotation = new THREE.Euler(this.props.rotation[0], this.props.rotation[1], this.props.rotation[2], 'XYZ');
        return (<mesh
            castShadow
            receiveShadow
            ref={this.props.name}
            position={position}
            rotation={rotation}
        >
            <boxGeometry width={this.props.size[0]} height={this.props.size[1]} depth={this.props.size[2]}/>
            <meshPhongMaterial
                color={this.state.selected ? this.pressedColor : this.color[this.props.type]}
            >
                    <texture url={texture} repeat={repeat} wrapS={THREE.RepeatWrapping} wrapT={THREE.RepeatWrapping}/>
            </meshPhongMaterial>
        </mesh>);
    }
}

Cube.propTypes = {
    position: PropTypes.array.isRequired,
    size: PropTypes.array.isRequired,
    rotation: PropTypes.array.isRequired
};

export default Cube;