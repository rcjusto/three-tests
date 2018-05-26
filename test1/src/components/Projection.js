import React from 'react';
import Icon from "../../node_modules/react-fa/lib/Icon";


class Projection extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            elements: [],
            minX: 0,
            minY: 0,
            maxX: 0,
            maxY: 0,
            expanded: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.processData(nextProps.data, nextProps.selected, nextProps.axis);
    }

    processData = (data, selected, axis) => {
        const _indexes = {
            "x": [2, 1],
            "y": [0, 2],
            "z": [0, 1],
        };
        const ind0 = _indexes[axis] ? _indexes[axis][0] : 0;
        const ind1 = _indexes[axis] ? _indexes[axis][1] : 1;
        let elements = [];
        let minX = null, minY = null, maxX = null, maxY = null;
        data
            .filter(el => {
                return el.type === 'wood'
            })
            .forEach(el => {
                const
                    x = el.position[ind0],
                    y = el.position[ind1],
                    w = el.size[ind0],
                    h = el.size[ind1];
                if (minX === null || minX > x) minX = x;
                if (minY === null || minY > y) minY = y;
                if (maxX === null || maxX < x + w) maxX = x + w;
                if (maxY === null || maxY < y + h) maxY = y + h;

                elements.push({x: x, y: y, w: w, h: h, selected: el.id === selected});
            });
        this.setState({
            elements: elements,
            minX: minX || 0,
            minY: minY || 0,
            maxX: maxX || 0,
            maxY: maxY || 0
        })
    };

    render() {
        const NORMAL_STYLE = {
            fill: '#dddddd',
            fillOpacity: 0.4
        };
        const SELECTED_STYLE = {
            fill: '#ff0000',
            fillOpacity: 0.4
        };
        const {minX, minY, maxX, maxY, elements} = this.state;
        let viewBox = '' + minX + ' ' + minY + ' ' + (maxX - minX) + ' ' + (maxY - minY);
        let transformation = "";
        switch (this.props.axis) {
            case 'x':
            case 'z':
                transformation = "scale(1,-1)";
                break;
            default:
        }
        return (<div className="projection">
            <div className="block-title">
                <a href="/" onClick={(e) => {
                    e.preventDefault();
                    this.setState({expanded: !this.state.expanded})
                }}>
                    <Icon name={this.state.expanded ? 'minus-square-o' : 'plus-square-o'}/> Projection Axis <span
                    style={{textTransform: 'uppercase'}}>{this.props.axis}</span>
                </a>
            </div>
            {this.state.expanded &&
            <div className="block-content">
                <svg viewBox={viewBox} width="100%" transform={transformation}>
                    {elements.map((e, index) => {
                        return (<rect key={index} x={e.x} y={e.y} width={e.w} height={e.h}
                                      style={e.selected ? SELECTED_STYLE : NORMAL_STYLE}/>);
                    })};
                </svg>
            </div>
            }
        </div>);
    }
}

export default Projection;