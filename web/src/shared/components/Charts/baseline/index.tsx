import * as React from "react";
import {
  Chart,
  ChartCanvas,
  XAxis,
  YAxis,
  discontinuousTimeScaleProviderBuilder,
  AlternatingFillAreaSeries,
  CandlestickSeries,
  OHLCTooltip,
  atr,
  macd,
  ema,
  kagi,
  sma,
  tma,
  wma,
  MouseCoordinateX,
  MouseCoordinateY,
  LineSeries,
  MACDSeries,
  MACDTooltip,
  SingleValueTooltip,
  BarSeries,
  CurrentCoordinate,
  EdgeIndicator,
  MovingAverageTooltip,
  AreaSeries,
  CrossHairCursor,
  KagiSeries,
} from "react-financial-charts";
import { IOHLCData, withOHLCData } from "../data";
import { withDeviceRatio, withSize } from "@react-financial-charts/utils";
import { format } from "d3-format";
import { timeParse, timeFormat } from "d3-time-format";

interface ChartProps {
  readonly data: IOHLCData[];
  readonly height: number;
  readonly width: number;
  readonly ratio: number;
  readonly children?: React.ReactNode;
  readonly stockData?: IOHLCData[];
  backtestData?: any;
  strategies?: any[];
  isKagi?: Boolean;
}

const parseDate = timeParse("%Y-%m-%d");

function parseData(parse) {
  return function (d) {
    d.date = parse(d.date);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;

    return d;
  };
}
const macdAppearance = {
  strokeStyle: {
    macd: "#FF0000",
    signal: "#00F300",
    zero: "#fff",
  },
  fillStyle: {
    divergence: "#4682B4",
  },
};

const mouseEdgeAppearance = {
  textFill: "#542605",
  stroke: "#05233B",
  strokeOpacity: 1,
  strokeWidth: 3,
  arrowWidth: 5,
  fill: "#BCDEFA",
};

