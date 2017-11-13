import React from 'react';
import GaugeComponent from '../components/GaugeComponent.js';
import {SuperContainer} from './SuperContainer.js'

export class GaugeContainer extends SuperContainer {
    constructor(props) {
        super(props)
    }

    render() {
        /*I think we use state here, inherited from the SuperContainer,
        ie not the react component inheritence that would normally use
        props */
        return(
            <GaugeComponent
                EPICSValue={this.state.EPICSValue}
                width={this.props.width}
                height={this.props.height}
            />
        );
    }
}