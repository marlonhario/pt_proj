import * as React from "react";
import {
  Chart,
  ChartCanvas,
  BarSeries,
  XAxis,
  YAxis,
  discontinuousTimeScaleProviderBuilder,
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

class BasicBarSeries extends React.Component<ChartProps> {
  private readonly margin = { left: 0, right: 90, top: 0, bottom: 24 };
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
          <BarSeries yAccessor={this.yAccessor} />
          <XAxis />
          <YAxis />
          {children}
        </Chart>
      </ChartCanvas>
    );
  }

  private readonly yAccessor = (data: IOHLCData) => {
    return data.volume;
  };

  private readonly yExtents = (data: IOHLCData) => {
    return data.volume;
  };
}

// export const Daily = withOHLCData()(
//   withSize({ style: { minHeight: 600 } })(withDeviceRatio()(BasicBarSeries))
// );

// export const Intraday = withOHLCData("MSFT_INTRA_DAY")(
//   withSize({ style: { minHeight: 600 } })(withDeviceRatio()(BasicBarSeries))
// );

export default withOHLCData()(
  withSize({ style: { minHeight: 400 } })(withDeviceRatio()(BasicBarSeries))
);
