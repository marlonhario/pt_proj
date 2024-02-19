import React, { useState, Suspense, useEffect, useReducer, useContext } from 'react';
import { Card, CardBody, Col, Button, ButtonGroup, ButtonToolbar } from 'reactstrap';
import { createResource } from '../../../services/timesheets/timsheetsAPI';
import { TimesheetsDetails } from './TimesheetsDetails';
import { useHistory, useLocation } from 'react-router-dom';
import { TimesheetsInfo } from './TimesheetsInfo';
import { setDateRange, extraURL } from '../utils/timesheetsUtils';
import { ContextTime } from '../../../hooks/context/Context';

interface Props { }

export const TimesheetsCard: React.FC<Props> = () => {
    const history = useHistory();
    const location = useLocation();
    const [first_week, setFirst] = useState<string | null | Date>(null);
    const [last_week, setLast] = useState<string | null | Date>(null);

    const { timeState, timeDispatch } = useContext(ContextTime);

    const path = location.pathname.split('/');

    const dates: string | null | Date = extraURL(first_week, path, timeState.count);

    const resource = createResource(dates);

    useEffect(() => {
        const setRange = setDateRange(first_week, last_week);

        if (timeState) {
            history.push(`/pages/timesheets/dates/${timeState.count}`);
        }

        if (setRange) {
            setFirst(setRange.startDate);
            setLast(setRange.endDate);
        }
    }, [timeState]);

    return (
        <Col md={12} lg={12}>
            <Card>
                <CardBody>
                    <div className="card__title">
                        <ButtonToolbar>
                            <ButtonToolbar>
                                <ButtonGroup className="btn-group--icons" dir="ltr">
                                    <Button
                                        outline
                                        onClick={(e) => {
                                            e.preventDefault();

                                            timeDispatch({
                                                type: 'decrement'
                                            });
                                        }}>
                                        <span className="lnr lnr-pointer-left" /> PREVIOUS
                                        </Button>
                                    <Suspense fallback={<h5 style={{ padding: 10 }}>Please wait while loading...</h5>}>
                                        <TimesheetsInfo resource={resource} />
                                    </Suspense>
                                    <Button
                                        outline
                                        onClick={(e) => {
                                            e.preventDefault();

                                            timeDispatch({
                                                type: 'increment'
                                            });
                                        }}>NEXT <span className="lnr lnr-pointer-right" />
                                    </Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </ButtonToolbar>
                    </div>
                    <Suspense fallback={<h5></h5>}>
                        <TimesheetsDetails resource={resource} />
                    </Suspense>
                </CardBody>
            </Card>
        </Col>
    )
}