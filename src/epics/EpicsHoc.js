import React from 'react';
import {store} from '../redux/EPICSStore.js';
import {WRITE_PV, subscribeToPV, unsubscribeToPV} from '../actions/EPICSActions.js';

//Instantiate an Id for tracking the component
let currentId = 0;

export function epicsHoc(Widget) {

    // eslint-disable-next-line react/display-name
    return class extends React.Component {

        constructor(props) {
            super(props);
            this.id = currentId;  //Assign the component an Id
            currentId++; //Increment the current id so the next comp id is unique
            this.state = {EPICSValue: null, PV: null}; //Initialise the internal state for display
            this.hookToStore(); // hook the container to the store.
            this.setValue = this.setValue.bind(this);
        }

        //onMount, subscribe to a PV.
        componentDidMount() {
            //The desired PV will be taken from the components props so we pass the container/compo.
            subscribeToPV(this);
            //Assigning this to the object and not the global window object.
            let self = this;
            //In the event that the page unloads, unsubscribe the component.
            window.addEventListener('beforeunload', function() {
                unsubscribeToPV(self.id);
            });
        }

        //onUnmount remove the event listener that we created to listen to unloads.
        componentWillUnmount() {
            let self = this;
            window.removeEventListener('beforeunload', function() {
                unsubscribeToPV(self.id);
            });
        }

        //Register the component to listen to the store.
        hookToStore() {
            //API method for listening to store
            store.subscribe(()=>{
                //If the state exists..
                if (typeof store.getState() !== 'undefined') {
                    //..set the internal state to that of the appropriate store state.
                    this.setState(
                        {
                            EPICSValue: store.getState().epicsData[this.props.pv],
                            PV: this.props.pv
                        }
                    );
                }
            });
        }

        setValue(newValue) {
            let self = this;
            store.dispatch({
                type: WRITE_PV,
                payload: {
                    pv: self.props.pv,
                    newValue: newValue
                }
            });
        }

        //No render required, takes place in child components.
        render() {
            return <Widget {...this.props} />;
        }
    };
}