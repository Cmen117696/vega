import parseSignalUpdates from 'vega-parser/src/parsers/signal-updates';
import {initScale, parseScale} from 'vega-parser/src/parsers/scale';
import parseProjection from 'vega-parser/src/parsers/projection';
import parseLegend from 'vega-parser/src/parsers/legend';
import parseSignal from 'vega-parser/src/parsers/signal';
import parseTitle from 'vega-parser/src/parsers/title';
import parseData from 'vega-parser/src/parsers/data';
import parseMark from 'vega-parser/src/parsers/mark';
import parseAxis from 'vega-parser/src/parsers/axis';
import parseAxisSize from './axis-size';

import {array} from 'vega-util';

export default function parseSepc(spec, scope, preprocessed) {

    var signals = array(spec.signals),
      scales = array(spec.scales);

    if (!preprocessed) signals.forEach(function(_) {
        parseSignal(_, scope);
    });

    array(spec.projections).forEach(function(_) {
        parseProjection(_, scope);
    });

    scales.forEach(function(_) {
        // initScale(_, scope);
    });

    array(spec.data).forEach(function(_) {
        parseData(_, scope);
    });

    scales.forEach(function(_) {
        // parseScale(_, scope);
    });

    signals.forEach(function(_) {
        // parseSignalUpdates(_, scope);
    });

    array(spec.axes).forEach(function(_) {
        // parseAxis(_, scope);
        parseAxisSize(_, scope);
    });

    scope.parseLambdas();

    return scope;
}