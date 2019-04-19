import {epicsHoc} from './epics-hoc';
import {GaugeWidget} from '../widgets/gauge-widget';
import {TextUpdateWidget} from '../widgets/text-update-widget';


export const Gauge = epicsHoc(GaugeWidget);
export const TextUpdate = epicsHoc(TextUpdateWidget);
