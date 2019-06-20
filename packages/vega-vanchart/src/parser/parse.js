import parseView from './parsers/view';
import Scope from 'vega-parser/src/Scope';
import defaults from 'vega-parser/src/config';

export default function parse(spec, config) {
    return parseView(spec, new Scope(defaults([config, spec.config]))).toRuntime();
}
