import React from 'react';
import {epicsHoc} from '../src/epics/EpicsHoc.js';

import {shallow} from 'enzyme';


describe('epicsHoc', () => {

    const Comp = _props => {
        return <div />;
    };

    it('should wrap a component', () => {
        const EpicsComp = epicsHoc(Comp);
        const shallowEpicsWidget = shallow(<EpicsComp />);
    });

});