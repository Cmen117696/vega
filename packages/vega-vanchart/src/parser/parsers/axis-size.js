import {AxisSize} from 'vega-parser/src/transforms';


export default function parseAxisSize(spec, scope) {

    const {orient, scale} = spec;
    const config = axisConfig(spec, scope);

    const horizontal = horizontalAxis(orient);

    scope.addCompute(orient, AxisSize({
        size: scope.signalRef(horizontal ? "height" : "width")
    }));

}

const horizontalAxis = orient => orient === "bottom";

const axisConfig = (spec, scope) => {

    var config = scope.config,
      orient = spec.orient,
      xy = (orient === 'top' || orient === 'bottom') ? config.axisX : config.axisY,
      or = config['axis' + orient[0].toUpperCase() + orient.slice(1)];

  return (xy || or)
    ? Object.assign({}, config.axis, xy, or)
    : config.axis;

};