import GaugeComponent from '../client/components/GaugeComponent.js';
import React from 'react';

import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

import {shallow, mount} from 'enzyme';
import {expect} from 'chai';

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
        expect(deepGauge1.type()).to.equal(GaugeComponent);
    });

    it('Should render a canvas', function(){
       expect(deepGauge1.find('canvas')).to.have.length(1);
       // console.log(deepGauge1.instance().gaugeCanvas);
    });

    it('Should not render a heading', function(){
        expect(deepGauge1.find('h1')).to.have.length(0);
    });

    it('Should create a node in the DOM', function() {
        expect(deepGauge2.exists()).to.equal(true);
    });

    it('Should store the quarterly markers correctly', function() {
        expect(deepGauge2.instance().startMark).to.equal(100);
        expect(deepGauge2.instance().halfMark).to.equal(500);
        expect(deepGauge2.instance().threeQuarterMark).to.equal(700);
        expect(deepGauge2.instance().finishMark).to.equal(900)
    });

    it('Should create and populate an array of pip locations', function() {
        expect(deepGauge2.instance().pipLocations[0]).to.equal(125);
        expect(deepGauge2.instance().pipLocations[1]).to.equal(150);
        expect(deepGauge2.instance().pipLocations[2]).to.equal(175);
        expect(deepGauge2.instance().pipLocations[27]).to.equal(875);
        expect(deepGauge2.instance().pipLocations.length).to.equal(28);
        expect(deepGauge3.instance().pipLocations.length).to.equal(22);
    });

});

