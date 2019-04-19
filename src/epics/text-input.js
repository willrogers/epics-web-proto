import React from 'react';
import {TextInputWidget} from '../widgets/text-input-widget';
import {epicsHoc, setEpicsValue} from './epics-hoc';


export class TextInput extends React.Component {

    render() {
        const EpicsTextInput = epicsHoc(TextInputWidget);
        return <EpicsTextInput setValue={setEpicsValue} {...this.props} />;
    }
}