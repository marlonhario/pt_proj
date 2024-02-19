import React, { useContext, useState } from "react";
import { Col, Row } from "reactstrap";
import { ContextDesign } from "../../../hooks/context/Context";
import { useIndicatorFormStore } from "../../Editors/components/store";
import { DesignBackTest } from "./backtest/DesignBackTest";
import { DesignIndicator } from "./strategy/DesignIndicator";
import { DesignMarketInfo } from "./marketinfo/DesignMarketInfo";
import { DesignStrategy } from "./strategy/DesignStrategy";
import { DesignStrategyForm } from "./strategy/DesignStrategyForm";
import { useIndicator } from "../../../services/graphQL/Design/useIndicator";

export const DesignBody: React.FC = () => {
    const { designState } = useContext(ContextDesign);
    const { isStrategyOpen } = designState;
    const isIndicatorOpen = useIndicatorFormStore(
        (state) => state.isIndicatorOpen
    );

    const [openIndicator, setOpenIndicator] = useState(false);
    const { handleAddIndicator } = useIndicator();
    let {
        shortEntryList,
        shortExitList,
        longEntryList,
        longExitList,
        strategyProperties,
        stockData,
        selectedIndicator: { label, value },
        indicatorName,
    } = designState;
    return (
        <>
            <Col md={4} sm={4} xs={12} style={{ padding: 0 }}>
                {openIndicator ? (
                    <DesignIndicator setOpenIndicator={setOpenIndicator} />
                ) : isStrategyOpen ? (
                    <DesignStrategyForm />
                ) : (
                    <DesignMarketInfo />
                )}
            </Col>
            <Col md={4} sm={4} xs={12} style={{ padding: 0 }}>
                <DesignStrategy setOpenIndicator={setOpenIndicator} />
            </Col>
            <Col md={4} sm={4} xs={12} style={{ padding: 0 }}>
                <DesignBackTest />
            </Col>
        </>
    );
};
