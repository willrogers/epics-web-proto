import React from 'react';
import PropTypes from 'prop-types';
import {EpicsContainer} from '../containers/EpicsContainer';


export default class Gauge extends EpicsContainer {
    constructor(props) {
        super(props);
        this.canvasStyle = {
            border: '1px solid #000000',
            position: 'absolute',
            width: this.props.width,
            height: this.props.height,
            left: this.props.x,
            top: this.props.y
        };
    }

    //On startup, define the dimensions and metrics we need
    //to build the graph
    componentDidMount() {
        super.componentDidMount();
        this.defineClassConstants();
    }

    //When we receive and update. Get hold of the canvas, clear
    //it and then re-draw the gauge.
    componentDidUpdate(_prevProps, _prevState, _snapshot) {
        this.context2d = this.gaugeCanvas.getContext('2d');
        this.context2d.clearRect(0, 0, this.gaugeCanvas.width, this.gaugeCanvas.height);
        this.drawGauge();
    }

    //Create the gauge out of its constituent components
    //Markers, pips and the needle.
    drawGauge() {
        this.drawMarker(this.startMark);
        this.drawMarker(this.quarterMark);
        this.drawMarker(this.halfMark);
        this.drawMarker(this.threeQuarterMark);
        this.drawMarker(this.finishMark);
        this.drawNeedle(this.state.EPICSValue);
        for (let i in this.pipLocations) {
            this.drawPip(this.pipLocations[i]);
        }
    }

    //Draw a single pip at the supplied location
    drawPip(pipLoc) {
        this.context2d.beginPath();
        this.context2d.linewidth = this.pipWidth;
        this.context2d.strokeStyle = this.pipColour;
        this.context2d.moveTo(pipLoc, 100);
        this.context2d.lineTo(pipLoc, 130);
        this.context2d.stroke();
        this.context2d.closePath();
    }

    //Draw the marker at the supplied location, call annotate when done.
    drawMarker(markerLoc) {
        this.context2d.beginPath();
        this.context2d.lineWidth = this.markerWidth;
        this.context2d.strokeStyle = this.markerColour;
        this.context2d.moveTo(markerLoc, 50);
        this.context2d.lineTo(markerLoc, 130);
        this.context2d.stroke();
        this.context2d.closePath();
        this.annotateMarker(markerLoc);
    }

    //Annotate the marker with the appropriate numeric value.
    annotateMarker(annoLoc) {
        this.context2d.fillText('' + (this.calculateAnnoConversion(annoLoc)), annoLoc, 140);
    }

    //Convert the pixel value used for drawing, into a
    //numeric value that we can use for annotation of the markers.
    calculateAnnoConversion(annoPixel) {
        return (annoPixel - this.xAxisBuffer) / this.ratio;
    }

    //Draw the needle using the supplied EPICSValue
    drawNeedle(epicsVal) {
        this.context2d.beginPath();
        this.context2d.lineWidth = this.needleWidth;
        this.context2d.strokeStyle = this.needleColour;
        this.context2d.moveTo(this.calculateNeedleLocation(epicsVal), 130);
        this.context2d.lineTo(this.calculateNeedleLocation(epicsVal), 10);
        this.context2d.stroke();
        this.context2d.closePath();
    }

    //Calculate the needle location. Converts the epics data into a position
    //in the gauge, based on the minimum and maximum possihle values and the
    //size of the gauge.
    calculateNeedleLocation(eValue) {
        return((((eValue - this.minVal) / (this.maxVal - this.minVal)) * (this.internalXAxis)) + this.xAxisBuffer);
    }

    //Calculate and define numerous constants that are used in drawing the
    //gauge
    defineClassConstants() {

        //Obtaining a reference for the canvas
        this.context2d = this.gaugeCanvas.getContext('2d');

        //Internal Dimension definition
        this.internalXAxis = this.gaugeCanvas.width * 0.8;
        this.xAxisBuffer = this.gaugeCanvas.width * 0.1;
        this.rightSideEnd = this.internalXAxis + this.xAxisBuffer;

        //Style constants
        this.onePipInPixels = 25;
        this.pipWidth = 0.5;
        this.markerWidth = 1;
        this.needleWidth = 1.5;
        this.pipColour = '#cccccc';
        this.markerColour = '#000000';
        this.needleColour = '#ff0000';

        //Gauge conversion constants
        this.minVal = this.props.minVal;
        this.maxVal = this.props.maxVal;
        this.ratio = this.internalXAxis / (this.maxVal - this.minVal);

        //Define the quarterly marker values
        this.startMark = this.xAxisBuffer;
        this.quarterMark = (this.xAxisBuffer + this.internalXAxis * 0.25);
        this.halfMark = (this.xAxisBuffer + this.internalXAxis * 0.5);
        this.threeQuarterMark = (this.xAxisBuffer + this.internalXAxis * 0.75);
        this.finishMark = (this.internalXAxis + this.xAxisBuffer);

        //define pipLocations and store them in an array for iteration
        this.pipLocations = [];
        for (let i = this.xAxisBuffer; i <= this.rightSideEnd; i += this.onePipInPixels) {
            if ((i !== this.startMark)
                    && (i !== this.quarterMark)
                    && (i !== this.halfMark)
                    && (i !== this.threeQuarterMark)
                    && (i !== this.finishMark)) {
                this.pipLocations.push(i);
            }
        }

    }

    //HTML for describing the gauge.
    render() {
        return (
            <canvas
                ref={gaugeCanvas => this.gaugeCanvas = gaugeCanvas}
                width={this.props.width}
                height={this.props.height}
                style={this.canvasStyle}>
            </canvas>
        );
    }
}

//Prop checking.
Gauge.propTypes = {
    EPICSValue: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    property: PropTypes.string,
    minVal: PropTypes.string,
    maxVal: PropTypes.string
};
