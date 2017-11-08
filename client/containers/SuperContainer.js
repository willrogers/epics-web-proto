import React from 'react';
import {store} from '../../redux/EPICSStore.js';
import {connectToServer} from '../actions/EPICSActions';
import PropTypes from 'prop-types';



var currentId = 0;

export class SuperContainer extends React.Component {

    constructor(props) {
        super(props);
        this.id = currentId;
        currentId++;
        this.state = {EPICSValue: null, PV: null};
        this.hookToStore();
    }

    componentDidMount() {
        connectToServer(this);
    }

    //Register the component to listen to the store. This triggers when
    //the store has changed.
    hookToStore() {
        store.subscribe(()=>{
            this.setState({ EPICSValue: store.getState().epicsData[this.props.property]});
        });
    }

    render() {
        return null;
    }
}

SuperContainer.propTypes = { property: PropTypes.string };
