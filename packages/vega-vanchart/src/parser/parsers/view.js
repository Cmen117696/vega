
import parseAutosize from 'vega-parser/src/parsers/autosize';
import parsePadding from 'vega-parser/src/parsers/padding';
import parseSignal from 'vega-parser/src/parsers/signal';
import {ref, operator} from 'vega-parser/src/util';
import {Bound, Collect, Encode, Render, Sieve, ViewLayout} from 'vega-parser/src/transforms';
import {encoders, extendEncode} from 'vega-parser/src/parsers/encode/encode-util';
import {GroupMark} from 'vega-parser/src/parsers/marks/marktypes';
import {FrameRole} from 'vega-parser/src/parsers/marks/roles';
import {array, toSet} from 'vega-util';
import DataScope from 'vega-parser/src/DataScope';

import parseSpec from './spec';

var defined = toSet(['width', 'height', 'padding', 'autosize']);

export default function parseView(spec, scope) {
    
    // console.log(spec, scope);

    var config = scope.config,
      op, input, encode, parent, root;

    scope.background = spec.background || config.background;
    scope.eventConfig = config.events;
    root = ref(scope.root = scope.add(operator()));
    scope.addSignal('width', spec.width || 0);
    scope.addSignal('height', spec.height || 0);
    scope.addSignal('padding', parsePadding(spec.padding, config));
    scope.addSignal('autosize', parseAutosize(spec.autosize, config));

    array(spec.signals).forEach(function(_) {
        if (!defined[_.name]) parseSignal(_, scope);
      });

    // Store root group item
    input = scope.add(Collect());

    // Encode root group item
    encode = extendEncode({
        enter: { x: {value: 0}, y: {value: 0} },
        update: { width: {signal: 'width'}, height: {signal: 'height'} }
    }, spec.encode);

    encode = scope.add(Encode(
        encoders(encode, GroupMark, FrameRole, spec.style, scope, {pulse: ref(input)}))
    );

    // Perform view layout
    parent = scope.add(ViewLayout({
        layout:       scope.objectProperty(spec.layout),
        legends:      scope.legends,
        autosize:     scope.signalRef('autosize'),
        mark:         root,
        pulse:        ref(encode)
    }));
    scope.operators.pop();

    // Parse remainder of specification
    scope.pushState(ref(encode), ref(parent), null);
    parseSpec(spec, scope, true);
    scope.operators.push(parent);

    op = scope.add(Bound({mark: root, pulse: ref(parent)}));
    op = scope.add(Render({pulse: ref(op)}));
    op = scope.add(Sieve({pulse: ref(op)}));

    scope.addData('root', new DataScope(scope, input, input, op));

    return scope;
}