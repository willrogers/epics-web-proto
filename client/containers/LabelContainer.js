import React from 'react';
import DivComponent from '../components/DivComponent.js';
import {SuperContainer} from './SuperContainer.js';

export class LabelContainer extends SuperContainer {
    constructor(props) {
        super(props)
    }

    render() {
        return <LabelComponent
            labelText={this.state.labelText}
            height={this.state.height}
            width={this.state.width}
            bgroundColour={this.state.bgroundColour}
        />
    };
}git add