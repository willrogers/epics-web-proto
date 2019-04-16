import {epicsHoc} from './EpicsHoc.js';
import {GaugeWidget} from '../widgets/GaugeWidget.js';
import {TextInputWidget} from '../widgets/TextInputWidget';
import {TextUpdateWidget} from '../widgets/TextUpdateWidget';


export const Gauge = epicsHoc(GaugeWidget);
export const TextInput = epicsHoc(TextInputWidget);
export const TextUpdate = epicsHoc(TextUpdateWidget);
