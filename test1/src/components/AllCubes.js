import React from 'react';
import StoredMesh from './StoredMesh';
import Cube from "./Cube";


class AllCubes extends React.Component {

    cube(data, index) {
        return (<Cube
            key={index}
            name={'cube_' + data.id}
            position={data.position}
            rotation={data.rotation || [0,0,0]}
            size={data.size}
            camera={this.props.camera}
            type={data.type}
            selected={data.id === this.props.selected}
        />);
    }

    file(data, index) {
        return (<StoredMesh
            key={index}
            name={'stored_' + data.id}
            url={data.url}
            position={data.position}
            rotation={data.rotation || [0,0,0]}
            size={data.size}
            camera={this.props.camera}
            type={data.type}
            selected={data.id === this.props.selected}
        />);
    }

    render() {
        return (<group>
            {this.props.data.map((data, index) => {
                switch (data.type.toLowerCase()) {
                    case 'file':
                        return this.file(data, index);
                    default:
                        return this.cube(data, index);
                }
            })}

        </group>);
    }
}

export default AllCubes;