import React, { useState, useEffect, ReactElement } from 'react'
import {ADL} from "technicalindicators"

interface Props {
    
}

/*
    Create an ADX hook
    @param {number} stockData
*/
type AdlProps = {
    close: Array<number>,
    high: Array<number>,
    low: Array<number>,
    volume: Array<number>
}

export default function useADX(stockData: AdlProps) {
    const [data, setData] = useState<AdlProps>(stockData);


    return [ADL.calculate(data)]
}
  