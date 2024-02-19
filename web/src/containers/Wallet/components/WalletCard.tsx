import React from "react";
import { Card, CardBody, Col, Row, Progress, Button } from "reactstrap";
import { WalletBody } from "./WalletBody";
import { WalletHeader } from "./WalletHeader";
import BeachIcon from 'mdi-react/BeachIcon';
import { WalletDeposit } from "./WalletDeposit";
import { WalletGoal } from "./WalletGoal";
import { WalletPortfolio } from "./WalletPortfolio";

interface Props { }

export const WalletCard: React.FC<Props> = ({ }) => {
	const [content, setContent] = React.useState(true);

	return (
		<Col>
			<Row>
				<Card>
					<CardBody>
						<WalletHeader setContent={setContent} />
					</CardBody>
				</Card>
			</Row>
			<Row>
				<Col md={8} xs={12}>
					<Card>
						<CardBody>
							<WalletBody content={content} />
						</CardBody>
					</Card>
				</Col>
				<Col lg={4}>
					<WalletDeposit />
					<WalletGoal />
					<WalletPortfolio />
				</Col>
			</Row>
		</Col>
	)
}