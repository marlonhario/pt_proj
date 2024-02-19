export const navList: { tab: string; title: string }[] = [
	{ tab: "1", title: "Add or move funds" },
	{ tab: "2", title: "Withdraw funds" },
];

export const schedules: { id: number; category: string }[] = [
	{ id: 1, category: "Just this once" },
	{ id: 2, category: "Every month" },
	{ id: 3, category: "Every two weeks" },
	{ id: 4, category: "Every week" },
];

// AddFundsTab interfaces
export interface AddFundsTabProps {
	selectBank: string;
	bankOptions: {
		id: string;
		account_id: string;
		name: string;
		institution: string;
	}[];
	handleSelectBank: (value: any) => void;
}

// Nav interfaces
interface Tab {
	tab: string;
	title: string;
}

export interface NavProps {
	navList: Tab[];
	activeTab: string;
	toggleTab: (value: string) => void;
}

export interface SearchBankProps {
	nestedModal: boolean;
	closeAll: boolean;
	loader: boolean;
	toggle: () => void;
	toggleNested: () => void;
	accountHandler: (
		event: any,
		acc: string,
		accId: string,
		institution: string,
		insLogo: string,
		insId: string,
	) => void;
	accounts: any;
}

//AddFunds interfaces
export interface AddFundsProps {
	modal: boolean;
}

// Fetch all interfaces
export interface MainProps {
	navProps: NavProps;
	addFundsTabProps: AddFundsTabProps;
	searchBankProps: SearchBankProps;
	addFundsProps: AddFundsProps;
}
