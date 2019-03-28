//React API
import React from 'react';
import PropTypes from 'prop-types';
import {BaseComponent} from "./BaseComponent";

export default class DivComponent extends BaseComponent {

    constructor(props) {
        super(props);
        this.styles['width'] = 100;
        this.styles['backgroundColor'] = 'lightgray';
        this.styles['overflow'] = 'hidden';
    }

    //Render a div that displays the desired information in text format
    render() {
        console.log(`component render called with ${this.state.EPICSValue}`)
        let formattedString = '';
        if (typeof this.state.EPICSValue != 'undefined' && this.state.EPICSValue !== null) {
            formattedString = this.state.EPICSValue.toFixed(3);
        }
        console.log(this.styles)
        var styles = Object.assign({}, this.styles)
        styles['left'] = this.props.x;
        styles['top'] = this.props.y;
        return(<div style={styles}>{formattedString}</div>);
    }
}

//We expect EPICSValues to be numbers, PVs to be strings
DivComponent.propTypes = {
    EPICSValue: PropTypes.string,
    PV: PropTypes.string
};
