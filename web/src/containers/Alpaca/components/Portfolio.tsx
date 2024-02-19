import React from 'react';
import {
	Card,
	CardBody,
	Col,
	Table,
	Row
} from 'reactstrap';


export const Portfolio: React.FC<any> = ({
	displayPortfolio
}) => {
	return (
		<Row>
			<Col sm={12} md={12} lg={12}>
				<Card>
					<CardBody>
						<div className="card__title">
							<h5 className="bold-text">Portfolio</h5>
						</div>
						<Table responsive hover>
							<thead>
								<tr>
									<th>Stock</th>
									<th>Price</th>
									<th>Shares</th>
									<th>Market Value</th>
									<th>Total Profit</th>
								</tr>
							</thead>
							<tbody>
								{displayPortfolio}
							</tbody>
						</Table>
					</CardBody>
				</Card>
			</Col>
		</Row>
	);
}