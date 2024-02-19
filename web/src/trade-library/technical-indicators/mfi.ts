/**
 * @param enterOrExit
 * @param options
 * @param stockData
 */
export const mfi = (enterOrExit: string, options: any, stockData: any) => {
    // const SMA = require('technicalindicators').SMA;
    // const EMA = require('technicalindicators').EMA;
    const MFI = require('technicalindicators').MFI;

    // stockData['trades'].map((trade, index) => (stockClose[index] = stockData['trades'][index]['close']));
    let high = stockData['trades'].map((trade, index) => stockData['trades'][index]['high'])
    let low = stockData['trades'].map((trade, index) => stockData['trades'][index]['low'])
    let close = stockData['trades'].map((trade, index) => stockData['trades'][index]['close'])
    let volume = stockData['trades'].map((trade, index) => stockData['trades'][index]['volume'])
    
    let mfi = MFI.calculate({
        high,
        low,
        close,
        volume,
        period : options['period']
    })

    stockData['trades'].map((trade, index) => {
        if (index >= 14) {
            stockData['trades'][index]['signalValue'][enterOrExit]['mfi'] = mfi[index-14];
        }
        else {
            stockData['trades'][index]['signalValue'][enterOrExit]['mfi'] = 0;
        } 
    });
    return stockData['trades'];
};
