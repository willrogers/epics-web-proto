import React from 'react';
import WritableInputComponent from '../components/WritableInputComponent.js'
import {SuperContainer} from './SuperContainer.js'

export class WritableInputContainer extends SuperContainer {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <WritableInputComponent />
        );
    }

}