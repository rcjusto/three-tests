import React, {Component} from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Switch from "react-router-dom/es/Switch";
import Edit from "./components/Edit";
import Home from "./Home";
import Header from "./components/Header";
import * as styles from "./App.style";
import Config from "./components/Config";

class App extends Component {

    render() {
        return (<div style={styles.CONTAINER}>
            <div style={styles.HEADER_CONTAINER}>
                <Header/>
            </div>
            <div style={styles.BODY_CONTAINER}>
                <Switch>
                    <Config path='/config'/>
                    <Edit path='/:id'/>
                    <Home path='/'/>
                </Switch>
            </div>
        </div>);
    }
}

export default App;
