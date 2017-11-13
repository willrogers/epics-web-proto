import React from 'react';
import PropTypes from 'prop-types';

const canvasStyle ={border: '1px solid #000000',};

export default class GaugeComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.canvas = this.refs.gaugeRef;
        this.context = this.canvas.getContext('2d');
        this.defineDimensions();
        //super.componentDidMount();
    }

    componentWillUpdate() {
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.drawGauge();
    }

    drawGauge() {
        for(let i = 0 ; i < this.canvas.width ; i += this.pipSpace) {
            switch(i){
                case this.quarterMark:
                    this.drawMarker(i);
                    break;

                case this.halfMark:
                    this.drawMarker(i);
                    break;

                case this.threeQaurterMark:
                    this.drawMarker(i);
                    break;

                default:
                    this.drawPip(i);
            }
        }
        this.drawNeedle(this.props.EPICSValue)
    }

    drawPip(pipLoc) {
        this.context.beginPath();
        this.context.linewidth = this.pipWidth;
        this.context.strokeStyle = this.pipColour;
        this.context.moveTo(pipLoc, 100)
        this.context.lineTo(pipLoc, 130)
        this.context.stroke();
    }

    //Draw the marker at the supplied location, call annotate when done.
    drawMarker(markerLoc){
        this.context.beginPath();
        this.context.lineWidth='1';
        this.context.strokeStyle= this.markerColour;
        this.context.moveTo(markerLoc, 50);
        this.context.lineTo(markerLoc, 130);
        this.context.stroke();
        this.annotateMarker(markerLoc);
    }

    //Annotate the marker with the appropriate numeric value.
    annotateMarker(annoLoc){
        this.context.fillText(''+(annoLoc)+'', annoLoc, 140);
    }

    //Draw the needle using the supplied EPICSValue
    drawNeedle(epicsVal){
        this.context.beginPath();
        this.context.lineWidth='3';
        this.context.strokeStyle= this.needleColour;
        this.context.moveTo((epicsVal), 130);
        this.context.lineTo((epicsVal), 10);
        this.context.stroke();
    }

    defineDimensions() {
        //Style constants
        this.pipWidth = 0.5;
        this.markerWidth = 1;
        this.needleWidth= 3;
        this.pipColour = '#0f0f0f';
        this.markerColour = '#000000';
        this.needleColour = '#ff0000';

        //Define the quarterly values
        this.quarterMark = (this.canvas.width * 0.25);
        this.halfMark = (this.canvas.width * 0.5);
        this.threeQaurterMark = (this.canvas.width * 0.75);

        //10% buffer at bottom of page for annotations
        this.annotationBuffer = (this.canvas.height * 0.1);

        //Define start/height of each pip
        this.pipTopCoord = (this.canvas.height * 0.2);
        this.pipBaseCoord = (this.canvas.height - this.annotationBuffer);

        //Define start/height of each marker
        this.markerTopCoord = (this.canvas.height * 0.5);
        this.markerBaseCoord = (this.canvas.height - this.annotationBuffer);

        //Define start/height of the needle
        this.needleTopCoord = (this.canvas.height * 0.9);
        this.needleBaseCoord = (this.canvas.height - this.annotationBuffer);

        //Pip space is 0.5% of total canvas size
        this.pipSpace = (this.canvas.width * 0.005);
    }

    render() {
        return (
            <canvas
                ref="gaugeRef"
                width={this.props.width}
                height={this.props.height}
                style={canvasStyle}
            >
            </canvas>
        )
    }
}

GaugeComponent.propTypes = { EPICSValue: PropTypes.number };