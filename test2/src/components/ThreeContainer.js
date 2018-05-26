import React, { Component } from 'react';
import threeEntryPoint from './threejs/threeEntryPoint';

export default class ThreeContainer extends Component {

    onElementClicked = (id) => {
        this.props.onElementClicked(id);
    };

    componentDidMount() {
        this.three = threeEntryPoint(this.threeRootElement, this.onElementClicked);
        this.three.updateData(this.props.data)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.three.updateData(this.props.data);
    }

    render () {
        return (
            <div style={{height: '100%'}} ref={element => this.threeRootElement = element} />
        );
    }

}