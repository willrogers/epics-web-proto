import React from 'react';
import DivComponent from '../components/DivComponent.js';
import {SuperContainer} from './SuperContainer.js';

export class DivContainer extends SuperContainer {

    constructor(props) {
        super(props);
    }

    //Instantiate a DivComponent
    render() {
        let formattedString = '';
        if (typeof this.state.EPICSValue != 'undefined' && this.state.EPICSValue !== null) {
            formattedString = this.state.EPICSValue.toFixed(3);
        }
        return(
            <DivComponent EPICSValue={formattedString} PV={this.state.PV} />
        );
    }

}
