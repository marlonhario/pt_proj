import * as React from "react";
import {
  Chart,
  ChartCanvas,
  XAxis,
  YAxis,
  discontinuousTimeScaleProviderBuilder,
  LineSeries,
} from "react-financial-charts";
import { IOHLCData, withOHLCData } from "../data";
import { withDeviceRatio, withSize } from "@react-financial-charts/utils";

interface ChartProps {
  readonly data: IOHLCData[];
  readonly height: number;
  readonly width: number;
  readonly ratio: number;
  readonly children?: React.ReactNode;
}

class BasicLineSeries extends React.Component<ChartProps> {
  private readonly margin = { left: 0, right: 40, top: 0, bottom: 24 };
  private readonly xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
    (d: IOHLCData) => d.date
  );

  public render() {
    const { data: initialData, height, ratio, width, children } = this.props;

    const { data, xScale, xAccessor, displayXAccessor } = this.xScaleProvider(
      initialData
    );

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
        <Chart id={1} yExtents={this.yExtents}>
          <LineSeries yAccessor={this.yAccessor} strokeWidth={3} />
          <XAxis />
          <YAxis />
          {children}
        </Chart>
      </ChartCanvas>
    );
  }

  private readonly yAccessor = (data: IOHLCData) => {
    return data.close;
  };

  private readonly yExtents = (data: IOHLCData) => {
    return [data.high, data.low];
  };
}
export default withOHLCData()(
  withSize({ style: { minHeight: 600 } })(withDeviceRatio()(BasicLineSeries))
);

// export const Daily = withOHLCData()(
//   withSize({ style: { minHeight: 600 } })(withDeviceRatio()(BasicLineSeries))
// );

// export const Intraday = withOHLCData("MSFT_INTRA_DAY")(
//   withSize({ style: { minHeight: 600 } })(withDeviceRatio()(BasicLineSeries))
// );
