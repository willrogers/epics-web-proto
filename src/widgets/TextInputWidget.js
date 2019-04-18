import React from 'react';
import PropTypes from 'prop-types';

import {widgetHoc} from './Widget.js';

const DEFAULT_STYLES = {'backgroundColor': 'red'};

export class RawTextInput extends React.Component {

    constructor(props) {
        super(props);
        /* Two arguments: pv (string), new value (string). */
        this.setValue = this.props.setValue;
        this.state = {'value': '', 'InputValue': ''};
        this.update = true;
        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    onClick(_event) {
        this.update = false;
        this.setState({'InputValue': ''});
    }

    onBlur(_event) {
        this.update = true;
    }

    onKeyDown(event) {
        this.value = event.target.value;
        if (event.key === 'Enter') {
            this.setValue(this.props.pv, event.target.value);
            this.setState({'InputValue': ''});
            this.update = true;
            event.target.blur();
        } else if (event.key === 'Escape' || event.key === 'Esc') {
            this.setState({'InputValue': ''});
            this.update = true;
            event.target.blur();
        }
    }

    handleChange(event) {
        this.setState({'InputValue': event.target.value});
    }

    render() {
        //const styles = this.props.styles;
        //styles['backgroundColor'] = 'red';
        let val = this.state.value;
        if (this.update) {
            val = this.props.value;
        }
        if (val !== '') {
            if (typeof val == 'string') {
                val = parseFloat(val);
            }
            val = val.toFixed(3);
        }
        if (! this.update) {
            val = this.state.InputValue;
        }
        return (
            <input type="text"
                value={val}
                onChange={this.handleChange}
                onClick={this.onClick}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                style={this.props.styles}
            />
        );
    }
}

RawTextInput.propTypes = {
    pv: PropTypes.string,
    value: PropTypes.string,
    InputValue: PropTypes.string,
    setValue: PropTypes.func,
    precision: PropTypes.number,
    styles: PropTypes.object
};
RawTextInput.defaultProps = {
    value: '',
    InputValue: '',
    styles: {}
};

export const TextInputWidget = widgetHoc(RawTextInput, DEFAULT_STYLES);