import React from "react";
import {
	Button,
	Col,
	Row,
	Card,
	CardBody,
	InputGroup,
	InputGroupAddon,
	Form,
	FormGroup,
	Label,
	Input,
} from "reactstrap";
import { AddFundsTabProps } from "../helpers";
import { schedules } from "../helpers";
const sampleChart = require("../../../shared/img/wallet/sample_graph.png");

const AddFundsTab = ({
	selectBank,
	handleSelectBank,
	bankOptions,
}: AddFundsTabProps) => {
	const selectFromOptions = !!bankOptions.length
		? bankOptions.map((option) => {
			return (
				<option value={option.account_id} key={option.account_id}>
					({option.institution}) {option.name}
				</option>
			);
		})
		: null;

	const scheduleOptions = schedules.map((schedule) => (
		<option key={schedule.id}>{schedule.category}</option>
	));

	return (
		<Col md={12} lg={12} xl={12}>
			<Card className="AddFunds__card form">
				<CardBody>
					<Row>
						<Col md={4} lg={4} xl={4}>
							<Form className="AddFunds__form">
								<FormGroup>
									<label htmlFor="from">From</label>
									<select
										id="from"
										value={selectBank}
										onChange={(e) => handleSelectBank(e)}
										className="form-control"
									>
										<option value="00">Select from</option>
										{selectFromOptions}
										<option value="11">
											Add a new bank account
										</option>
									</select>
								</FormGroup>
								<FormGroup>
									<Label for="to">To</Label>
									<Input type="select" name="select" id="to">
										<option>High Risk - Personal ($0)</option>
									</Input>
								</FormGroup>
								<FormGroup>
									<Label for="amount">Amount</Label>
									<InputGroup id="amount">
										<InputGroupAddon
											className="AddFunds__amount"
											addonType="prepend"
										>
											$
                    </InputGroupAddon>
										<Input
											placeholder="Amount"
											min={0}
											max={100}
											type="number"
											step="1"
										/>
									</InputGroup>
								</FormGroup>
								<FormGroup>
									<Label for="schedule">Schedule</Label>
									<Input type="select" name="select" id="schedule">
										{scheduleOptions}
									</Input>
								</FormGroup>
								<FormGroup>
									<Label for="strtDate">Start date</Label>
									<Input
										type="text"
										name="startDate"
										id="strtDate"
										placeholder="Au 17, 2020"
									/>
								</FormGroup>
								<Button
									className="AddFunds__submit deposit rounded"
									color="warning"
									size="sm"
								>
									Submit deposit
                </Button>
							</Form>
						</Col>
						<Col md={8} lg={8} xl={8}>
							<img src={sampleChart} alt="Chart" />
						</Col>
					</Row>
				</CardBody>
			</Card>
		</Col>
	);
};

export default AddFundsTab;
