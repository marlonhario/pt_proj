import React, { useContext, useState } from "react";
import { Col, Navbar, NavbarToggler, Collapse, Button, Nav, NavItem, Label } from "reactstrap";

import PlayIcon from "mdi-react/PlayIcon";
import RefreshIcon from "mdi-react/RefreshIcon";
import StopIcon from "mdi-react/StopIcon";
import { ContextGenerate, ContextGenerateRun } from "../../../hooks/context/Context";

export const GenerateHeader = () => {
    const {
        generateState: { symbol },
        generateDispatch,
    } = useContext(ContextGenerate);
    const { generateRState, generateRunDispatch } = useContext(ContextGenerateRun);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const handleStart = () => {
        // setGo(true);
        if (symbol.value) {
            generateRunDispatch({
                type: "SET_RESET",
            });

            if (!generateRState.start) {
                generateRunDispatch({
                    type: "SET_START",
                    start: true,
                });
            }
        }
    };

    const handleReset = () => {
        localStorage.removeItem("generate_strategies");
        generateDispatch({
            type: "GENERATE_RESET",
        });
    };

    let btnDisabled = symbol.value ? false : true;

    return (
        <Col>
            <Navbar color="light" light expand="md">
                <h3>Generate</h3>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem className="">
                            <Button
                                className="icon"
                                color={generateRState.start ? "danger" : "primary"}
                                block
                                onClick={handleStart}
                                disabled={btnDisabled}
                            >
                                <p>
                                    {generateRState.start ? (
                                        <>
                                            <StopIcon /> Stop
                                        </>
                                    ) : (
                                        <>
                                            <PlayIcon /> Start
                                        </>
                                    )}
                                </p>
                            </Button>
                        </NavItem>
                        <NavItem className="nav-align-center">
                            <Label>Progress: {generateRState.progress}%</Label>
                        </NavItem>
                        <NavItem className="nav-align-center">
                            <Label>Calculated: {generateRState.calculated}</Label>
                        </NavItem>
                        <NavItem className="nav-align-center">
                            <Label>Ascended: {generateRState.ascended}</Label>
                        </NavItem>
                    </Nav>
                    <Nav className="justify-content-end" navbar>
                        <NavItem className="">
                            <Button className="icon nav-btn-generate-reset" color="white" block onClick={handleReset}>
                                <p>
                                    <RefreshIcon /> Reset
                                </p>
                            </Button>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </Col>
    );
};
