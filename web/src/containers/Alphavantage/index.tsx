import React from 'react';
import {
  Card, Col
} from 'reactstrap';
import CandlestickChart from "../../shared/components/Charts/candlestick"

const Alphavantage = () => {
    const API_KEY = '76ULWV81X1BA0PRL';

    React.useEffect(() => {
        timeSeriesIntraday();
    });

    const timeSeriesIntraday = () => {
        const TSI =  `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=${API_KEY}`;
        fetch(TSI)
            .then( response  => response.json())
            .then( data => {
                console.log(data["Time Series (5min)"], 'data')
            })
    }
    
    return (
        <Col md={12} lg={12}>
          <Card>
            <div>
                <CandlestickChart/>
            </div>
          </Card>
        </Col>
      );
}

export default Alphavantage;
