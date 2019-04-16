//React API
import React from 'react';
import PropTypes from 'prop-types';

import {widgetHoc} from './Widget.js';


export class RawLabel extends React.Component {

    constructor(props) {
        super(props);
    }

    //Render a div that displays the desired information in text format
    render() {
        let styles = {
            width: 100,
            backgroundColor: 'lightgray',
            position: 'absolute',
            left: this.props.x,
            top: this.props.y,
            whiteSpace: 'nowrap',
            overflow: 'hidden'
        };
        return(<div style={styles}>{this.props.label}</div>);
    }
}

//We expect EPICSValues to be numbers, PVs to be strings
RawLabel.propTypes = {
    label: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number
};

export const Label = widgetHoc(RawLabel);