import React from 'react';

export class ReloadButtonComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    buttonPress() {
        location.reload();
    }

    render() {
        return(
            <button type='button' onClick={() => {this.buttonPress();}}>
                Refresh page
            </button>
        );
    }
}