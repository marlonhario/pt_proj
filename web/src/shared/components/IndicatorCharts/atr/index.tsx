import { format } from "d3-format";
import * as React from "react";
import {
  Chart,
  ChartCanvas,
  XAxis,
  YAxis,
  atr,
  discontinuousTimeScaleProviderBuilder,
  LineSeries,
  SingleValueTooltip,
} from "react-financial-charts";
import { withDeviceRatio, withSize } from "@react-financial-charts/utils";
import { IOHLCData, withOHLCData } from "../data";

interface ChartProps {
  readonly data: IOHLCData[];
  readonly height: number;
  readonly ratio: number;
  readonly width: number;
  readonly windowSize?: number;
}

class ATRIndicator extends React.Component<ChartProps> {
  private readonly margin = { left: 0, right: 40, top: 0, bottom: 24 };
  private readonly xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
    (d: IOHLCData) => d.date
  );

  public render() {
    const {
      data: initialData,
      height,
      ratio,
      width,
      windowSize = 10,
    } = this.props;

    const atrCalculation = atr()
      .options({ windowSize: windowSize })
      .merge((d: any, c: any) => {
        d[`atr${windowSize}`] = c;
      })
      .accessor((d: any) => d[`atr${windowSize}`]);

    const calculatedData = atrCalculation(initialData);

    const { data, xScale, xAccessor, displayXAccessor } = this.xScaleProvider(
      calculatedData
    );
    console.log("accessor", atrCalculation);
    console.log("accessor", calculatedData);
    const start = xAccessor(data[data.length - 1]);
    const end = xAccessor(data[Math.max(0, data.length - 100)]);
    const xExtents = [start, end];

    return (
      <ChartCanvas
        height={height}
        ratio={ratio}
        width={width}
        margin={this.margin}
        data={data}
        displayXAccessor={displayXAccessor}
        seriesName="Data"
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
      >
        <Chart id={1} yExtents={atrCalculation.accessor()}>
          <XAxis ticks={6} />
          <YAxis ticks={2} />

          <LineSeries
            yAccessor={atrCalculation.accessor()}
            strokeStyle={atrCalculation.stroke()}
          />

          <SingleValueTooltip
            yAccessor={atrCalculation.accessor()}
            yLabel={`ATR (${atrCalculation.options().windowSize})`}
            yDisplayFormat={format(".2f")}
            labelFill={atrCalculation.stroke()}
            origin={[8, 16]}
          />
        </Chart>
      </ChartCanvas>
    );
  }
}

export default withOHLCData()(
  withSize({ style: { minHeight: 600 } })(withDeviceRatio()(ATRIndicator))
);
