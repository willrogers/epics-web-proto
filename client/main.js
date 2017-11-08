import React from 'react';
import ReactDOM from 'react-dom';
import {DivContainer} from './containers/DivContainer.js';

class App extends React.Component {

    render() {
        return(

            <div>                
                <div id="signal">
                    <DivContainer block="SIGNAL" property="signal" />
                </div>
                <div>
                </div>
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