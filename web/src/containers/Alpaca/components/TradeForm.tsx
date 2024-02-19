import React from 'react';
import {
	Card,
	CardBody,
	Col,
	Row,
	Button,
	Input,
	ButtonToolbar
} from 'reactstrap';


export const TradeForm: React.FC<any> = ({
	formData, handleFields, handleCreateTrade
}) => {
	return (
		<Row>
			<Col sm={12} md={12} lg={12}>
				<Card>
					<CardBody>
						<div className="card__title">
							<h5 className="bold-text">Create trade</h5>
						</div>
						<form className="form form--horizontal">
							<div className="form__form-group">
								<span className="form__form-group-label">Symbol</span>
								<div className="form__form-group-field">
									<Input
										name="symbol"
										component="input"
										type="text"
										value={formData.symbol}
										onChange={(event) => handleFields("symbol", event)}
									/>
								</div>
							</div>
							<div className="form__form-group">
								<span className="form__form-group-label">Qty</span>
								<div className="form__form-group-field">
									<Input
										name="qty"
										component="input"
										type="text"
										value={formData.qty}
										onChange={(event) => handleFields("qty", event)}
									/>
								</div>
							</div>
							<div className="form__form-group">
								<span className="form__form-group-label">Side</span>
								<div className="form__form-group-field">
									<Input
										name="side"
										component="input"
										type="text"
										value={formData.side}
										onChange={(event) => handleFields("side", event)}
									/>
								</div>
							</div>
							<div className="form__form-group">
								<span className="form__form-group-label">Type</span>
								<div className="form__form-group-field">
									<Input
										name="type"
										component="input"
										type="text"
										value={formData.type}
										onChange={(event) => handleFields("type", event)}
									/>
								</div>
							</div>
							<div className="form__form-group">
								<span className="form__form-group-label">Time In Force</span>
								<div className="form__form-group-field">
									<Input
										name="timeInForce"
										component="input"
										type="text"
										value={formData.timeInForce}
										onChange={(event) => handleFields("timeInForce", event)}
									/>
								</div>
							</div>
							<ButtonToolbar className="form__button-toolbar">
								<Button
									className="AddFunds__submit deposit rounded"
									color="primary"
									size="sm"
									onClick={(event) => handleCreateTrade(event)}
								>
									Create
									</Button>
							</ButtonToolbar>
						</form>
					</CardBody>
				</Card>
			</Col>
		</Row>
	);
}