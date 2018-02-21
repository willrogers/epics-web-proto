import React from 'react';
import {LabelComponent} from '../components/LabelComponent.js';
import {SuperContainer} from './SuperContainer.js';

export class LabelContainer extends SuperContainer {
    constructor(props) {
        super(props)
    }

    render() {
        return <LabelComponent
            PV={this.state.PV}
            // textStyle={this.state.labelStyle}
            // height={this.state.height}
            // width={this.state.width}
            // bgroundColour={this.state.bgroundColour}
        />
    };
}