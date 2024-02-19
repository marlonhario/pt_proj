import React from "react";
import {
	Col,
	Row,
	Card,
	CardBody,
	Modal,
	ModalBody,
	ModalFooter,
	ListGroup,
	ListGroupItem,
} from "reactstrap";
import { SearchBankProps } from "../helpers";
import { Loader } from "../../../components/Loader";

const SearchBank = ({
	nestedModal,
	closeAll,
	toggle,
	toggleNested,
	accounts,
	accountHandler,
	loader,
}: SearchBankProps) => {
	const accountDisplay = accounts.map((acc: any) => {
		return (
			<ListGroupItem
				className="SearchBank__list-group"
				key={acc.account_id}
				tag="button"
				onClick={(event) =>
					accountHandler(
						event,
						acc.name,
						acc.account_id,
						acc.institution.name,
						acc.institutionLogo,
						acc.institution.institution_id
					)
				}
				action
			>
				<img
					className="SearchBank__logo"
					src={`data:image/png;base64,${acc.institutionLogo}`} alt="logo" />

				({acc.institution.name}) {acc.name}
			</ListGroupItem>
		)
	});

	return (
		<Modal
			className="AddFunds__select-bank"
			isOpen={nestedModal}
			toggle={toggleNested}
			onClosed={closeAll ? toggle : undefined}
		>
			<ModalBody>
				<Card className="AddFunds__container">
					<Row>
						<Col md={12}>
							<h3 className=" AddFunds__bank-list header bold-text text-primary">
								Select your bank account?
              </h3>
						</Col>
					</Row>
					<CardBody>
						{loader ? (
							<Loader />
						) : (
								<Row>
									<Col md={12}>
										<ListGroup>{accountDisplay}</ListGroup>
									</Col>
								</Row>
							)}
					</CardBody>
				</Card>
			</ModalBody>
			<ModalFooter>
				<button className="close" onClick={toggleNested}>
					&times;
        </button>
				<h4 className="subhead">
					We use 128-bit SSL encryption (same as most banks) to process your
          information. Our <a href="#">Privacy Policy</a>. describes why we
          collect your personal information and how we keep it secure.
        </h4>
			</ModalFooter>
		</Modal>
	);
};

export default SearchBank;
