import React from "react";
import { Button, Col, Row } from "reactstrap";
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import DotsHorizontalIcon from 'mdi-react/DotsHorizontalIcon';
import AddFundsActions from "../../AddFunds/actions";

export const WalletHeader: React.FC<any> = ({ setContent }) => {
	const [modal, setModal] = React.useState(false);
	const [value, setValue] = React.useState('auto_deposit')

	const handleChange = (val) => {
		setValue(val)
	}

	return (
		<Col md={12} xs={12} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
			{modal && <AddFundsActions openModal={modal} handleModal={setModal} />}
			<Col xs={6} md={6}>
				<Row>
					<Col md={3} xs={12}>
						<Row>
							<h5 className="wallet-header">Personal</h5>
						</Row>
						<Row>
							<h4 className="wallet-value">Wallet</h4>
						</Row>
					</Col>
					<Col md={3} xs={12}>
						<Row>
							<h5 className="wallet-header">Balance</h5>
						</Row>
						<Row>
							<h4 className="wallet-value">$0.09</h4>
						</Row>
					</Col>
					<Col md={4} xs={12}>
						<Row>
							<h5 className="wallet-header">Free Trades</h5>
						</Row>
						<Row>
							<h4 className="wallet-value">25</h4>
						</Row>
					</Col>
				</Row>
			</Col>
			<Col md={3}>
				<ToggleButtonGroup style={{ borderRadius: '15px !important' }} type="radio" name="options" value={value} onChange={handleChange}>
					<ToggleButton onClick={() => setContent(true)} value={'auto_deposit'} style={{ backgroundColor: value === 'auto_deposit' ? '#3399FF' : 'gray', borderColor: value === 'auto_deposit' ? '#3399FF' : 'gray' }}>Auto Deposit</ToggleButton>
					<ToggleButton onClick={() => setContent(false)} value={'history'} style={{ backgroundColor: value === 'history' ? '#3399FF' : 'gray', borderColor: 'gray' }}>History</ToggleButton>
				</ToggleButtonGroup>
			</Col>
			<Col xs={6} md={3}>
				<Row>
					<Col>
						<Button
							className="wallet-btn-center wallet-btn-fund"
							outline style={{ color: '#fff', marginLeft: 10 }}
							onClick={() => setModal(!modal)}
						>
							Fund this account
                        </Button>
						<Button className="wallet-btn-center wallet-dots" color="primary" outline><DotsHorizontalIcon /></Button>
					</Col>
				</Row>
			</Col>
		</Col>
	)
}
