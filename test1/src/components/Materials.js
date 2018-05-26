import React from 'react';
import Icon from "../../node_modules/react-fa/lib/Icon";


class Materials extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            list: {},
            expanded: true
        };
    }

    componentWillReceiveProps(nextProps) {
        let obj = JSON.parse(JSON.stringify(nextProps.data));
        this.processData(obj);
    }

    processData = (data) => {
        let list = {};
        data
            .filter(el => {
                return el.type === 'wood'
            })
            .forEach(el => {
                let arr = el.size.sort((e1,e2)=>{ return parseFloat(e1)<parseFloat(e2) ? -1 : 1 });
                const key = arr[0] + ' x ' + arr[1];
                if (list[key]) {
                    list[key] += arr[2]
                } else {
                    list[key] = arr[2]
                }
            });
        this.setState({
            list: list
        });
    };

    render() {
        return (<div className="list-container">
            <div className="block-title">
                <a href="/" onClick={(e) => {
                    e.preventDefault();
                    this.setState({expanded: !this.state.expanded})
                }}>
                    <Icon name={this.state.expanded ? 'minus-square-o' : 'plus-square-o'}/> Materials
                </a>
            </div>
            {this.state.expanded &&
            <div className="block-content">
                <table className="table">
                    <tbody>
                    {Object.keys(this.state.list).map((key, index) => {
                        return (<tr key={index}>
                            <td>{key}</td>
                            <td style={{textAlign: 'right'}}>{this.state.list[key]} in</td>
                        </tr>);
                    })}
                    </tbody>
                </table>
            </div>
            }
        </div>);
    }
}

export default Materials;