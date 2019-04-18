//React API
import React from 'react';
import PropTypes from 'prop-types';

import {widgetHoc} from './Widget.js';


const DEFAULT_STYLE = {
    'backgroundColor': 'lightgray',
    'whiteSpace': 'nowrap',
    'overflow': 'hidden'
};

export class RawLabel extends React.Component {

    constructor(props) {
        super(props);
    }

    //Render a div that displays the desired information in text format
    render() {
        return(<div style={this.props.style}>{this.props.label}</div>);
    }
}

//We expect EPICSValues to be numbers, PVs to be strings
RawLabel.propTypes = {
    label: PropTypes.string,
    style: PropTypes.object,
    x: PropTypes.number,
    y: PropTypes.number
};

export const Label = widgetHoc(RawLabel, DEFAULT_STYLE);