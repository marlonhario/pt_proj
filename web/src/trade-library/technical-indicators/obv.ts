/**
 * @param enterOrExit
 * @param options
 * @param stockData
 */
export const obv = (enterOrExit: string, options: any, stockData: any) => {
    const SMA = require('technicalindicators').SMA;
    const EMA = require('technicalindicators').EMA;
    const OBV = require('technicalindicators').OBV;

    // stockData['trades'].map((trade, index) => (stockClose[index] = stockData['trades'][index]['close']));
    let stockClose = stockData['trades'].map((trade, index) => stockData['trades'][index]['close'])
    let stockVolume = stockData['trades'].map((trade, index) => stockData['trades'][index]['volume'])
    let obv = OBV.calculate({
        close: stockClose,
        volume: stockVolume
    })
    stockData['trades'].map((trade, index) => {
        if (index === 0) {
            stockData['trades'][index]['signalValue'][enterOrExit]['obv'] = 0;
        } else {
            stockData['trades'][index]['signalValue'][enterOrExit]['obv'] =  obv[index];
        }
    });
    return stockData['trades'];
};
