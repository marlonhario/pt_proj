import React from 'react'
import { ModalProps } from "../helpers";
import {
	Button,
	Modal,
	ModalBody,
	ModalFooter
} from "reactstrap";
import { SearchBank } from "../../AddFunds/components";

export const Modals: React.FC<ModalProps> = ({
	bankModal,
	toggleBankModal,
	handleRemove,
	searchBankProps,
}) => {
	return (
		<>
			<Modal
				className="Bank__modal"
				isOpen={bankModal}
				toggle={() => toggleBankModal()}>

				<ModalBody>
					Removing this bank account will cancel
					scheduled deposites or withrawals. This
					cannot be undone.
					<br />
					<br />
					Are you sure you want to delete this bankList
					account?
				</ModalBody>
				<ModalFooter>
					<button className="close" onClick={() => toggleBankModal()}>
						&times;
					</button>
					<Button
						className="Bank__delete rounded"
						color="warning"
						size="sm"
						block
						onClick={() => handleRemove()}
					>
						Delete
					</Button>
					<Button
						className="Bank__cancel rounded"
						color="warning"
						size="sm"
						block
						onClick={() => toggleBankModal()}
					>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
			<SearchBank {...searchBankProps} />
		</>
	);
}