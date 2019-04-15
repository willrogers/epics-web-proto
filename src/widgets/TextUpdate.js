//React API
import React from 'react';
import PropTypes from 'prop-types';
import {EpicsContainer} from '../containers/EpicsContainer';

const PRECISION_NOT_SPECIFIED = -1;

export default class TextUpdate extends EpicsContainer {

    constructor(props) {
        super(props);
        this.styles['width'] = 100;
        this.styles['backgroundColor'] = 'lightgray';
        this.styles['overflow'] = 'hidden';
    }

    //Render a div that displays the desired information in text format
    render() {
        let formattedString = this.props.value;
        if (this.props.precision != PRECISION_NOT_SPECIFIED) {
            const prec = parseFloat(this.props.precision);
            let val = parseFloat(this.props.value);
            formattedString = val.toFixed(prec);
        }
        let styles = Object.assign({}, this.styles);
        styles['left'] = this.props.x;
        styles['top'] = this.props.y;
        return(<div style={styles}>{formattedString}</div>);
    }
}

TextUpdate.propTypes = {
    value: PropTypes.string,
    precision: PropTypes.number
};
TextUpdate.defaultProps = {
    value: '',
    precision: PRECISION_NOT_SPECIFIED
};
