//Import React API
import React from 'react';
import ReactDOM from 'react-dom';

//Import the desired components
import {GaugeContainer} from './containers/GaugeContainer.js';
import LabelComponent from './components/LabelComponent.js';
import DivComponent from './components/DivComponent.js';
import {WebSockStatusContainer} from './containers/WebSockStatusContainer.js';

//Import the action creator
import {connectToServer} from './actions/EPICSActions.js';

//Define the destination to connect the WebSocket to
const webSocketURL = 'ws://localhost:8080/epics2web/monitor';

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
                <LabelComponent x="0px" y="50px" label="SR-DI-DCCT-01:SIGNAL"/>
                <DivComponent x="100px" y="50px" pv="SR-DI-DCCT-01:SIGNAL"/>
                <LabelComponent x="0px" y="100px" label="SR23C-DI-DCCT-01:SIGNAL"/>
                <DivComponent x="100px" y="100px" pv="SR23C-DI-DCCT-01:SIGNAL"/>
                <GaugeContainer
                    pv="SR23C-DI-DCCT-01:SIGNAL"
                    width="300"
                    height="150"
                    x="50px"
                    y="150px"
                    minVal="0"
                    maxVal="0.1"
                />
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
