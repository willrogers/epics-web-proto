import React from 'react';
import DivComponent from '../components/DivComponent.js';
import {SuperContainer} from './SuperContainer.js';

export class DivContainer extends SuperContainer {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <DivComponent EPICSValue={this.state.EPICSValue} PV={this.state.PV} />
        );
    }

}
