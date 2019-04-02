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
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onClick(event) {
        this.update = false;
        event.target.select();
    }

    onBlur(event) {
    }

    onKeyPress(event) {
        this.value = event.target.value;
        if (event.key === 'Enter') {
            this.setValue(event.target.value);
            this.update = true;
        }
    }

    handleChange(event) {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        let val = this.state.EPICSValue;
        if (! this.update) {
            val = this.value;
        }
        console.log(`${this.update} ${val}`);
        return (
            <input type="text"
                   value={val}
                   onChange={this.handleChange}
                   onClick={this.onClick}
                   onBlur={this.onBlur}
                   onKeyPress={this.onKeyPress}
                   />
        );
    }
}

