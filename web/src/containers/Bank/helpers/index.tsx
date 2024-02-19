import { SearchBankProps } from "../../AddFunds/helpers"

export interface ModalProps {
	bankModal: boolean;
	toggleBankModal: Function;
	handleRemove: Function;
	searchBankProps: SearchBankProps;
}

export interface MainProps {
	modalProps: ModalProps;
	bankList: any;
	insEdit: null | number;
	setActive: (id: null | number) => void;
	setInsEdit: (id: null | number) => void;
	setAccountId: (id: null | number) => void;
	onChangeNickname: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleUpdate: (event: any, index: number) => void;
	ready: boolean;
	open: Function;
}