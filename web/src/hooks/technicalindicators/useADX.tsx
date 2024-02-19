import React, { useState, useEffect, ReactElement } from 'react'
import {ADX} from "technicalindicators"

interface Props {
    
}

/*
    Create an ADX hook
    @param {number} stockData
*/
type AdxProps = {
    close: Array<number>,
    high: Array<number>,
    low: Array<number>,
    period: number
}

export default function useADX(stockData: AdxProps, success:Boolean) {
    const [data, setData] = useState<AdxProps>(stockData);


    return [ADX.calculate(data)]
}
  