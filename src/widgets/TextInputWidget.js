import React from 'react';
import PropTypes from 'prop-types';

import {widgetHoc} from './Widget.js';


export class RawTextInput extends React.Component {

    constructor(props) {
        super(props);
        /* One argument: new value (string). */
        this.setValue = this.props.setValue;
        this.state = {'value': '', 'InputValue': ''};
        this.styles = this.props.styles || {};
        this.styles['width'] = 100;
        this.styles['backgroundColor'] = 'lightgray';
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
            this.setValue(event.target.value);
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
        let val = this.state.value || '';
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
                style={this.styles}
            />
        );
    }
}

RawTextInput.propTypes = {
    value: PropTypes.string,
    precision: PropTypes.number
};
RawTextInput.defaultProps = {
    value: '',
    InputValue: ''
};

export const TextInputWidget = widgetHoc(RawTextInput);