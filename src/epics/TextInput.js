import React from 'react';
import {TextInputWidget} from '../widgets/TextInputWidget.js';
import {epicsHoc, setEpicsValue} from './EpicsHoc.js';


export class TextInput extends React.Component {

    render() {
        const EpicsTextInput = epicsHoc(TextInputWidget);
        return <EpicsTextInput setValue={setEpicsValue} {...this.props} />;
    }
}