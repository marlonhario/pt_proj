import React, { useState, useEffect, createContext, useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  CardHeader,
} from "reactstrap";
import { useIndicatorFormStore } from "../store";
import { indicatorList } from "../../indicatorList";
import indicatorSettings from "../../indicatorSettings/indicatorSettings.json";
import nextId from "react-id-generator";
import { PropertySignal } from "./components/PropertySignal";
import { SelectInput } from "./components/SelectInput";
import { NumberInput } from "./components/NumberInput";

interface Props {
  children?: React.ReactNode;
  isLongEntryRules: boolean;
  addLongEntry: any;
  addLongExit: any;
  selectedIndicatorData: any;
  updateEntry: any;
  updateExit: any;
}

export const IndicatorProperties: React.FC<Props> = ({
  isLongEntryRules,
  addLongEntry,
  addLongExit,
  selectedIndicatorData,
  updateEntry,
  updateExit,
}) => {
  let closeIndicatorForm = useIndicatorFormStore(
    (state) => state.closeIndicatorForm
  );

  let initializeProperties = (data) => {
    let mapValue = {};

    let newData = data.map((item) => {
      let identificationLabel = `${item.accessor}-${identification}`;
      mapValue[identificationLabel] = item.DefaultValue;
      return { [identificationLabel]: item.DefaultValue };
    });

    return { ...mapValue };
  };

  let [selectedIndicator, setSelectedIndicator] = useState(
    "AwesomeOscillator.json"
  );
  // let { Properties = [], IndicatorName = "Indicator name" } = indicatorSettings[
  //   selectedIndicator
  // ];

  let [indicatorName, setIndicatorName] = useState("Indicator Name");

  let [properties, setProperties] = useState([]);
  let [identification, setIdentification] = useState(
    indicatorSettings[selectedIndicator]["identification"]
  );
  let [formProperty, setFormProperty] = useState({});
  let [signal, setSignal] = useState([]);
  let [selectedSignal, setSelectedSignal] = useState({});

  let onUpdateFormData = (data) => {
    setFormProperty((prevState) => ({
      ...prevState,
      ...data,
    }));
  };
  let onUpdateSignal = (data) => {
    setSelectedSignal((prevState) => ({
      ...data,
    }));
  };
  useEffect(() => {
    if (Object.keys(selectedIndicatorData).length > 0) {
      let { name } = selectedIndicatorData;

      setSelectedIndicator(name);
    }
  }, []);

  //Initializes the state for the Indicator Property Form
  useEffect(() => {
    import("../../indicatorSettings/indicatorSettings.json").then((module) => {
      //console.log("module json", module[selectedIndicator]);
      let indicatorSettings = module[selectedIndicator];
      let newData = initializeProperties(indicatorSettings["Properties"]);
      let newSignal = indicatorSettings["IndicatorProperties"];
      let newIdentification = indicatorSettings["identification"];
      if (Object.keys(selectedIndicatorData).length === 0) {
        setIndicatorName(indicatorSettings["IndicatorName"]);
        setSignal(newSignal);
        setSelectedSignal({
          value: newSignal[0]["value"],
          oppositeValue: newSignal[0]["oppositeValue"],
        });
        setFormProperty(newData);
        setIdentification(newIdentification);
      } else {
        let {
          signal: propSignal,
          id,
          identification,
          name,
          ...rest
        } = selectedIndicatorData;
        setSelectedIndicator(name);
        setIdentification(identification);
        setSignal(newSignal);
        if (
          newSignal.filter((item) => item.value === propSignal).length === 0
        ) {
          setSelectedSignal({
            value: newSignal[0]["value"],
            oppositeValue: newSignal[0]["oppositeValue"],
          });
        } else {
          setSelectedSignal({
            value: newSignal.filter((item) => item.value === propSignal)[0][
              "value"
            ],
            oppositeValue: newSignal.filter(
              (item) => item.value === propSignal
            )[0]["oppositeValue"],
          });
        }
        setFormProperty(rest);
      }
    });
  }, []);

  useEffect(() => {
    import("../../indicatorSettings/indicatorSettings.json").then((module) => {
      let indicatorSettings = module[selectedIndicator];
      let newData = initializeProperties(indicatorSettings["Properties"]);
      let newSignal = indicatorSettings["IndicatorProperties"];
      setProperties(indicatorSettings["Properties"]);
      setSignal(indicatorSettings["IndicatorProperties"]);
      setIdentification(indicatorSettings["identification"]);
    });
  }, [selectedIndicator, properties]);
  useEffect(() => {
    import("../../indicatorSettings/indicatorSettings.json").then((module) => {
      let indicatorSettings = module[selectedIndicator];
      let newData = initializeProperties(indicatorSettings["Properties"]);
      let newSignal = indicatorSettings["IndicatorProperties"];
      setSelectedSignal({
        value: newSignal[0]["value"],
        oppositeValue: newSignal[0]["oppositeValue"],
      });
    });
  }, []);
  useEffect(() => {
    //console.log("asdasdas", identification);
    let newMap = Object.keys(formProperty).reduce((obj, key) => {
      let equalObj = key.split("-")[1];
      if (identification === equalObj) {
        // retainObj = formProperty[key];
        return { ...obj, [key]: formProperty[key] };
      }

      return { ...obj };
    }, {});

    setFormProperty((prevState) =>
      Object.keys(formProperty).reduce((obj, key) => {
        let retainObj = {};
        let equalObj = key.split("-")[1];
        console.log("obj identification", identification, equalObj, obj);
        if (identification === equalObj) {
          // retainObj = formProperty[key];
          return { ...obj, [key]: formProperty[key] };
        }

        return { ...obj };
      }, {})
    );
  }, [selectedIndicator]);
  // if (Object.keys(formProperty).length === 0) {
  //   return <></>;
  // }
  return (
    <Card style={{ minHeight: 300, backgroundColor: "#337ab7" }}>
      <CardHeader>{isLongEntryRules ? "Long Entry" : "Long Exit"}</CardHeader>
      <CardBody>
        <FormGroup>
          <Label>Indicators</Label>
          <Input
            type="select"
            name="select-indicators-list"
            value={selectedIndicator}
            onChange={(e) => {
              setSelectedIndicator(e.target.value);
            }}
          >
            {indicatorList.map((item) => (
              <option value={item.path}>{item.name}</option>
            ))}
          </Input>
        </FormGroup>
        <hr />
        <h4 className="bold-text">{indicatorName}</h4>
        <FormGroup>
          {signal.length > 0 && (
            <PropertySignal
              signal={signal}
              onUpdateSignal={onUpdateSignal}
              selectedIndicatorData={selectedIndicatorData}
            />
          )}
        </FormGroup>
        {properties.map((item, index) => {
          let identificationLabel = `${item.accessor}-${identification}`;

          if (item.type === "number") {
            return (
              <NumberInput
                key={identificationLabel}
                data={item}
                defaultValue={item["DefaultValue"]}
                value={item["value"]}
                identification={identificationLabel}
                selectedIndicator={selectedIndicator}
                onUpdateForm={onUpdateFormData}
                selectedIndicatorData={selectedIndicatorData}
              />
            );
          }
          if (item.type === "select") {
            return (
              <SelectInput
                key={identificationLabel}
                data={item}
                identification={identificationLabel}
                selectedIndicator={selectedIndicator}
                onUpdateForm={onUpdateFormData}
                selectedIndicatorData={selectedIndicatorData}
              />
            );
          }
        })}
        <div>
          <Button color="danger" onClick={closeIndicatorForm}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              let isUpdate = Object.keys(selectedIndicatorData).length > 0;
              let name = selectedIndicator;
              let id = nextId();
              let newFormProperty = Object.keys(formProperty).reduce(
                (obj, key) => {
                  let retainObj = {};
                  let equalObj = key.split("-")[1];
                  console.log(
                    "obj identification",
                    identification,
                    equalObj,
                    obj
                  );
                  if (identification === equalObj) {
                    // retainObj = formProperty[key];
                    return { ...obj, [key]: formProperty[key] };
                  }

                  return { ...obj };
                },
                {}
              );
              let long = {
                id: isUpdate
                  ? `${selectedIndicatorData["id"].split("-")[0]}-long`
                  : `${id}-long`,
                ...newFormProperty,
                signal: selectedSignal["value"],
                name: name,
                identification: identification,
              };

              let short = {
                id: isUpdate
                  ? `${selectedIndicatorData["id"].split("-")[0]}-short`
                  : `${id}-short`,
                signal: selectedSignal["oppositeValue"],
                ...newFormProperty,
                name: name,
                identification: identification,
              };

              console.log("looooooooooooooooong val", long);
              if (isLongEntryRules && !isUpdate) {
                addLongEntry([long, short]);
              }

              if (!isLongEntryRules && !isUpdate) {
                addLongExit([long, short]);
              }

              if (isLongEntryRules && isUpdate) {
                updateEntry([long, short]);
              }

              if (!isLongEntryRules && isUpdate) {
                updateExit([long, short]);
              }
              closeIndicatorForm();
            }}
          >
            {Object.keys(selectedIndicatorData).length === 0
              ? "Accept"
              : "Update"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
