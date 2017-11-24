import React from 'react';
import {store} from '../../redux/EPICSStore.js';
import {subscribeToPV, unsubscribeToPV} from '../actions/EPICSActions';
import PropTypes from 'prop-types';

let currentId = 0;

export class SuperContainer extends React.Component {

    constructor(props) {
        super(props);
        this.id = currentId;
        currentId++;
        this.state = {EPICSValue: null, PV: null};
        this.hookToStore();
    }

    componentDidMount() {
        subscribeToPV(this.id, this.props.block, this.props.property);
        let self = this;
        window.addEventListener('beforeunload', function() {
            unsubscribeToPV(self.id);
        });
    }

    componentWillUnmount() {
        let self = this;
        window.removeEventListener('beforeunload', function() {
            unsubscribeToPV(self.id);
        });
    }

    //Register the component to listen to the store. This triggers when
    //the store has changed.
    hookToStore() {
        store.subscribe(()=>{
            if (typeof store.getState() !== 'undefined') {
                this.setState(
                    {EPICSValue: store.getState().epicsData[this.props.property]}
                );
            }
        });
    }

    render() {
        return null;
    }
}

//We expect the SuperContainer's props to the be strings
SuperContainer.propTypes = {property: PropTypes.object};
SuperContainer.propTypes = {property: PropTypes.string};
