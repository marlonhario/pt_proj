import React, { useContext, useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    FormGroup,
    Label,
    Button,
} from "reactstrap";
import Select from "react-select";
import nextId from "react-id-generator";

import { staticData } from "../data";
import { ActionDesign } from "../actionDesign";
import { ContextDesign } from "../../../../hooks/context/Context";
import { useIndicatorFormStore } from "../../../Editors/components/store";
import indicatorSettings from "../../../Editors/indicatorSettings/indicatorSettings.json";
import { NumberInput } from "../../../Editors/components/IndicatorProperties/components/NumberInput";
import { SelectInput } from "../../../Editors/components/IndicatorProperties/components/SelectInput";
import { DesignPropertySignal } from "./DesignPropertySignal";
import { useIndicator } from "../../../../services/graphQL/Design/useIndicator";
import { v4 as uuidv4 } from "uuid";

interface Props {
    setOpenIndicator: any;
}

export const DesignIndicator: React.FC<Props> = ({ setOpenIndicator }) => {
    const { designState, designDispatch } = useContext(ContextDesign);
    const { indicatorList } = staticData();
    const {
        selectedIndicatorData,
        selectedIndicator,
        isLongEntryRules,
        indicatorName,
        signal,
        properties,
        identification,
        formProperty,
        selectedSignal,
        longEntryList,
        longExitList,
        shortEntryList,
        shortExitList,
        stockData,
        strategyProperties,
        selectedIndicator: { label, value },
    } = designState;
    const { handleUpdateSignal } = ActionDesign();
    const { handleAddIndicator } = useIndicator();
    const [formProper, setFormProper] = useState({});

    let initializeProperties = (data) => {
        let mapValue = {};

        let newData = data.map((item) => {
            let identificationLabel = `${item.accessor}-${identification}`;
            mapValue[identificationLabel] = item.DefaultValue;
            return { [identificationLabel]: item.DefaultValue };
        });

        return { ...mapValue };
    };

    useEffect(() => {
        designDispatch({
            type: "UPDATE_IDENTIFICATION",
            identification:
                indicatorSettings[selectedIndicator.value]["identification"],
        });
    }, [designState.identification]);

    useEffect(() => {
        import(
            "../../../Editors/indicatorSettings/indicatorSettings.json"
        ).then(async (module) => {
            let indicatorSettings = await module[selectedIndicator.value];
            let newData = initializeProperties(indicatorSettings["Properties"]);
            let newSignal = indicatorSettings["IndicatorProperties"];
            let newIdentification = indicatorSettings["identification"];

            if (Object.keys(selectedIndicatorData).length === 0) {
                designDispatch({
                    type: "UPDATE_INDICATORS_JSON",
                    indicatorName: indicatorSettings["IndicatorName"],
                    signal: newSignal,
                    selectedSignal: {
                        value: newSignal[0]["value"],
                        oppositeValue: newSignal[0]["oppositeValue"],
                    },
                    formProperty: newData,
                    identification: newIdentification,
                });
            } else {
                let {
                    signal: propSignal,
                    id,
                    identification,
                    name,
                    ...rest
                } = selectedIndicatorData;
                const selected_signal = {
                    value: newSignal.filter(
                        (item) => item.value === propSignal
                    )[0]["value"],
                    oppositeValue: newSignal.filter(
                        (item) => item.value === propSignal
                    )[0]["oppositeValue"],
                };

                designDispatch({
                    type: "UPDATE_INDICATORS_JSON_1",
                    selectedIndicator: name,
                    identification: identification,
                    signal: newSignal,
                    formProperty: rest,
                    selectedSignal: selected_signal,
                });
            }
        });
    }, []);

    useEffect(() => {
        import(
            "../../../Editors/indicatorSettings/indicatorSettings.json"
        ).then((module) => {
            let indicatorSettings = module[selectedIndicator.value];

            designDispatch({
                type: "UPDATE_INDICATORS_JSON_2",
                properties: indicatorSettings["Properties"],
                signal: indicatorSettings["IndicatorProperties"],
                identification: indicatorSettings["identification"],
            });
        });
    }, [selectedIndicator.value, properties]);

    //This useeffect is use for checking the form if the selectedIndicator changes
    //It will look for the -PREFIX and compare it to the selected form's -PREFIX
    useEffect(() => {
        let newMap = Object.keys(formProperty).reduce((obj, key) => {
            let equalObj = key.split("-")[1];
            if (identification === equalObj) {
                return { ...obj, [key]: formProperty[key] };
            }

            return { ...obj };
        }, {});

        designDispatch({
            type: "UPDATE_FORM_PROPERTY",
            formProperty: Object.keys(formProperty).reduce((obj, key) => {
                let retainObj = {};
                let equalObj = key.split("-")[1];
                if (identification === equalObj) {
                    return { ...obj, [key]: formProperty[key] };
                }

                return { ...obj };
            }, {}),
        });
    }, [selectedIndicator.value]);

    const generateId = (ruleType) => {
        if (ruleType === "entry") {
            if (longEntryList.length === 0) {
                return `idEntry${1}`;
            }
            let ids = longEntryList.map((item) => item.id);
            ids = ids.map((item) => item.split("-")[0]);
            ids = ids.map((item) => item.replace("idEntry", ""));
            ids = ids.map((item) => Number(item));
            let maxValue = Math.max(...ids);
            return `idEntry${maxValue + 1}`;
        } else {
            if (longExitList.length === 0) {
                return `idExit${1}`;
            }
            let ids = longExitList.map((item) => item.id);
            ids = ids.map((item) => item.split("-")[0]);
            ids = ids.map((item) => item.replace("idExit", ""));
            ids = ids.map((item) => Number(item));
            let maxValue = Math.max(...ids);
            return `idExit${maxValue + 1}`;
        }
    };

    const handleSubmit = () => {
        let isUpdate = Object.keys(selectedIndicatorData).length > 0;
        let name = selectedIndicator;
        let id =
            "id" +
            longEntryList.length +
            shortEntryList.length +
            longExitList.length +
            shortExitList.length;
        let newFormProperty = Object.keys(formProperty).reduce((obj, key) => {
            let equalObj = key.split("-")[1];
            if (identification === equalObj) {
                return { ...obj, [key]: formProperty[key] };
            }
            return { ...obj };
        }, {});

        let long = {
            id: isUpdate
                ? `${selectedIndicatorData["id"].split("-")[0]}-long`
                : `${generateId("entry")}-long`,
            ...newFormProperty,
            signal: selectedSignal["value"],
            name: name,
            identification: identification,
        };

        let short = {
            id: isUpdate
                ? `${selectedIndicatorData["id"].split("-")[0]}-short`
                : `${generateId("entry")}-short`,
            signal: selectedSignal["oppositeValue"],
            ...newFormProperty,
            name: name,
            identification: identification,
        };
        if (isLongEntryRules && !isUpdate) {
            if (longEntryList.length < 5) {
                const dataLongEntry = [...longEntryList, long];

                designDispatch({
                    type: "SET_LONG_ENTRY",
                    long: dataLongEntry,
                });
            }

            if (shortEntryList.length < 5) {
                const dataShortEntry = [...shortEntryList, short];

                designDispatch({
                    type: "SET_SHORT_ENTRY",
                    short: dataShortEntry,
                });
            }
        }

        if (!isLongEntryRules && !isUpdate) {
            if (longExitList.length < 5) {
                const dataLongExit = [
                    ...longExitList,
                    { ...long, id: `${generateId("exit")}-long` },
                ];

                designDispatch({
                    type: "SET_LONG_EXIT",
                    long: dataLongExit,
                });
            }
            if (shortExitList.length < 5) {
                const dataShortExit = [
                    ...shortExitList,
                    { ...short, id: `${generateId("exit")}-short` },
                ];

                designDispatch({
                    type: "SET_SHORT_EXIT",
                    short: dataShortExit,
                });
            }
        }

        if (isLongEntryRules && isUpdate) {
            const dataLongEntry = longEntryList.map((item) => {
                if (item.id === long.id) {
                    return {
                        ...long,
                    };
                }
                return item;
            });
            const dataShortEntry = shortEntryList.map((item) => {
                if (item.id === short.id) {
                    return {
                        ...short,
                    };
                }
                return item;
            });
            designDispatch({
                type: "UPDATE_ENTRY_INDICATOR",
                long: dataLongEntry,
                short: dataShortEntry,
            });
            // addIndicator(dataLongEntry, longExitList, dataShortEntry, shortExitList);
        }

        if (!isLongEntryRules && isUpdate) {
            const dataLongExit = longExitList.map((item) => {
                if (item.id === long.id) {
                    return {
                        ...long,
                    };
                }
                return item;
            });

            const dataShortExit = shortExitList.map((item) => {
                if (item.id === short.id) {
                    return {
                        ...short,
                    };
                }
                return item;
            });
            designDispatch({
                type: "UPDATE_EXIT_INDICATOR",
                long: dataLongExit,
                short: dataShortExit,
            });
            // addIndicator(longEntryList, dataLongExit, shortEntryList, dataShortExit);
        }
        if (Object.keys(formProper).length > 0) {
            designDispatch({
                type: "UPDATE_FORM_PROPERTY",
                formProperty: formProper,
            });
        }

        designDispatch({
            type: "RESET_SELECTION",
            selectedIndicatorData: {},
            signal: {},
            selectedSignal: {},
        });
        setOpenIndicator(false);
    };

    const handleUpdateFormData = (data: any) => {
        designDispatch({
            type: "UPDATE_FORM_PROPERTY",
            formProperty: data,
        });
    };

    return (
        <Col md={12}>
            <Card style={{ minHeight: 300, backgroundColor: "#337ab7" }}>
                <CardHeader>
                    <p
                        style={{
                            fontWeight: "bold",
                            fontFamily: "sans-serif",
                            fontSize: 14,
                            color: "white",
                        }}
                    >
                        {isLongEntryRules ? "LONG ENTRY" : "LONG EXIT"}
                    </p>
                </CardHeader>
                <CardBody>
                    <FormGroup>
                        <Label>Indicators</Label>
                        <Select
                            options={indicatorList}
                            onChange={(option) => {
                                designDispatch({
                                    type: "SET_SELECTED_INDICATOR",
                                    selectedIndicator: option,
                                });
                            }}
                            defaultValue={selectedIndicator}
                            value={selectedIndicator}
                        />
                    </FormGroup>
                    <hr />
                    <h4 className="bold-text">{label}</h4>
                    <FormGroup>
                        {signal?.length > 0 && (
                            <DesignPropertySignal
                                signal={signal}
                                onUpdateSignal={handleUpdateSignal}
                                selectedIndicatorData={selectedIndicatorData}
                            />
                        )}
                    </FormGroup>
                    {properties.map((item, index) => {
                        const identificationLabel = `${item.accessor}-${identification}`;
                        if (item.type === "number") {
                            return (
                                <NumberInput
                                    key={identificationLabel}
                                    data={item}
                                    defaultValue={item["DefaultValue"]}
                                    value={item["value"]}
                                    identification={identificationLabel}
                                    selectedIndicator={selectedIndicator.label}
                                    onUpdateForm={handleUpdateFormData}
                                    selectedIndicatorData={
                                        selectedIndicatorData
                                    }
                                />
                            );
                        }
                        if (item.type === "select") {
                            return (
                                <SelectInput
                                    key={index}
                                    data={item}
                                    identification={identificationLabel}
                                    selectedIndicator={selectedIndicator}
                                    onUpdateForm={handleUpdateFormData}
                                    selectedIndicatorData={
                                        selectedIndicatorData
                                    }
                                />
                            );
                        }
                    })}
                    <div>
                        <Button
                            color="danger"
                            onClick={() => {
                                setOpenIndicator(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button color="primary" onClick={handleSubmit}>
                            {Object.keys(selectedIndicatorData).length === 0
                                ? "Accept"
                                : "Update"}
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};
