import React from 'react';
import {Label} from './widgets/label';
import {Gauge, TextUpdate} from './epics/epics-widgets.js';
import {TextInput} from './epics/text-input';
import {WebsocketStatus} from './widgets/websocket-status';

const components = {
    'Gauge': Gauge,
    'Label': Label,
    'TextUpdate': TextUpdate,
    'TextInput': TextInput,
    'WebsocketStatus': WebsocketStatus
}


export const widgetFactory = (widgetJson, key) => {
    const Widget = components[widgetJson['widgetType']];
    delete widgetJson['widgetType'];
    widgetJson['key'] = key;
    console.log(widgetJson);
    return <Widget {...widgetJson} />;
};