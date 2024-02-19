import React from 'react';
import {
	Card,
	CardBody,
	Col,
	Row,
	Alert
} from 'reactstrap';
import { Loader } from "../../../components/Loader";
import CommentAlertOutlineIcon from 'mdi-react/CommentAlertOutlineIcon';


export const Header: React.FC<any> = ({
	equity, buyingPower, portfolio, alert, setAlert
}) => {


	return (
		<>
			{
				alert &&
				<Row>
					<Col md={12} lg={12} xl={12}>
						<Card>
							<CardBody>
								<Alert color="warning" className="alert--bordered" isOpen={true}>
									<div className="alert__icon"><CommentAlertOutlineIcon /></div>
									<button className="close" type="button" onClick={() => setAlert(false)}>
										<span className="lnr lnr-cross" />
									</button>
									<div className="alert__content">
										<p><span className="bold-text">Attention!</span> You are not login to your alpaca account.
									</p>
									</div>
								</Alert>
							</CardBody>
						</Card>
					</Col>
				</Row>
			}
			<Row>
				<Col sm={12} md={4} lg={4}>
					<Card>
						<CardBody>
							<div className="card__title">
								<h5 className="bold-text">Equity</h5>
								<h1>
									{equity !== '0' ? `$${equity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : <Loader />}
								</h1>
							</div>
						</CardBody>
					</Card>
				</Col>
				<Col sm={12} md={4} lg={4}>
					<Card>
						<CardBody>
							<div className="card__title">
								<h5 className="bold-text">Buying Power</h5>
								<h1>
									{buyingPower !== '0' ? `$${buyingPower.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : <Loader />}
								</h1>
							</div>
						</CardBody>
					</Card>
				</Col>
				<Col sm={12} md={4} lg={4}>
					<Card>
						<CardBody>
							<div className="card__title">
								<h1 className={`bold-text ${portfolio < 0 ? "text-danger" : "text-success"}`} >{portfolio}%</h1>
								<h5 className="subhead">Total Profit/Loss</h5>
							</div>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</>

	);
}