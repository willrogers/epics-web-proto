//Import the React API
import React from 'react';

//Import the desired components
import GaugeComponent from '../components/GaugeComponent.js';
import {SuperContainer} from './SuperContainer.js';

export class GaugeContainer extends SuperContainer {
    constructor(props) {
        super(props);
    }

    //GaugeCompo instantiation Specify the parameters to supply.
    render() {
        return(
            <GaugeComponent
                EPICSValue={this.state.EPICSValue}
                width={this.props.width}
                height={this.props.height}
                minVal={this.props.minVal}
                maxVal={this.props.maxVal}
            />
        );
    }
}