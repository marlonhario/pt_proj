import React, { useReducer, useEffect, useContext } from "react";
import { Col, Row } from "reactstrap";
import { data } from "./data";
import { Historical } from "./Historical";
import { Strategy } from "./Strategy";
import { Generator } from "./Generator";
import { FullOptimization } from "./FullOptimization";
import { WalkOptimization } from "./WalkOptimization";
import { Normalization } from "./Normalization";
import { MonteValidation } from "./MonteValidation";
import { MultilValidation } from "./MultiValidation";
import { GeneratorTable } from "./GeneratorTable";
import { WalkValidation } from "./WalkValidation";

import { ContextGenerate } from "../../../hooks/context/Context";

export const GenerateStrategies: React.FC = () => {
    const { generateState } = useContext(ContextGenerate)
    const { data1, data2 } = data()

    return (
        <Col style={{ marginTop: 20 }}>
            <Row>
                <Col sm={6} style={{ marginBottom: 20 }}>
                    <Historical />
                    <Strategy />
                    <Generator />
                    <FullOptimization />
                    <WalkOptimization />
                    <Normalization />
                    <WalkValidation />
                    <MonteValidation />
                    <MultilValidation />
                </Col>
                <Col sm={6} style={{ marginBottom: 20 }}>
                    <GeneratorTable
                        title={'Generator'}
                        table={data1}
                        display={true}
                    />
                    <GeneratorTable
                        title={'Full Data optimization'}
                        table={data2}
                        display={generateState.checkFullOptimization}
                    />
                    <GeneratorTable
                        title={'Walk Forward optimization'}
                        table={data2}
                        display={generateState.checkWalkOptimization}
                    />
                    <GeneratorTable
                        title={'Normalization'}
                        table={data2}
                        display={generateState.checkNormalization}
                    />
                    <GeneratorTable
                        title={'Walk Forward validation'}
                        table={data1}
                        display={generateState.checkWalkValidation}
                    />
                    <GeneratorTable
                        title={'Monte Carlo validation'}
                        table={data1}
                        display={generateState.checkMonteValidation}
                    />
                    <GeneratorTable
                        title={'Multi Market validation'}
                        table={data1}
                        display={generateState.checkMultiValidation}
                    />
                </Col>
            </Row>
        </Col>
    )
}