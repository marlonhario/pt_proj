import React from "react"
import AreaChart from "../../shared/components/Charts/area"
import BarChart from "../../shared/components/Charts/bar"
import BaselineChart from "../../shared/components/Charts/baseline"
import CandlestickChart from "../../shared/components/Charts/candlestick"
import HeikinAshiChart from "../../shared/components/Charts/heikinAshi"
import KagiChart from "../../shared/components/Charts/kagi"
import LineChart from "../../shared/components/Charts/line"
import OHLCCHart from "../../shared/components/Charts/ohlc"
import PAFChart from "../../shared/components/Charts/pointAndFigure"
import RenkoChart from "../../shared/components/Charts/renko"
import ScatterChart from "../../shared/components/Charts/scatter"

import ATRChart from "../../shared/components/IndicatorCharts/atr"
import BollingerBandChart from "../../shared/components/IndicatorCharts/bollingerBand"
import ElderRayChart from "../../shared/components/IndicatorCharts/elderRay"
import EMAChart from "../../shared/components/IndicatorCharts/ema"
import ForceIndexChart from "../../shared/components/IndicatorCharts/forceIndex"
import MACDChart from "../../shared/components/IndicatorCharts/macd"
import RSIChart from "../../shared/components/IndicatorCharts/rsi"
import SARChart from "../../shared/components/IndicatorCharts/sar"

interface Props{}

const style ={
    container: {
        maxWidth: 400,
        maxHeight: 400
    }
}

const Chart: React.FC<Props> = () => {
    return (
        <div>
        <div style={style.container}>
            <AreaChart/>
        </div>
            <div style={style.container}>
                <ATRChart/>
            </div>
            <div style={style.container}>
                <BollingerBandChart/>
            </div>
            <div style={style.container}>
                <ElderRayChart/>
            </div>
            <div style={style.container}>
                <EMAChart/>
            </div>
            <div style={style.container}>
                <ForceIndexChart/>
            </div>
            <div style={style.container}>
                <MACDChart/>
            </div>
            <div style={style.container}>
                <RSIChart/>
            </div>
            <div style={style.container}>
                <SARChart/>
            </div>
            <div style={style.container}>
                <BarChart/>
            </div>
            <div style={style.container}>
                <BaselineChart/>
            </div>
            <div style={style.container}>
                <CandlestickChart/>
            </div>
            <div style={style.container}>
                <HeikinAshiChart/>
            </div>
            <div style={style.container}>
                <KagiChart/>
            </div>
            <div style={style.container}>
                <LineChart/>
            </div>
            <div style={style.container}>
                <OHLCCHart/>
            </div>
            <div style={style.container}>
                <PAFChart/>
            </div>
            <div style={style.container}>
                <RenkoChart/>
            </div>
            <div style={style.container}>
                <ScatterChart/>
            </div>
        </div>
    )
}

export default Chart