import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/es/Modal";
import {render, unmountComponentAtNode} from 'react-dom';
import * as styles from "./ModalSelTexture.styles";

import Textures from "../../../services/Textures";

class ModalSelTexture extends Component {

    static propTypes = {
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func
    };

    selectTexture(texture) {
        if (this.props.onConfirm) {
            this.props.onConfirm(texture);
        }
        this.close();
    }

    close = () => {
        removeElementReconfirm();
    };


    render() {
        const {textures, selected} = this.props;
        return (<div>
            <Modal show={true} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Select a Texture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.onSubmit}>
                        <ul style={styles.UL}>
                            {textures.map((el, ind) => {

                                const styleLink = JSON.parse(JSON.stringify(styles.LINK_SPAN));
                                styleLink['backgroundImage'] = 'url('+Textures.getURL(el)+')';

                                return (<li key={ind} style={styles.LI}>
                                    <a className="no-underline" style={(el === selected) ? styles.LINK_SEL : styles.LINK} href="/" onClick={(e) => {
                                        e.preventDefault();
                                        this.selectTexture(el);
                                    }}><span style={styleLink} /></a>
                                </li>)
                            })}
                        </ul>
                    </form>
                </Modal.Body>
            </Modal></div>);
    }

}

function createElementReconfirm(properties) {
    const divTarget = document.createElement('div');
    divTarget.id = 'modal-sel-texture';
    document.body.appendChild(divTarget);
    render(<ModalSelTexture {...properties} />, divTarget);
}

function removeElementReconfirm() {
    const target = document.getElementById('modal-sel-texture');
    setTimeout(() => {
        unmountComponentAtNode(target);
        target.parentNode.removeChild(target);
    });
}

export function modalSelTexture(properties) {
    createElementReconfirm(properties);
}
