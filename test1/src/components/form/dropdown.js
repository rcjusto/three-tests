import React from 'react';
import {DropdownButton, FormControl, FormGroup, InputGroup, MenuItem} from "react-bootstrap";


export default class DropDown extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            value: props.value
        };
        this.timeout = null;
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({
                value: nextProps.value
            });
        }
    }

    handleChange (event) {
        this.setState({value: event.target.value});
        const nv = parseFloat(event.target.value);
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        if (!isNaN(nv)) {
            setTimeout(() => {
                this.props.onUpdated(this.props.index || 0, nv);
            }, 500);
        }
    };

    render() {
        const {options} = this.props;
        const {value} = this.state;
        return (<div className="field-number">
            <FormGroup>
                <InputGroup>
                    <FormControl type="text" name={1} value={value} onChange={this.handleChange}/>
                    <DropdownButton componentClass={InputGroup.Button} pullRight id="input-dropdown-addon" title="">
                        {options.map((s, ind) => {
                            return (<MenuItem key={ind} onClick={(e) => {
                                e.preventDefault();
                                this.handleChange({
                                    target: {
                                        value: value + s
                                    }
                                })
                            }}>{s}</MenuItem>)
                        })}
                    </DropdownButton>
                </InputGroup>
            </FormGroup>
        </div>)
    }
}