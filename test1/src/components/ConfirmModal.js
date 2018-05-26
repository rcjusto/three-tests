import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/es/Modal";
import {render, unmountComponentAtNode} from 'react-dom';

class ConfirmModal extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            value: props.initialValue
        };
    }

    static propTypes = {
        title: PropTypes.string,
        message: PropTypes.string,
        initialValue: PropTypes.string,
        showField: PropTypes.bool,
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func
    };

    onClickConfirm = () => {
        if (this.props.onConfirm) {
            this.props.onConfirm(this.state.value);
        }
        this.close();
    };

    onClickCancel = () => {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
        this.close();
    };

    close = () => {
        removeElementReconfirm();
    };

    onChangeValue = (event) => {
        this.setState({value: event.target.value});
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.initialValue !== this.state.value) {
            this.setState({
                value: nextProps.initialValue
            });
        }
    }

    render() {
        return (<div>
            <Modal show={true} onHide={this.close}>
                {this.props.title &&
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                }
                <Modal.Body>
                    {this.props.message &&
                    <p>{this.props.message}</p>
                    }
                    {this.props.showField &&
                    <p><input type="text" className="form-control" value={this.state.value}
                              onChange={this.onChangeValue}/></p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-primary" ref='confirm' onClick={this.onClickConfirm}>OK
                    </button>
                    <button type="button" className="btn btn-default" onClick={this.onClickCancel}>Cancel</button>
                </Modal.Footer>
            </Modal></div>);
    }

}

function createElementReconfirm(properties) {
    console.log('aqui 1');
    const divTarget = document.createElement('div');
    divTarget.id = 'react-confirm-alert';
    document.body.appendChild(divTarget);
    render(<ConfirmModal {...properties} />, divTarget);
}

function removeElementReconfirm() {
    const target = document.getElementById('react-confirm-alert');
    setTimeout(() => {
        unmountComponentAtNode(target);
        target.parentNode.removeChild(target);
    });
}

export function confirm(properties) {
    createElementReconfirm(properties);
}
