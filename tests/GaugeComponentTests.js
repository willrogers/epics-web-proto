import GaugeComponent from '../client/components/GaugeComponent.js';
import React from 'react';

import {shallow, mount} from 'enzyme';
import {expect} from 'chai';

describe('GaugeComponent', function() {
    const shallowGauge = shallow(
        <GaugeComponent
            EPICSValue={'hello'}
            width={'1000'}
            height={'150'}
            minVal={'0'}
            maxVal={'100'}/>);

    const deepGauge1 = mount(
        <GaugeComponent
            EPICSValue={'150'}
            width={'1000'}
            height={'150'}
            minVal={'0'}
            maxVal={'100'}
        />);

    const deepGauge2 = mount(
        <GaugeComponent
            EPICSValue={'200'}
            width={'700'}
            height={'150'}
            minVal={'15'}
            maxVal={'120'}
        />);

    it('Should render a canvas', function() {
        expect(shallowGauge.type()).to.equal('canvas');
    });

    it('Should store the quarterly markers correctly', function() {
        expect(deepGauge1.instance().startMark).to.equal(100);
        expect(deepGauge1.instance().halfMark).to.equal(500);
        expect(deepGauge1.instance().threeQuarterMark).to.equal(700);
        expect(deepGauge1.instance().finishMark).to.equal(900);
    });

    it('Should create and populate an array', function() {
        expect(deepGauge1.instance().pipLocations[0]).to.equal(125);
        expect(deepGauge1.instance().pipLocations[1]).to.equal(150);
        expect(deepGauge1.instance().pipLocations[2]).to.equal(175);
        expect(deepGauge1.instance().pipLocations[27]).to.equal(875);

        expect(deepGauge1.instance().pipLocations.length).to.equal(28);
        expect(deepGauge2.instance().pipLocations.length).to.equal(22);
    });

});

