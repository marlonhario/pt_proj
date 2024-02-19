import React, { useContext, useEffect, useState } from 'react';
import {
	Col,
	Badge,
	Row,
	Container
} from 'reactstrap';
import { AlpacaContext } from "../../../context/Broker/Alpaca";
import {
	useAlpacaAccountMutation,
	useAlpacaOrdersMutation,
	useAlpacaPortfolioMutation,
	useAlpacaPositionsMutation,
	useAlpacaCreateTradeMutation,
} from "../../../generated/graphql";
import { Header } from "./HeaderContent";
import { Trades } from "./Trades";
import { Portfolio } from "./Portfolio";
import { TradeForm } from "./TradeForm";
import { toastify } from "../../../components/Toastify";
import { getAccessToken } from "../../../accessToken";

interface indexProps {

}

export const AlpacaContent: React.FC<indexProps> = ({ }) => {
	const alpacaState = useContext(AlpacaContext);
	const [alpacaAccount] = useAlpacaAccountMutation();
	const [alpacaOrders] = useAlpacaOrdersMutation();
	const [alpacaPortfolio] = useAlpacaPortfolioMutation();
	const [alpacaPositions] = useAlpacaPositionsMutation();
	const [alpacaCreateTrade] = useAlpacaCreateTradeMutation();
	const [equity, setEquity] = useState('0');
	const [alert, setAlert] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [buyingPower, setBuyingPower] = useState('0');
	const [trades, setTrades] = useState([]);
	const [positions, setPositions] = useState([]);
	const [portfolio, setPortfolio] = useState<any>('0');
	const [formData, setFormData] = useState<any>({
		symbol: "",
		qty: 0,
		side: "",
		type: "",
		timeInForce: ""
	});
	const alpacaToken = localStorage.getItem('alpacaToken');
	const accessToken = getAccessToken();

	const handleFields = (
		name: string,
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		event.preventDefault();
		setFormData({ ...formData, [name]: event.target.value });
	};

	const handleApalcaAccount = async (token) => {
		const accountResponse = await alpacaAccount({
			variables: { token },
		});

		if (accountResponse.data.alpacaAccount && accountResponse.data) {
			const accountParse = JSON.parse(accountResponse.data.alpacaAccount)
			setEquity(accountParse.data.equity)
			setBuyingPower(accountParse.data.buying_power)
		}
	}

	const handleApalcaTrades = async (token) => {
		const accountResponse = await alpacaOrders({
			variables: { token },
		});

		if (accountResponse.data.alpacaOrders && accountResponse.data) {
			const accountParse = JSON.parse(accountResponse.data.alpacaOrders)
			setTrades(accountParse.data)
		}
	}

	const handleApalcaPositions = async (token) => {
		const accountResponse = await alpacaPositions({
			variables: { token },
		});

		if (accountResponse.data.alpacaPositions && accountResponse.data) {
			const accountParse = JSON.parse(accountResponse.data.alpacaPositions)
			setPositions(accountParse.data)
		}
	}

	const handleApalcaPortfolio = async (token) => {
		const accountResponse = await alpacaPortfolio({
			variables: { token },
		});

		if (accountResponse.data.alpacaPortfolio && accountResponse.data) {
			const accountParse = JSON.parse(accountResponse.data.alpacaPortfolio)
			const getIndex = accountParse.data.profit_loss_pct.length - 1;
			setPortfolio(accountParse.data.profit_loss_pct[getIndex].toFixed(4))
		}
	}

	const handleCreateTrade = async (event: any) => {
		event.preventDefault();
		if (alpacaToken) {
			const regex = /^[0-9]+$/;
			const checkQty = formData.qty.match(regex)
			if (checkQty) {
				try {
					const accountResponse = await alpacaCreateTrade({
						variables: {
							token: alpacaToken,
							symbol: formData.symbol,
							qty: Number(formData.qty),
							side: formData.side,
							type: formData.type,
							timeInForce: formData.timeInForce,
							userToken: accessToken
						},
					});

					if (accountResponse.data.alpacaCreateTrade && accountResponse.data) {
						const accountParse = JSON.parse(accountResponse.data.alpacaCreateTrade)
						console.log(accountParse, "accountParseaccountParse")

						if (accountParse.status_code === 200) {
							setFormData({
								symbol: "",
								qty: 0,
								side: "",
								type: "",
								timeInForce: ""
							});
							handleApalcaTrades(alpacaToken);
							toastify(accountParse.status_code, "Trade successfully created.");
						} else {
							toastify(
								accountParse.status_code,
								accountParse.error.error.message
							)
						}
					}
				} catch (error) {
					toastify(400, "cannot save trade");
				}

			} else {
				toastify(400, "Please enter number for quantity.")
			}
		} else {
			toastify(400, "Please login to alpaca before creating trade.")
		}
	}

	useEffect(() => {
		if (alpacaToken) {
			handleApalcaAccount(alpacaToken);
			handleApalcaTrades(alpacaToken);
			handleApalcaPositions(alpacaToken);
			handleApalcaPortfolio(alpacaToken);
		} else {
			setAlert(true);
		}

	}, [alpacaToken])


	const displayPortfolio = positions.map((position, index) => {
		return (
			<tr key={index}>
				<td>{position.symbol}</td>
				<td>${position.current_price}</td>
				<td>{position.qty}</td>
				<td>{position.market_value < 0 ? '-$' : '+$'}{Math.abs(position.market_value)}</td>
				<td><Badge color="success">{position.unrealized_pl < 0 ? '-$' : '+$'}{Math.abs(position.unrealized_pl)}</Badge></td>
			</tr>
		);
	})


	const pageSize = 10;
	const pagesCount = Math.ceil(trades.length / pageSize);
	const currentData = trades.slice(
		currentPage * pageSize,
		(currentPage + 1) * pageSize
	)

	const handleClick = (e, index) => {
		e.preventDefault();
		setCurrentPage(index)
	}

	const displayTrades = currentData.map((trade, index) => {
		return (
			<tr key={index}>
				<td>{trade.symbol}</td>
				<td>
					{trade.order_type.charAt(0).toUpperCase() + trade.order_type.slice(1)}&nbsp;
					{trade.side.toUpperCase()}
				</td>
				<td>{trade.qty}</td>
				<td>${trade.filled_avg_price ? trade.filled_avg_price : '0'}</td>
				<td>{trade.status}</td>
			</tr>
		);
	})

	const headerData = { equity, buyingPower, portfolio, setAlert, alert };
	const tradeFormData = { formData, handleFields, handleCreateTrade };
	const portfolioData = { displayPortfolio };
	const tradesData = { displayTrades, currentPage, handleClick, pagesCount };


	return (
		<Container className="AlpacaContent__container">
			<Header {...headerData} />
			<Row>
				<Col sm={12} md={6} lg={6}>
					<TradeForm  {...tradeFormData} />
					<Portfolio {...portfolioData} />
				</Col>
				<Col sm={12} md={6} lg={6}>
					<Trades {...tradesData} />
				</Col>
			</Row>
		</Container>
	);
}