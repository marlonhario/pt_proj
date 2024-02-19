import React, { useState, useEffect } from 'react'
import {
	Col,
	Card,
	CardBody,
	Table,
	Badge,
	Row,
	Button
} from 'reactstrap';
import { useAlpacaOauthQuery } from "../../generated/graphql";
import { Loader } from "../../components/Loader";

interface indexProps {

}

export const Broker: React.FC<indexProps> = ({ }) => {
	const { data: oauthData } = useAlpacaOauthQuery();
	const [content, setContent] = useState<any>('');
	const alpacaToken = localStorage.getItem('alpacaToken');

	useEffect(() => {
		if (oauthData) {
			setContent(oauthData.alpacaOauth);
		}

	}, [oauthData, content])

	return content ?
		<Col md={12} lg={12} className="Broker__container">
			<Card>

				<CardBody>
					<div className="card__title">
						<h5 className="bold-text">Broker List</h5>
					</div>
					<Row>
						<Col sm="12" md={{ size: 8, offset: 2 }}>
							<Table responsive hover>
								<thead>
									<tr>
										<th>Broker</th>
										<th className="Broker__status">Status</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<a
												href={content}
											>
												<Button
													className="rounded"
													color="warning"
													size="sm"
												>
													Connect To Alpaca
												</Button>
											</a>

										</td>
										<td className="Broker__badge">
											<span>
												<Badge color={alpacaToken ? "success" : "danger"}>
													{
														alpacaToken ? "Connected" : "Disconnected"
													}
												</Badge>
											</span>
										</td>
									</tr>
								</tbody>
							</Table>
						</Col>
					</Row>
				</CardBody>
			</Card>
		</Col> :
		(
			<Col md={12} lg={12}>
				<Card>
					<Loader />
				</Card>
			</Col>);
}