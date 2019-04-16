import React from 'react';
import {TextInputWidget} from '../widgets/TextInputWidget.js';
import {epicsHoc, setEpicsValue} from './EpicsHoc.js';


export class TextInput extends React.Component {

    render() {
        const EpicsTextInput = epicsHoc(TextInputWidget);
        console.log(this.props);
        return <EpicsTextInput setValue={setEpicsValue} value={this.props.EPICSValue} {...this.props} />;
    }
}