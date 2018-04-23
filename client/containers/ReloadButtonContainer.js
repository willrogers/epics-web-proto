import React from 'react';
import {ReloadButtonComponent} from '../components/ReloadButtonComponent.js';
import {SuperContainer} from './SuperContainer.js';

export class ReloadButtonContainer extends SuperContainer {
    constructor(props) {
        super(props);
    }


    render() {
        return <ReloadButtonComponent
            //Do I need props here?
        />;
    }
}
