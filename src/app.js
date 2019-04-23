import React from 'react';
import ReactDOM from 'react-dom';

import {widgetFactory} from './widget-factory';
import {Display} from './widgets/display';

import {connectToServer} from './actions/epics-actions';


const app = {
    x: 0,
    y: 0,
    w: 500,
    h: 300,
    children: [
        {
            widgetType: 'Label',
            x: 10,
            y: 10,
            w: 100,
            h: 100,
            label: 'hello'
        },
        {
            widgetType: 'TextUpdate',
            x: 110,
            y: 10,
            w: 100,
            h: 100,
            pv: 'loc://local'
        }
    ]
};


const websocketURL = 'ws://localhost:8080/epics2web/monitor';
const pluginType = 'simulator';

class App extends React.Component {

    //When the app is started, create a connection action.
    //This will open a websocket that connects to the specified
    //URL.
    componentWillMount() {
        connectToServer(websocketURL, pluginType);
    }

    //This specifies the components that we desire, along with supplying
    //them with parameters in the form of props. These props are then used
    //in the components themselves to inform their presentation.
    render() {
        const children = app.children;
        delete app.children;
        return(
            <Display factory={widgetFactory} children={children} {...app} />
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