class BasicBaselineSeries extends React.Component<ChartProps> {
  private readonly margin = { left: 0, right: 40, top: 0, bottom: 24 };
  private readonly xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
    (d: IOHLCData) => d.date
  );

  public render() {
    let {
      data: initialData,
      height,
      ratio,
      width,
      children,
      stockData,
      backtestData = undefined,
      strategies,
      isKagi = false,
    } = this.props;
    console.log("strategiesstrategies", initialData);

    if (initialData.length === 1) {
      if (initialData[0]["columns"][0] === "404: Not Found") {
        initialData = [];
      }
    }
    const atr14 = atr()
      .options({ windowSize: 14 })
      .merge((d, c) => {
        d.atr14 = c;
      })
      .accessor((d) => d.atr14);

    const macdCalculator = macd()
      .options({
        fast: 12,
        slow: 26,
        signal: 9,
      })
      .merge((d, c) => {
        d.macd = c;
      })
      .accessor((d) => d.macd);

    const ema26 = ema()
      .id(0)
      .options({ windowSize: 26 })
      .merge((d, c) => {
        d.ema26 = c;
      })
      .accessor((d) => d.ema26);

    const ema12 = ema()
      .id(1)
      .options({ windowSize: 12 })
      .merge((d, c) => {
        d.ema12 = c;
      })
      .accessor((d) => d.ema12);

    const smaVolume50 = sma()
      .id(3)
      .options({
        windowSize: 50,
        sourcePath: "volume",
      })
      .merge((d, c) => {
        d.smaVolume50 = c;
      })
      .accessor((d) => d.smaVolume50);
    const ema20 = ema()
      .options({
        windowSize: 20, // optional will default to 10
        sourcePath: "close", // optional will default to close as the source
      })
      // .skipUndefined(true) // defaults to true
      .merge((d, c) => {
        d.ema20 = c;
      }) // Required, if not provided, log a error
      .accessor((d) => d.ema20) // Required, if not provided, log an error during calculation
      .stroke("blue"); // Optional

    const sma20 = sma()
      .options({ windowSize: 20 })
      .merge((d, c) => {
        d.sma20 = c;
      })
      .accessor((d) => d.sma20);

    const wma20 = wma()
      .options({ windowSize: 20 })
      .merge((d, c) => {
        d.wma20 = c;
      })
      .accessor((d) => d.wma20);

    const tma20 = tma()
      .options({ windowSize: 20 })
      .merge((d, c) => {
        d.tma20 = c;
      })
      .accessor((d) => d.tma20);

    const ema50 = ema()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.ema50 = c;
      })
      .accessor((d) => d.ema50);

    const kagiCalc = kagi();
    if (strategies) {
      let chartList = strategies.map((item) => {
        console.log("atr14", atr14);
        return item;
      });
    }

    if (backtestData?.length !== 0) {
      if (backtestData?.graph) {
        initialData = backtestData["graph"].map((row) => {
          return {
            ...row,
            date: new Date(row.date),
          };
        });
      }
    }

    let calculatedData = initialData;

    if (isKagi && backtestData?.length === 0) {
      calculatedData = kagiCalc(initialData);
    }
    if (backtestData?.length !== 0) {
      calculatedData = atr14(
        kagiCalc(smaVolume50(macdCalculator(ema12(ema26(initialData)))))
      );
    }

    console.log("calculated data", calculatedData);
    console.log("initialData", initialData.length, initialData["columns"]);

    if (initialData["columns"]) {
      // if (initialData[0]["columns"][0] === "404: Not Found") {
      initialData = [];

      return <div></div>;
      // }
    }
    const { data, xScale, xAccessor, displayXAccessor } = this.xScaleProvider(
      calculatedData
    );

    const start = xAccessor(data[data.length - 1]);
    const end = xAccessor(data[Math.max(0, data.length - 100)]);
    const xExtents = [start, end];
    const base = 56;
    return (
      <ChartCanvas
        height={height}
        ratio={ratio}
        width={width}
        margin={this.margin}
        data={data}
        displayXAccessor={displayXAccessor}
        seriesName="MSFT"
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
      >
        <Chart id={1} yExtents={this.yExtents}>
          {/* {!isKagi && (
            <AlternatingFillAreaSeries
              yAccessor={this.yAccessor}
              baseAt={base}
            />
          )} */}
          <XAxis />
          <YAxis />
          {isKagi ? <KagiSeries /> : <CandlestickSeries />}
          <OHLCTooltip origin={[0, 30]} />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
          />
          {strategies &&
            strategies.map((strategy, index) => {
              if (strategy.identification === "ATR") {
                return (
                  <>
                    <LineSeries yAccessor={atr14.accessor()} />
                    {/* <SingleValueTooltip
                      yAccessor={atr14.accessor()}
                      yLabel={`ATR (${atr14.options().windowSize})`}
                      yDisplayFormat={format(".2f")}
                      origin={[0, 15 * (index + 1)]}
                    /> */}
                  </>
                );
              } else if (strategy.identification === "MACD") {
                return (
                  <>
                    <CandlestickSeries />
                    <LineSeries yAccessor={sma20.accessor()} />
                    <LineSeries yAccessor={wma20.accessor()} />
                    <LineSeries yAccessor={tma20.accessor()} />
                    <LineSeries yAccessor={ema20.accessor()} />
                    <LineSeries yAccessor={ema50.accessor()} />
                    <CurrentCoordinate yAccessor={sma20.accessor()} />
                    <CurrentCoordinate yAccessor={wma20.accessor()} />
                    <CurrentCoordinate yAccessor={tma20.accessor()} />
                    <CurrentCoordinate yAccessor={ema20.accessor()} />
                    <CurrentCoordinate yAccessor={ema50.accessor()} />
                  </>
                );
              } else {
                return <></>;
              }
            })}
          <LineSeries yAccessor={atr14.accessor()} />
          <SingleValueTooltip
            yAccessor={atr14.accessor()}
            yLabel={`ATR (${atr14.options().windowSize})`}
            yDisplayFormat={format(".2f")}
            /* valueStroke={atr14.stroke()} - optional prop */
            /* labelStroke="#4682B4" - optional prop */
            origin={[0, 15]}
          />
        </Chart>
        {/* <Chart id={5} yExtents={this.yExtents}>
          <AlternatingFillAreaSeries yAccessor={this.yAccessor} baseAt={base} />
          <XAxis />
          <YAxis />
          <KagiSeries />
          {children}
          <OHLCTooltip origin={[-40, 0]} />
        </Chart> */}
        {/** */}
        {strategies &&
          strategies.map((item, index) => {
            if (item.identification === "ATR") {
              return (
                <Chart
                  id={index}
                  yExtents={atr14.accessor()}
                  height={125}
                  origin={(w, h) => [0, h - 125]}
                  padding={{ top: 10, bottom: 10 }}
                >
                  <XAxis axisAt="bottom" orient="bottom" />
                  <YAxis axisAt="right" orient="right" ticks={2} />

                  <MouseCoordinateX
                    at="bottom"
                    orient="bottom"
                    displayFormat={timeFormat("%Y-%m-%d")}
                  />
                  <MouseCoordinateY
                    at="right"
                    orient="right"
                    displayFormat={format(".2f")}
                  />

                  <LineSeries yAccessor={atr14.accessor()} />
                  <SingleValueTooltip
                    yAccessor={atr14.accessor()}
                    yLabel={`ATR (${atr14.options().windowSize})`}
                    yDisplayFormat={format(".2f")}
                    /* valueStroke={atr14.stroke()} - optional prop */
                    /* labelStroke="#4682B4" - optional prop */
                    origin={[-40, 15]}
                  />
                </Chart>
              );
            }
            if (item.identification === "MACD") {
              return (
                <>
                  <Chart
                    id={index}
                    height={400}
                    yExtents={[
                      (d) => [d.high, d.low],
                      ema26.accessor(),
                      ema12.accessor(),
                    ]}
                    padding={{ top: 10, bottom: 20 }}
                  >
                    <XAxis
                      axisAt="bottom"
                      orient="bottom"
                      showTicks={false}
                      outerTickSize={0}
                    />
                    <YAxis axisAt="right" orient="right" ticks={5} />

                    <MouseCoordinateY
                      at="right"
                      orient="right"
                      displayFormat={format(".2f")}
                      {...mouseEdgeAppearance}
                    />

                    <CandlestickSeries />
                    <LineSeries
                      yAccessor={ema26.accessor()}
                      // stroke={ema26.stroke()}
                    />
                    <LineSeries
                      yAccessor={ema12.accessor()}
                      // stroke={ema12.stroke()}
                    />

                    <CurrentCoordinate
                      yAccessor={ema26.accessor()}
                      // fill={ema26.stroke()}
                    />
                    <CurrentCoordinate
                      yAccessor={ema12.accessor()}
                      // fill={ema12.stroke()}
                    />

                    <EdgeIndicator
                      itemType="last"
                      orient="right"
                      edgeAt="right"
                      yAccessor={(d) => d.close}
                      fill={(d) => (d.close > d.open ? "#A2F5BF" : "#F9ACAA")}
                      stroke={(d) => (d.close > d.open ? "#0B4228" : "#6A1B19")}
                      textFill={(d) =>
                        d.close > d.open ? "#0B4228" : "#420806"
                      }
                      strokeOpacity={1}
                      strokeWidth={3}
                      arrowWidth={2}
                    />

                    <OHLCTooltip origin={[-40, 0]} />
                    <MovingAverageTooltip
                      onClick={(e) => console.log(e)}
                      origin={[-38, 15]}
                      options={[
                        {
                          yAccessor: ema26.accessor(),
                          type: "EMA",
                          stroke: ema26.stroke(),
                          windowSize: ema26.options().windowSize,
                        },
                        {
                          yAccessor: ema12.accessor(),
                          type: "EMA",
                          stroke: ema12.stroke(),
                          windowSize: ema12.options().windowSize,
                        },
                      ]}
                    />
                  </Chart>
                  <Chart
                    id={2}
                    height={150}
                    yExtents={[(d) => d.volume, smaVolume50.accessor()]}
                    origin={(w, h) => [0, h - 300]}
                  >
                    <YAxis
                      axisAt="left"
                      orient="left"
                      ticks={5}
                      tickFormat={format(".2s")}
                    />

                    <MouseCoordinateY
                      at="left"
                      orient="left"
                      displayFormat={format(".4s")}
                      {...mouseEdgeAppearance}
                    />

                    <BarSeries
                      yAccessor={(d) => d.volume}
                      // fill={(d) => (d.close > d.open ? "#6BA583" : "#FF0000")}
                    />
                    <AreaSeries
                      yAccessor={smaVolume50.accessor()}
                      // stroke={smaVolume50.stroke()}
                      // fill={smaVolume50.fill()}
                    />
                  </Chart>
                  <Chart
                    id={3}
                    height={150}
                    yExtents={macdCalculator.accessor()}
                    origin={(w, h) => [0, h - 150]}
                    padding={{ top: 10, bottom: 10 }}
                  >
                    <XAxis axisAt="bottom" orient="bottom" />
                    <YAxis axisAt="right" orient="right" ticks={2} />

                    <MouseCoordinateX
                      at="bottom"
                      orient="bottom"
                      displayFormat={timeFormat("%Y-%m-%d")}
                      rectRadius={5}
                      {...mouseEdgeAppearance}
                    />
                    <MouseCoordinateY
                      at="right"
                      orient="right"
                      displayFormat={format(".2f")}
                      {...mouseEdgeAppearance}
                    />

                    <MACDSeries yAccessor={(d) => d.macd} {...macdAppearance} />
                    <MACDTooltip
                      origin={[-38, 15]}
                      yAccessor={(d) => d.macd}
                      options={macdCalculator.options()}
                      appearance={macdAppearance}
                    />
                  </Chart>
                  <CrossHairCursor />
                </>
              );
            }
          })}
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

// export const Daily = withOHLCData()(
//   withSize({ style: { minHeight: 600 } })(
//     withDeviceRatio()(BasicBaselineSeries)
//   )
// );

// export const Intraday = withOHLCData("MSFT_INTRA_DAY")(
//   withSize({ style: { minHeight: 600 } })(
//     withDeviceRatio()(BasicBaselineSeries)
//   )
// );

export default withOHLCData()(
  withSize({ style: { minHeight: 600 } })(
    withDeviceRatio()(BasicBaselineSeries)
  )
);
