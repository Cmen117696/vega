import {Transform, ingest} from 'vega-dataflow';
import {inherits}          from 'vega-util';

export default function AxisSize(params) {
    Transform.call(this, null, params);
}

var prototype = inherits(AxisSize, Transform);

prototype.transform = (_, pulse) => {

  var out = pulse.fork(pulse.NO_SOURCE | pulse.NO_FIELDS);

  return out;

};
