import React from 'react';
import {epicsHoc} from '../src/epics/epics-hoc';

import {shallow} from 'enzyme';


describe('epicsHoc', () => {

    const Comp = _props => {
        return <div />;
    };

    it('should wrap a component', () => {
        const EpicsComp = epicsHoc(Comp);
        shallow(<EpicsComp />);
    });

});