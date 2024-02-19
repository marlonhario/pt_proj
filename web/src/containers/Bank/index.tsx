import React from 'react'
import {
	Card,
	CardBody,
	Col,
	Row,
	Container,
	Button,
} from "reactstrap";
import { FaPencilAlt } from "react-icons/fa";
import moment from "moment-timezone";
import { Loader } from "../../components/Loader";
import { Modals } from "./components/Modals"
import { MainProps } from "./helpers";

export const Bank: React.FC<MainProps> = ({
	modalProps,
	bankList,
	insEdit,
	setInsEdit,
	setAccountId,
	onChangeNickname,
	handleUpdate,
	setActive,
	ready,
	open,
}) => {
	const displayBanks = bankList.map((bank, index) => {
		const displayNickname = !!bank.nickname ? bank.nickname :
			bank.account_number ? `(* * * * * ${bank.account_number.slice(-3)})` : "";

		return insEdit !== bank.id ?
			bank.active === true ? (
				<Row key={bank.id} className="Bank__row">
					<Col className="Bank__list">
						<div className="Bank__list container">
							<div className="Bank__logo">
								<img
									src={`data:image/png;base64,${bank.ins_logo}`} alt="logo" />
							</div>
							<div className="Bank__details">
								<div className="Bank__institution">
									{bank.name}
								</div>
								<div className="Bank__nickname">
									{displayNickname}
								</div>
								<div className="Bank__date">
									Added {moment(bank.date_added).format('LL')}
								</div>
							</div>
							<div className="Bank__edit">
								<FaPencilAlt onClick={() => setInsEdit(bank.id)} size={20} />
							</div>
						</div>
						<div className="Bank__remove">
							<span onClick={() => {
								setActive(index);
								setAccountId(bank.id);
								modalProps.toggleBankModal();
							}}>
								Remove account
						</span>
						</div>
					</Col>
				</Row >) : null
			: (
				<Row key={bank.id} className="Bank__row update">
					<Col className="Bank__list">
						<div className="Bank__list container">
							<div className="Bank__logo">
								<img
									src={`data:image/png;base64,${bank.ins_logo}`} alt="logo" />
							</div>
							<div className="Bank__details">
								<input
									onChange={(e) => onChangeNickname(e)}
									type="text"
									placeholder="Name your bank account" />
							</div>
							<div className="Bank__update-container">
								<div>
									<Button
										className="rounded"
										color="warning"
										size="sm"
										type="submit"
										onClick={(event) => {handleUpdate(event, index)}}
									>
										Set nickname
								</Button>
								</div>
								<div>
									<Button
										className="Bank__cancel rounded"
										color="warning"
										size="sm"
										onClick={() => setInsEdit(null)}
									>
										Cancel
								</Button>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			)
	})


	return (
		<>
			<Container className="Bank__container">
				<Row>
					<Col md={12} lg={12} xl={12}>
						<Card>
							<CardBody>
								<Row>
									<Col md={2} className="Bank__header">
										Bank accounts
									</Col>
									<Col md={10}>
										<div className="Bank__list-container">
											{
												modalProps.searchBankProps.loader ?
													<Loader /> :
													bankList.length && !modalProps.searchBankProps.loader ?
														displayBanks :
														<p className="Bank__none" style={{ textAlign: "center" }}>
															No accounts yet!...
														</p>
											}
										</div>
										<Row className="Bank__add">
											<Button
												className="rounded"
												color="warning"
												size="sm"
												onClick={() => open()}
											>
												{ready ? "Add a bank account" : "Loading..."}
											</Button>
										</Row>
									</Col>
								</Row>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
			<Modals {...modalProps} />
		</>
	);
}