import React from 'react';
import * as styles from "./Header.style";
import Icon from "../../node_modules/react-fa/lib/Icon";
import logo from './logo.png';


export default class Header extends React.Component {

    render() {
        return (<div style={styles.HEADER}>
            <img src={logo} alt=" " style={styles.LOGO}/>
            <span style={styles.NAME}>WoodWorking Designer</span>
            <ul style={styles.LINKS}>
                <li style={styles.LINK_CONTAINER}>
                    <a style={styles.LINK} href="/"><Icon name='list'/> Designs</a>
                </li>
                <li style={styles.LINK_CONTAINER}>
                    <a style={styles.LINK} href="/config"><Icon name="gear"/> Configuration</a>
                </li>
            </ul>
        </div>)
    }

}