import {transforms} from 'vega-dataflow';
import {functionContext} from 'vega-functions';
import {parse, context} from '../runtime';

export default function runtime(view, spec, functions) {
    var fn = functions || functionContext;

    return parse(spec, context(view, transforms, fn));
}
