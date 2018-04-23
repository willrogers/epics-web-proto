//React API
import React from 'react';
import PropTypes from 'prop-types';

//Import the closeWebsocket action.
import {unsubscribeAll} from '../actions/EPICSActions';


export default class WebSockStatusComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    //Define the status update that we want to display in the component.
    //TODO This should be changed a little to allow us to change the shape &
    //size of the text via props at the top level.
    getStatusText() {
        return (
            <text x="30" y="30" fill="black">
                WebSocket readyState: {this.props.readyState}
            </text>
        );
    }

    //Event handler to close the webSocket when a user presses the button
    handleClick() {
        unsubscribeAll();
    }

    //Create the webSocket status display. Tested with an svg for easy
    //extension in future. SVG takes props from its container, and
    // displays the return of getStatusText()
    render() {
        return (
            <div>
                <svg width={this.props.width} height={this.props.height}> {this.getStatusText()} </svg>
                <button onClick={ ()=> this.handleClick() }> Disconnect </button>
            </div>
        );

    }
}

//Prop checking
WebSockStatusComponent.propTypes = {
    readyState: PropTypes.number,
    width: PropTypes.string,
    height: PropTypes.string
};