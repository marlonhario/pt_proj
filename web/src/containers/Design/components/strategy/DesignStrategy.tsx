import React, { useContext } from "react";
import { Col, Card, CardBody } from "reactstrap";
import { ContextDesign } from "../../../../hooks/context/Context";
import { DesignDefaultTabs } from "./DesignDefaultTabs";
import { DesignStrategyCard } from "./DesignStrategyCard";
import { TableTitle, TableTitleText } from "../DesignTable";

interface Props {
    setOpenIndicator: any;
}

export const DesignStrategy: React.FC<Props> = ({ setOpenIndicator }) => {
    const { designState } = useContext(ContextDesign);
    const { longEntryList, shortEntryList, longExitList, shortExitList, strategyProperties } = designState;

    return (
        <Col md={12}>
            <Card>
                <CardBody style={{ padding: 0 }}>
                    <TableTitle>
                        <TableTitleText>Strategy</TableTitleText>
                    </TableTitle>
                    {(() => {
                        if (Object.keys(strategyProperties).length !== 0) {
                            return <DesignStrategyCard />;
                        }
                    })()}
                    <DesignDefaultTabs longList={longEntryList} shortList={shortEntryList} setOpenIndicator={setOpenIndicator} />
                    <DesignDefaultTabs
                        exit={designState.exit}
                        longList={longExitList}
                        shortList={shortExitList}
                        setOpenIndicator={setOpenIndicator}
                    />
                </CardBody>
            </Card>
        </Col>
    );
};
