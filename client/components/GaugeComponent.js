import React from 'react';
import PropTypes from 'prop-types';

const canvasStyle ={border: '1px solid #000000'};

export default class GaugeComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.defineClassConstants();
    }

    componentWillUpdate() {
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.drawGauge();
    }

    drawGauge() {
        for (let i = this.xAxisBuffer; i <= this.rightSideEnd; i ++) {

            if(i == this.startMark)
                this.drawMarker(i);

            else if (i == this.quarterMark) {
                this.drawMarker(i);

            } else if (i == this.halfMark) {
                this.drawMarker(i);

            } else if (i == this.threeQaurterMark) {
                this.drawMarker(i);

            }else if (i == this.finishMark) {
                this.drawMarker(i);

            } else if (i%this.onePipInPixels == 0) {
                this.drawPip(i);
            }
        }
        this.drawNeedle(this.props.EPICSValue);
    }

    drawPip(pipLoc) {
        this.context.beginPath();
        this.context.linewidth = this.pipWidth;
        this.context.strokeStyle = this.pipColour;
        this.context.moveTo(pipLoc, 100);
        this.context.lineTo(pipLoc, 130);
        this.context.stroke();
    }

    //Draw the marker at the supplied location, call annotate when done.
    drawMarker(markerLoc) {
        this.context.beginPath();
        this.context.lineWidth='1';
        this.context.strokeStyle= this.markerColour;
        this.context.moveTo(markerLoc, 50);
        this.context.lineTo(markerLoc, 130);
        this.context.stroke();
        this.annotateMarker(markerLoc);
    }

    //Annotate the marker with the appropriate numeric value.
    annotateMarker(annoLoc) {
        this.context.fillText(''+(this.calculateAnnoConversion(annoLoc)), annoLoc, 140);
    }

    calculateAnnoConversion(annoPixel) {
        const annoConvert = (annoPixel - this.xAxisBuffer)/this.ratio;
        return annoConvert;
    }

    //Draw the needle using the supplied EPICSValue
    drawNeedle(epicsVal) {
        this.context.beginPath();
        this.context.lineWidth='3';
        this.context.strokeStyle = this.needleColour;
        this.context.moveTo(this.calculateNeedleLocation(epicsVal), 130);
        this.context.lineTo(this.calculateNeedleLocation(epicsVal), 10);
        this.context.stroke();
    }

    calculateNeedleLocation(eValue) {
        let needleLocation = ((((eValue-this.minVal)/(this.maxVal-this.minVal))*(this.internalXAxis)) +
            this.xAxisBuffer);
        return needleLocation;
    }

    defineClassConstants() {
        //Canvas definition
        this.canvas = this.refs.gaugeRef;
        this.context = this.canvas.getContext('2d');

        this.internalXAxis = this.canvas.width*0.8;
        this.internalYAxis = this.canvas.height*0.8;
        this.xAxisBuffer = this.canvas.width*0.1;
        this.yAxisBuffer = this.canvas.height*0.1;
        this.rightSideEnd = this.internalXAxis + this.xAxisBuffer;
        this.onePipInPixels = 25;

        //Style constants
        this.pipWidth = 0.5;
        this.markerWidth = 1;
        this.needleWidth= 3;
        this.pipColour = '#515151';
        this.markerColour = '#000000';
        this.needleColour = '#ff0000';

        this.minVal = this.props.minVal;
        this.maxVal = this.props.maxVal;
        this.valueDomainSpace = (this.maxVal - this.minVal);
        this.ratio = this.internalXAxis/(this.maxVal-this.minVal);

        //Define the quarterly values
        this.startMark = this.xAxisBuffer;
        this.quarterMark = (this.xAxisBuffer + this.internalXAxis*0.25);
        this.halfMark = (this.xAxisBuffer + this.internalXAxis*0.5);
        this.threeQaurterMark = (this.xAxisBuffer + this.internalXAxis*0.75);
        this.finishMark = (this.internalXAxis + this.xAxisBuffer);

        //Define start/height of each pip
        this.pipTopCoord = (this.internalYAxis * 0.2);
        this.pipBaseCoord = (this.internalYAxis - this.yAxisBuffer);

        //Define start/height of each marker
        this.markerTopCoord = (this.internalYAxis * 0.5);
        this.markerBaseCoord = (this.internalYAxis - this.yAxisBuffer);

        //Define start/height of the needle
        this.needleTopCoord = (this.internalYAxis * 0.9);
        this.needleBaseCoord = (this.internalYAxis - this.yAxisBuffer);
    }

    render() {
        return (
            <canvas
                ref={'gaugeRef'}
                width={this.props.width}
                height={this.props.height}
                style={canvasStyle}
            >
            </canvas>
        );
    }
}

GaugeComponent.propTypes = { EPICSValue: PropTypes.number };
GaugeComponent.propTypes = { width: PropTypes.string };
GaugeComponent.propTypes = { height: PropTypes.string };
GaugeComponent.propTypes = { property: PropTypes.string };
GaugeComponent.propTypes = { block: PropTypes.string };
GaugeComponent.propTypes = { minVal: PropTypes.string };
GaugeComponent.propTypes = { maxVal: PropTypes.string };
