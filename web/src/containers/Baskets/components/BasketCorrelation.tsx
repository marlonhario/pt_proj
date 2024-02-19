import React, { useState } from "react";
import { Button, Col, Table } from "reactstrap";

import CheckIcon from "mdi-react/CheckIcon";
import PlayCircleIcon from "mdi-react/PlayCircleIcon";

interface Props { }

export const BasketCorrelation: React.FC<Props> = () => {
    const [cvalue, setcValue] = useState<boolean>(false);

    const onChange = () => {
        setcValue(!cvalue);
    };

    return (
        <Col>
            <h4>Correlation analysis</h4>
            <div className="basket-panel panel-default" style={{ marginBottom: 30 }}>
                <div className="panel-body">
                    <form>
                        <div className="form-group" style={{ marginTop: 10 }}>
                            <label
                                className=""
                                htmlFor="correlation_filter"
                            >
                                <input
                                    className="checkbox-btn__checkbox"
                                    type="checkbox"
                                    id="correlation_filter"
                                    name="correlation_filter"
                                    onChange={onChange}
                                    checked={cvalue}
                                />
                                <span className="checkbox-btn__checkbox-custom">
                                    <CheckIcon />
                                </span>
                                <span className="checkbox-btn__label">
                                    Resolve correlation automatically.
                                        </span>
                            </label>
                        </div>
                        {
                            cvalue ? <div>
                                <div className="form-group">
                                    <Table striped>
                                        <tbody>
                                            <tr>
                                                <td>Correlated strategies</td>
                                                <td>0</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                                <Col>
                                    <Button
                                        color="secondary"
                                        size="lg"
                                        block
                                        outline
                                        style={{ height: 45 }}
                                    >
                                        <PlayCircleIcon /> Resolve correlations
                                    </Button>
                                </Col>
                            </div>
                                : ""
                        }
                    </form>
                </div>
            </div>
        </Col>
    )
}