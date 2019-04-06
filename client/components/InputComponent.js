import React from 'react';
import {BaseComponent} from "./BaseComponent";


export default class InputComponent extends BaseComponent {

    constructor(props) {
        super(props);
        this.styles['width'] = 100;
        this.styles['backgroundColor'] = 'lightgray';
        this.state = {'EPICSValue': '', 'InputValue': ''};
        this.update = true;
        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    onClick(event) {
        this.update = false;
        this.setState({'InputValue': ''})
    }

    onBlur(event) {
        this.update = true;
    }

    onKeyDown(event) {
        this.value = event.target.value;
        console.log(event.key);
        if (event.key === 'Enter') {
            this.setValue(event.target.value);
            this.setState({'InputValue': ''})
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

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        let val = this.state.EPICSValue;
        if (typeof val != 'undefined' && val !== null && val !== '') {
            if (typeof val == "string") {
                val = parseFloat(val);
            }
            val = val.toFixed(3);
        }
        if (! this.update) {
            val = this.state.InputValue;
        }
        if (typeof val === 'undefined') {
            val = '';
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

