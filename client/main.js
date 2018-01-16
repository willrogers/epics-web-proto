import React from 'react';
import ReactDOM from 'react-dom';
import {DivContainer} from './containers/DivContainer.js';
import {GaugeContainer} from './containers/GaugeContainer.js';
import {WebSockStatusContainer} from './containers/WebSockStatusContainer.js'
import {connectToServer} from './actions/EPICSActions.js';

//Define the destination to connect the WebSocket to
const webSocketURL = 'ws://pc0088:8080/ws';

class App extends React.Component {

    componentWillMount() {
        connectToServer(webSocketURL);
    }

    render() {
        return(
            <div>
                <DivContainer block="ADC" property="adc"/>
                <DivContainer block="SIGNAL" property="signal"/>
                <DivContainer block="TEMPERATURE" property="temp1"/>
                <GaugeContainer block="TEMPERATURE" property="temp1" width="1000" height='150' minVal='0' maxVal='100'/>
                <WebSockStatusContainer width="500" height="100"/>
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

//<WebSockStatusContainer width="200" height="207"/>