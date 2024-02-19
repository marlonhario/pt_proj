import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { CollapseComponent } from '../../../shared/components/Collapse';
import moment from "moment";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const History = ({
	t,
	dataTransactions,
	showYear,
	monthList,
	yearList,
	setShowYear,
	setSummary
}: any) => {
	const [hideNext, setHideNext] = React.useState(false);
	const [hidePrevious, setHidePrevious] = React.useState(false);
	const yearToString = "_" + String(showYear);
	let collectMonth = [];


	const handleNext = (argYear) => {
		const result = yearList.find(year => year === argYear + 1);
		result + 1 ? setShowYear(result) : setHideNext(true);
	}

	const handlePrevious = (argYear) => {
		const result = yearList.find(year => year === argYear - 1);
		result - 1 ? setShowYear(result) : setHidePrevious(true);
	}

	const displayContent = monthList.map((perMonth, index) => {
		let totalPositive = 0;
		let totalNegative = 0;
		let totalBalance = 0;


		const getRow = dataTransactions.map((year) => {
			return year[yearToString] ? year[yearToString].map((perYear) => {
				return perYear.year === yearToString ? [perYear].map((year) => {

					if (perMonth.year === yearToString && perMonth.month === year.month) {
						totalBalance = year.balance;

						if (Number(year.amount) > 0) {
							totalPositive = (totalPositive + Number(year.amount));
						} else {
							totalNegative = (totalNegative + Math.abs(Number(year.amount)));
						}

						return (
							<Row className="History__transactions" key={index}>
								< Col md={12} lg={4}>{moment(year.date).format("MMM DD")} : {year.name}</Col>
								< Col md={12} lg={4}>{parseFloat(year.amount)}</Col>
								< Col md={12} lg={4}>{year.balance}</Col>
							</Row>
						);
					}

				}) : null;
			}) : null;
		})

		if (perMonth.year === yearToString) {
			const convertDate = new Date(`${yearToString.slice(1)}-${perMonth.month}`).toUTCString();
			const fetch = {
				currency_code: "US",
				balance: String(totalBalance),
				debit: (totalNegative).toFixed(2),
				credit: (totalPositive).toFixed(2),
				date: convertDate,
			}
			collectMonth.push({ ...fetch })

			return (
				< CollapseComponent
					open={index === 0 ? true : false}
					key={index}
					title={
						<Row key={index}>
							< Col md={12} lg={3}>{moment(perMonth.month).format("MMMM")}</Col>
							< Col md={12} lg={3}>+{(totalPositive).toFixed(2)}</Col>
							< Col md={12} lg={3}>-{(totalNegative).toFixed(2)}</Col>
							< Col md={12} lg={3}>{totalBalance}</Col>
						</Row>
					}
					className="with-shadow" >
					{getRow}
				</CollapseComponent >
			)
		}
	})

	React.useEffect(() => {
		if (showYear) {
			const showNext = (yearList.find(year => year === showYear + 1)) === undefined ? true : false;
			const showPrevious = (yearList.find(year => year === showYear - 1)) === undefined ? true : false;
			setHideNext(showNext);
			setHidePrevious(showPrevious);
		}

		setSummary(collectMonth);

	}, [showYear])


	return (
		< Col md={12} lg={12} className="History__container">
			<Card>
				<CardBody>
					<div className="card__title">
						<button
							className={`close ${hidePrevious && "hide-previous"}`}
							onClick={() => handlePrevious(showYear)}
						>
							<FaArrowAltCircleLeft />
						</button>
						<h4 className="bold-text">{yearToString.replace('_', '')}</h4>
						<button
							className={`close ${hideNext && "hide-next"}`}
							onClick={() => handleNext(showYear)}
						>
							< FaArrowAltCircleRight />
						</button>
					</div>
					{displayContent}
				</CardBody>
			</Card>
		</Col >
	)
};

History.propTypes = {
	t: PropTypes.func.isRequired,
};

export default withTranslation('common')(History);
