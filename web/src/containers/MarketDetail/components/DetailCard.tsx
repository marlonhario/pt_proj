import React, { useContext, useEffect, useRef } from 'react'
import { Col, Row, Input } from 'reactstrap'
import TradingViewWidget from 'react-tradingview-widget'
import { DetailProfile } from './DetailProfile'
import { DetailFinancial } from './DetailFinancial'
import { ContextMarketDetail } from '../../../hooks/context/Context'

export const DetailCard: React.FC = () => {
    const { marketDetailState, marketDetailDispatch } = useContext(ContextMarketDetail);
    const onChange = (event) => {
        const { value } = event.currentTarget;

        marketDetailDispatch({
            type: 'marketdetail/SET_SYMBOLS',
            payload: value
        })
    }

    return (
        <Col>
            <Row>
                <Col md={12}>
                    <Input onChange={onChange} placeholder="Symbol" />
                    <TradingViewWidget
                        width={1220}
                        height={500}
                        symbol={marketDetailState.input_symbols}
                        allow_symbol_change={false}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <DetailProfile />
                </Col>
                <Col md={6}>
                    <DetailFinancial />
                </Col>
            </Row>
        </Col>
    )
}