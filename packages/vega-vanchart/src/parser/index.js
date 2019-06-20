export {default as parse} from './parse';
export {default as config} from 'vega-parser/src/config';

export {default as signal} from 'vega-parser/src/parsers/signal';
export {default as signalUpdates} from 'vega-parser/src/parsers/signal-updates';
export {default as stream} from 'vega-parser/src/parsers/stream';

export {
  MarkRole,
  FrameRole,
  ScopeRole,
  AxisRole,
  AxisDomainRole,
  AxisGridRole,
  AxisLabelRole,
  AxisTickRole,
  AxisTitleRole,
  LegendRole,
  LegendEntryRole,
  LegendLabelRole,
  LegendSymbolRole,
  LegendTitleRole
} from 'vega-parser/src/parsers/marks/roles';

export {default as Scope} from 'vega-parser/src/Scope';
export {default as DataScope} from 'vega-parser/src/DataScope';
