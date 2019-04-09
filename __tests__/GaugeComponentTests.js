import GaugeComponent from '../client/components/GaugeComponent.js';
import React from 'react';

import {mount} from 'enzyme';

describe('GaugeComponent', function() {

    const deepGauge1 = mount(
        <GaugeComponent
            EPICSValue={'hello'}
            width={'1000'}
            height={'150'}
            minVal={'0'}
            maxVal={'100'}
        />);

    const deepGauge2 = mount(
        <GaugeComponent
            EPICSValue={'150'}
            width={'1000'}
            height={'150'}
            minVal={'0'}
            maxVal={'100'}
        />);

    const deepGauge3 = mount(
        <GaugeComponent
            EPICSValue={'200'}
            width={'700'}
            height={'150'}
            minVal={'15'}
            maxVal={'120'}
        />);

    it('Should render a gauge component', function() {
        expect(deepGauge1.type()).toEqual(GaugeComponent);
    });

    it('Should render a canvas', function() {
        expect(deepGauge1.find('canvas')).toHaveLength(1);
    });

    it('Should not render a heading', function() {
        expect(deepGauge1.find('h1')).toHaveLength(0);
    });

    it('Should create a node in the DOM', function() {
        expect(deepGauge2.exists()).toEqual(true);
    });

    it('Should store the quarterly markers correctly', function() {
        expect(deepGauge2.instance().startMark).toEqual(100);
        expect(deepGauge2.instance().halfMark).toEqual(500);
        expect(deepGauge2.instance().threeQuarterMark).toEqual(700);
        expect(deepGauge2.instance().finishMark).toEqual(900);
    });

    it('Should create and populate an array of pip locations', function() {
        expect(deepGauge2.instance().pipLocations[0]).toEqual(125);
        expect(deepGauge2.instance().pipLocations[1]).toEqual(150);
        expect(deepGauge2.instance().pipLocations[2]).toEqual(175);
        expect(deepGauge2.instance().pipLocations[27]).toEqual(875);
        expect(deepGauge2.instance().pipLocations.length).toEqual(28);
        expect(deepGauge3.instance().pipLocations.length).toEqual(22);
    });

});

