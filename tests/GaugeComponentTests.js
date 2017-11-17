import GaugeComponent from '../client/components/GaugeComponent.js';
import React from 'react';

import {shallow, mount} from 'enzyme';
import {expect} from 'chai';

describe('GaugeComponent', function() {
    const shallowGauge = shallow(<GaugeComponent EPICSValue="hello"/>);

    const deepGauge = mount(
        <GaugeComponent
            EPICSValue={'150'}
            width={'1000'}
            height={'150'}
            minVal={'0'}
            maxVal={'100'}
        />);

    it('Should render a canvas', function() {
        expect(shallowGauge.type()).to.equal('canvas');
    });

    it('Should store the quarterly markers correctly', function() {
        expect(deepGauge.instance().startMark).to.equal(100);
        expect(deepGauge.instance().halfMark).to.equal(500);
        expect(deepGauge.instance().threeQuarterMark).to.equal(700);
        expect(deepGauge.instance().finishMark).to.equal(900);
    });

    it('Should create and populate array', function() {
        expect(deepGauge.instance().pipLocations[0]).to.equal(100);
        expect(deepGauge.instance().pipLocations[1]).to.equal(125);
        expect(deepGauge.instance().pipLocations[2]).to.equal(150);

        expect(deepGauge.instance().pipLocations[32]).to.equal(900);
    });

});

