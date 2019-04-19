import {epicsHoc} from './EpicsHoc.js';
import {GaugeWidget} from '../widgets/GaugeWidget.js';
import {TextUpdateWidget} from '../widgets/TextUpdateWidget';


export const Gauge = epicsHoc(GaugeWidget);
export const TextUpdate = epicsHoc(TextUpdateWidget);
