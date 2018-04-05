import React from 'react';

export class WritableInputComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {inputValue: null};
    }

    handleSubmit() {
        //Do stuff;
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="number" onChange={this.handleChange} />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}