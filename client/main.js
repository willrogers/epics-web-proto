

import React from 'react';
import ReactDOM from 'react-dom';
import {DivContainer} from './containers/DivContainer.js';
import {connectToServer} from './actions/EPICSActions.js'

class App extends React.Component {

    componentWillMount(){
        connectToServer();
    }

    render() {
        return(
            <div>
                <DivContainer block="ADC" property="adc"/>
                <DivContainer block="SIGNAL" property="signal"/>
                <DivContainer block="TEMPERATURE" property="temp1"/>
            </div>
        );
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    ReactDOM.render(
        <App/>,
        document.getElementById('mount')
    );
});