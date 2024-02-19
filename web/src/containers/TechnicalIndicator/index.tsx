import React, { useState } from "react";
import {
  Col,
  ButtonToolbar,
  Container,
  Row,
  Button,
  Card,
  CardBody,
  Input,
} from "reactstrap";
import Select from "react-select";
import DataTable from "react-data-table-component";
import { toastify } from "../../components/Toastify";

interface indexProps {}

export const TechnicalIndicator: React.FC<indexProps> = ({}) => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState<any>({
    symbolDefault: "",
    indicatorDefault: null,
    intervalDefault: null,
    priceTypeDefault: null,
    propertyDefault: "",
  });
  const indicators = [
    { value: "SMA", label: "SMA", api: "KCO67Z159XXXI4IM" },
    { value: "MACD", label: "MACD", api: "KCO67Z159XXXI4IM" },
    { value: "RSI", label: "RSI", api: "KCO67Z159XXXI4IM" },
    { value: "ADX", label: "ADX", api: "KCO67Z159XXXI4IM" },
  ];

  const intervals = [
    { value: "1min", label: "1min" },
    { value: "5min", label: "5min" },
    { value: "15min", label: "15min" },
    { value: "30min", label: "30min" },
    { value: "60min", label: "60min" },
    { value: "daily", label: "daily" },
    { value: "weekly", label: "weekly" },
    { value: "monthly", label: "monthly" },
  ];

  const priceTypes = [
    { value: "close", label: "close" },
    { value: "open", label: "open" },
    { value: "high", label: "high" },
    { value: "low", label: "low" },
  ];

  const handleChange = (value: any, label: string) => {
    const newValue = { ...selectedOption, [label]: value };
    setSelectedOption(newValue);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let checkIfEmpty = false;

    Object.keys(selectedOption).forEach((value) => {
      if (!selectedOption[value]) {
        toastify(400, `${value} is empty`);
        checkIfEmpty = true;
      }
    });

    if (!checkIfEmpty) {
      const validateEmail = new RegExp(/^\d+$/).test(
        selectedOption.propertyDefault
      );

      if (!validateEmail) {
        toastify(400, `Property must be a number`);
      } else {
        const url = `
		https://www.alphavantage.co/query?
		function=${selectedOption.indicatorDefault.value}&
		symbol=${selectedOption.symbolDefault}&
		interval=${selectedOption.intervalDefault.value}&
		time_period=${selectedOption.propertyDefault}&
		series_type=${selectedOption.priceTypeDefault.value}&
		apikey=${selectedOption.indicatorDefault.api}`;

        await fetch(url)
          .then((response) => response.json())
          .then((data) => {
            toastify(200, `Succefully submitted!`);

            const returnData =
              data[
                `Technical Analysis: ${selectedOption.indicatorDefault.value}`
              ];

            const lage = Object.entries(returnData).map((entry) => {
              if (typeof entry[1] === "object") {
                return { Date: entry[0], ...entry[1] };
              }
              return [];
            });

            setData(lage);

            if (lage.length) {
              const subColumn = [];
              Object.keys(lage[0]).forEach((value) =>
                subColumn.push({
                  name: value,
                  selector: value,
                  sortable: false,
                })
              );

              setColumns(subColumn);
            }
          })
          .catch((err) => toastify(400, `Invalid Symbol`));
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col className="balanceChart" sm={12}>
          <Card>
            <CardBody>
              <div className="card__title">
                <h5 className="bold-text">Technical Indicator</h5>
              </div>
              <form>
                <Row>
                  <Col className="balanceChart" sm={12} md={2}>
                    <div className="form__form-group">
                      <span className="form__form-group-label">Symbol</span>
                      <div className="form__form-group-field">
                        <Input
                          name="qty"
                          component="input"
                          type="text"
                          value={selectedOption.symbolDefault}
                          onChange={(event) =>
                            handleChange(event.target.value, "symbolDefault")
                          }
                        />
                      </div>
                    </div>
                  </Col>
                  <Col className="balanceChart" sm={12} md={2}>
                    <div className="form__form-group">
                      <span className="form__form-group-label">Indicator</span>
                      <Select
                        value={selectedOption.indicatorDefault}
                        options={indicators}
                        onChange={(value) =>
                          handleChange(value, "indicatorDefault")
                        }
                      />
                    </div>
                  </Col>
                  <Col className="balanceChart" sm={12} md={2}>
                    <div className="form__form-group">
                      <span className="form__form-group-label">Interval</span>
                      <Select
                        value={selectedOption.intervalDefault}
                        options={intervals}
                        onChange={(value) =>
                          handleChange(value, "intervalDefault")
                        }
                      />
                    </div>
                  </Col>
                  <Col className="balanceChart" sm={12} md={2}>
                    <div className="form__form-group">
                      <span className="form__form-group-label">Properties</span>
                      <div className="form__form-group-field">
                        <Input
                          name="qty"
                          component="input"
                          type="text"
                          value={selectedOption.propertyDefault}
                          onChange={(event) =>
                            handleChange(event.target.value, "propertyDefault")
                          }
                        />
                      </div>
                    </div>
                  </Col>
                  <Col className="balanceChart" sm={12} md={2}>
                    <div className="form__form-group">
                      <span className="form__form-group-label">Price Type</span>
                      <Select
                        value={selectedOption.priceTypeDefault}
                        options={priceTypes}
                        onChange={(value) =>
                          handleChange(value, "priceTypeDefault")
                        }
                      />
                    </div>
                  </Col>
                  <Col className="balanceChart" sm={12} md={2}>
                    <ButtonToolbar className="form__button-toolbar">
                      <span
                        style={{ visibility: "hidden" }}
                        className="form__form-group-label"
                      >
                        space
                      </span>
                      {/* <br /> */}
                      <Button
                        className="AddFunds__submit deposit rounded"
                        color="primary"
                        size="sm"
                        block
                        onClick={(event) => handleSubmit(event)}
                      >
                        Submit
                      </Button>
                    </ButtonToolbar>
                  </Col>
                </Row>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="balanceChart" sm={12}>
          <Card className="Trades__table">
            <CardBody>
              <DataTable
                data={data}
                columns={columns}
                pagination={true}
                paginationTotalRows={data.length}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
