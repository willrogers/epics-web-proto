/* Example of an SVG-based widget. */
import React from 'react';
import PropTypes from 'prop-types';

//Import the closeWebsocket action.
import {closeWebsocket} from '../actions/EPICSActions';
import {store} from '../redux/EPICSStore';
import {EpicsContainer} from '../containers/EpicsContainer';


export default class WebsocketStatus extends EpicsContainer {

    constructor(props) {
        super(props);
        this.state = {readyState: null};
        this.hookToStore();
    }

    //Listen for changes to the wsReadyState in the store, copy it
    //to the internal state
    hookToStore() {
        store.subscribe(()=>{
            if (typeof store.getState() !== 'undefined') {
                this.setState(
                    {readyState: store.getState().wsReadyState}
                );
            }
        });
    }

    //Define the status update that we want to display in the component.
    //TODO This should be changed a little to allow us to change the shape &
    //size of the text via props at the top level.
    getStatusText() {
        return (
            <text x="30" y="30" fill="black">
                Websocket readyState: {this.state.readyState}
            </text>
        );
    }

    //Event handler to close the websocket when a user presses the button
    handleClick() {
        closeWebsocket();
    }

    //Create the websocket status display. Tested with an svg for easy
    //extension in future. SVG takes props from its container, and
    // displays the return of getStatusText()
    render() {
        return (
            <div style={this.styles}>
                <svg width={this.props.width} height={this.props.height}> {this.getStatusText()} </svg>
                <button onClick={ ()=> this.handleClick() }> Disconnect </button>
            </div>
        );

    }
}

//Prop checking
WebsocketStatus.propTypes = {
    readyState: PropTypes.number,
    width: PropTypes.string,
    height: PropTypes.string
};