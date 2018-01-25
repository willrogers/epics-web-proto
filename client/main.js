//Import React API
import React from 'react';
import ReactDOM from 'react-dom';

//Import the desired components
import {DivContainer} from './containers/DivContainer.js';
import {GaugeContainer} from './containers/GaugeContainer.js';
import {WebSockStatusContainer} from './containers/WebSockStatusContainer.js';

//Import the action creator
import {connectToServer} from './actions/EPICSActions.js';

//Define the destination to connect the WebSocket to
const webSocketURL = 'ws://pc0088:8080/ws';

class App extends React.Component {

    //When the app is started, create a connection action.
    //This will open a websocket that connects to the specified
    //URL.
    componentWillMount() {
        connectToServer(webSocketURL);
    }

    //This specifies the components that we desire, along with supplying
    //them with parameters in the form of props. These props are then used
    //in the components themselves to inform their presentation.
    render() {
        return(
            <div>
                <DivContainer block="ADC" property="adc"/>
                <DivContainer block="SIGNAL" property="signal"/>
                <DivContainer block="TEMPERATURE" property="temp1"/>
                <GaugeContainer block="TEMPERATURE" property="temp1" width="500" height='150' minVal='0' maxVal='100'/>
                <WebSockStatusContainer width="500" height="50"/>
            </div>
        );
    }
}

//Apply the top level react 'App' component to our HTML file (index.html)
document.addEventListener('DOMContentLoaded', ()=>{
    ReactDOM.render(
        <App/>,
        document.getElementById('mount')
    );
});
