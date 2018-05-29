import React, {Component} from 'react';
import MainModel from "../../models/Main";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import * as styles from "./CutList.styles";
import {faRulerCombined} from "@fortawesome/fontawesome-free-solid/index.es";

export default class CutList extends Component {

    static UNIT_INCHES = 'inches';
    static UNIT_FEET = 'feet';
    static UNIT_BOARD_8 = 'board8';

    constructor(props, context) {
        super(props, context);
        this.state = {
            unit: CutList.UNIT_INCHES
        };
        this.changeUnit = this.changeUnit.bind(this);
    }

    generateList(model) {
        const list = {};
        JSON.parse(JSON.stringify(Object.values(model.elements)))
            .filter(el => {
                return el.type === MainModel.TYPE_BOX && !!el.visible
            })
            .forEach(el => {
                const arr = el.size.sort((e1,e2)=>{ return parseFloat(e1)<parseFloat(e2) ? -1 : 1 });
                const key = arr[0] + ' x ' + arr[1];
                if (list[key]) {
                    list[key] += arr[2]
                } else {
                    list[key] = arr[2]
                }
            });
        return Object.keys(list).map(k => {
            return {
                key : k,
                value: list[k],
            }
        }).sort((e1,e2) => {
            const arr1 = e1.key.split(' x ');
            const arr2 = e2.key.split(' x ');
            const v1 = parseFloat(arr1[0]) + parseFloat(arr1[1]);
            const v2 = parseFloat(arr2[0]) + parseFloat(arr2[1]);
            return v1 > v2 ? 1 : -1;
        });
    }

    getSize(v) {
        switch (this.state.unit) {
            case CutList.UNIT_FEET:
                return Math.ceil(v/12) + ' ft';
            case CutList.UNIT_BOARD_8:
                return Math.ceil(v/(12*8)) + ' bd';
            default:
                return Math.ceil(v) + ' in';
        }
    }

    changeUnit() {
        switch (this.state.unit) {
            case CutList.UNIT_FEET:
                this.setState({unit: CutList.UNIT_BOARD_8});
                break;
            case CutList.UNIT_BOARD_8:
                this.setState({unit: CutList.UNIT_INCHES});
                break;
            default:
                this.setState({unit: CutList.UNIT_FEET});
        }
    }

    static getUnitDesc(unit) {
        switch (unit) {
            case CutList.UNIT_FEET:
                return 'feet';
            case CutList.UNIT_BOARD_8:
                return '8-feet boards';
            default:
                return 'inches';
        }
    }

    render() {
        const {model} = this.props;
        const list = this.generateList(model);
        return <div className="bar-block">
            <div className="bar-block-name">
                <a className="right-link" href="/" onClick={(e) => {
                    e.preventDefault();
                    this.changeUnit();
                }} title="Change Unit"><FontAwesomeIcon icon={faRulerCombined}/></a>
                Cut List <span style={styles.TITLE_DESC}>({CutList.getUnitDesc(this.state.unit)})</span>
            </div>
            <div style={styles.CONTAINER}>
                <ul style={styles.MAIN_UL}>
                    {list.map((el, ind) => {
                        return (<li key={ind} className="clearfix" style={styles.LI}>
                            <span style={styles.LABEL}>{el.key}</span>
                            <span style={styles.VALUE}>{this.getSize(el.value)}</span>
                        </li>)
                    })}
                </ul>
            </div>
        </div>;
    }
}