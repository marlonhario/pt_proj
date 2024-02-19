import React, { useContext, useEffect, useState } from 'react';
import {
	Card,
	CardBody,
	Table,
	Pagination,
	PaginationItem,
	PaginationLink
} from 'reactstrap';

export const Trades: React.FC<any> = ({
	displayTrades, currentPage, handleClick, pagesCount
}) => {
	return (
		<Card className="Trades__table">
			<CardBody>
				<div className="card__title">
					<h5 className="bold-text">Trades</h5>
				</div>
				<Table responsive hover>
					<thead>
						<tr>
							<th>Stock</th>
							<th>Order</th>
							<th>Shares</th>
							<th>Price per share</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{displayTrades}
					</tbody>
				</Table>
				<div className="pagination-wrapper">
					<Pagination aria-label="Page navigation example">
						<PaginationItem disabled={currentPage <= 0}>
							<PaginationLink
								onClick={e => handleClick(e, currentPage - 1)}
								previous
								href="#"
							/>

						</PaginationItem>
						{[...Array(pagesCount)].map((page, i) =>
							<PaginationItem active={i === currentPage} key={i}>
								<PaginationLink onClick={e => handleClick(e, i)} href="#">
									{i + 1}
								</PaginationLink>
							</PaginationItem>
						)}
						<PaginationItem disabled={currentPage >= pagesCount - 1}>
							<PaginationLink
								onClick={e => handleClick(e, currentPage + 1)}
								next
								href="#"
							/>
						</PaginationItem>
					</Pagination>
				</div>
			</CardBody>
		</Card>
	);
}