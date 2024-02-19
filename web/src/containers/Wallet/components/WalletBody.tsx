import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { WalletCollapse } from "./WalletCollapse";
import { WalletAutoDeposit } from "./WalletAutoDeposit";
import History from "./WalletHistory";
import moment from "moment";
import {
	useRemoveTransactionsMutation,
	useAddTransactionsMutation,
	useAddSummaryMutation,
	useGetSummaryQuery,
} from "../../../generated/graphql";
import { transactionsData } from "../helpers";
interface Props {
	content: boolean;
}

export const WalletBody: React.FC<Props> = ({ content }) => {
	const [dataTransactions, setDataTransactions] = useState<any>([])
	const [showYear, setShowYear] = useState(0);
	const [summary, setSummary] = useState<any>([]);
	const [monthList, setMonthList] = useState([]);
	const [yearList, setYearList] = useState([]);

	const { data } = useGetSummaryQuery();
	const [addSummary] = useAddSummaryMutation();
	const [addTransactions] = useAddTransactionsMutation();
	const [removeTransactions] = useRemoveTransactionsMutation();

	const handleAddSummary = async (
		currency_code: string,
		balance: string,
		debit: string,
		credit: string,
		date: string,
	) => {
		await addSummary({
			variables: {
				currency_code,
				balance,
				debit,
				credit,
				date,
			},
		});
	}

	const handleAddTransactions = async (data: any) => {

		await removeTransactions();
		await data.forEach(async (value) => {
			const convertDate = new Date(value.date).toUTCString();
			await addTransactions({
				variables: {
					transaction_type: value.transaction_type,
					currency_code: value.currency_code,
					balance: value.balance,
					amount: value.amount,
					date: convertDate,
					name: value.name,
				},
			});
		})
	}

	useEffect(() => {
		if (data) {
			const dataParse = JSON.parse(data.getSummary).data;
			const transactionData = [];
			let unique = [];
			let distinctYear = [];
			let years = [];
			let storeMonth = [];
			let yearData = [];

			dataParse.forEach(element => {
				const year = moment(element.date).year();
				const month = moment(element.date).format('M');
				const date = { year: String("_" + year), month }
				transactionData.push({ ...date, ...element })
				years.push(year);
			});

			for (let i = 0; i < transactionData.length; i++) {
				if (!unique[transactionData[i].year]) {
					distinctYear.push(transactionData[i].year);
					unique[transactionData[i].year] = 1;
				}
			}


			distinctYear.forEach((daw) => {
				const filterResult = transactionData.filter((item) => item.year === daw);
				yearData.push({ [daw]: filterResult });
			})

			distinctYear.map((ad) => {
				return yearData.map((dataValue) => {
					if (dataValue[ad]) {
						let unique = [];
						let distinct = [];
						for (let i = 0; i < dataValue[ad].length; i++) {
							if (!unique[dataValue[ad][i].month]) {
								distinct.push(`${ad}_${dataValue[ad][i].month}`);
								storeMonth.push({ year: ad, month: dataValue[ad][i].month, totalPositive: 0 });
								unique[dataValue[ad][i].month] = 1;
							}
						}
					}
					return;
				})
			})

			const findMax = Math.max(...years);
			setYearList(years)
			setShowYear(findMax);
			setDataTransactions(yearData);
			setMonthList(storeMonth);
		} else {
			handleAddTransactions(transactionsData);
		}

	}, [data])

	useEffect(() => {
		if (summary.length > 0) {
			summary.forEach((value) => {
				handleAddSummary(
					value.currency_code,
					value.balance,
					value.debit,
					value.credit,
					value.date,
				)
			})

		}
	}, [summary])


	return (
		<Col>
			{content ?
				<>
					<Row>
						<WalletAutoDeposit />
					</Row>
					<Row>
						<Col>
							<WalletCollapse />
						</Col>
					</Row>
				</> :
				<History
					dataTransactions={dataTransactions}
					monthList={monthList}
					showYear={showYear}
					yearList={yearList}
					setSummary={setSummary}
					setShowYear={setShowYear} />
			}
		</Col >
	)
}