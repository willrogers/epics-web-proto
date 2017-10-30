import React from 'react';
import ReactDOM from 'react-dom';
import {DivContainer} from './containers/DivContainer.js';

class App extends React.Component{

    render(){
        return(
            <div>
                <DivContainer/>
            </div>
        );
    }
}

document.addEventLIstener ('DOMContentLoaded', ()=>{
    ReactDOM.render(
        <App/>,
        document.getElementById('mount')
    );
});