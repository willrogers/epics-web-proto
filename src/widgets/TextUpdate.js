//React API
import React from 'react';
import PropTypes from 'prop-types';
import {EpicsContainer} from '../containers/EpicsContainer';

export default class TextUpdate extends EpicsContainer {

    constructor(props) {
        super(props);
        this.styles['width'] = 100;
        this.styles['backgroundColor'] = 'lightgray';
        this.styles['overflow'] = 'hidden';
    }

    //Render a div that displays the desired information in text format
    render() {
        let formattedString = '';
        if (typeof this.props.value != 'undefined' && this.props.value !== null) {
            let val = '';
            if (typeof this.state.EPICSValue == 'string') {
                val = parseFloat(this.state.EPICSValue);
            } else {
                val = this.state.EPICSValue;
            }
            formattedString = val.toFixed(3);
        }
        let styles = Object.assign({}, this.styles);
        styles['left'] = this.props.x;
        styles['top'] = this.props.y;
        return(<div style={styles}>{formattedString}</div>);
    }
}

//We expect EPICSValues to be numbers, PVs to be strings
TextUpdate.propTypes = {
    value: PropTypes.string,
    PV: PropTypes.string
};
