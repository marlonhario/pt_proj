import React, { useState, useEffect, useCallback } from "react";
import {
	usePlaidAccessMutation,
	usePlaidCreateAccountMutation,
	usePlaidAccountsMutation,
	usePlaidLinkQuery,
	usePlaidMailMutation,
	usePlaiInstitutionIconMutation,
} from "../../../generated/graphql";
import { navList } from "../helpers";
import AddFunds from "../";
import { EmailContent } from "../components";
import { usePlaidLink } from "react-plaid-link";
import { getAccessToken } from "../../../accessToken";
import { toastify } from "../../../components/Toastify";
import { renderToString } from "react-dom/server";

interface Props {
	openModal: boolean;
	handleModal: (value: boolean) => void;
}

const AddFundsActions: React.FC<Props> = ({ handleModal, openModal }) => {
	const [activeTab, setActiveTab] = useState("1");
	const [modal, setModal] = useState(openModal);
	const [nestedModal, setNestedModal] = useState(false);
	const [closeAll, setCloseAll] = useState(false);
	const [bankOptions, setBankOptions] = useState([]);
	const [selectBank, setSelectBank] = useState("");
	const [accounts, setAccounts] = useState([]);
	const [loader, setLoader] = useState(false);
	const [plaidLink, setPlaidLink] = useState("");
	const [accessPlaid, setAccessPlaid] = useState("");

	const { data } = usePlaidLinkQuery();
	const [plaidAccess] = usePlaidAccessMutation();
	const [plaidCreateAccount] = usePlaidCreateAccountMutation();
	const [plaidAccounts] = usePlaidAccountsMutation();
	const [plaiInstitutionIcon] = usePlaiInstitutionIconMutation();
	const [plaidMail] = usePlaidMailMutation();
	const accessToken = getAccessToken();

	const toggle = (): void => setModal(!modal);
	const toggleNested = (): void => {
		setNestedModal(!nestedModal);
		setCloseAll(false);
	};

	const toggleTab = (tab: string): void => {
		if (activeTab !== tab) {
			setActiveTab(tab);
		}
	};

	const handleSelectBank = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		event.preventDefault();
		event.target.value === "11" ? open() : setSelectBank(event.target.value);
	};

	const getBankAccounts = async (): Promise<void> => {
		try {
			const response = await plaidAccounts({
				variables: {
					token: accessToken,
				},
			});

			if (response && response.data) {
				const jsonParse = JSON.parse(response.data.plaidAccounts);

				if (jsonParse.status_code !== 200) {
					toastify(jsonParse.status_code, jsonParse.error);
				} else {
					setBankOptions(jsonParse.data);
				}
			}
		} catch (err) {
			toastify(400, err);
		}
	};

	const accountHandler = async (
		event: React.MouseEvent<HTMLButtonElement>,
		acc: string,
		accId: string,
		institution: string,
		insLogo: string,
		insId: string,
	): Promise<void> => {
		event.preventDefault();

		let mailData: any = accounts.filter(
			(acc) => accId === acc.account_id
		);

		try {
			const response = await plaidCreateAccount({
				variables: {
					token: accessToken,
					accountId: accId,
					accountName: acc.trim(),
					institution,
					accountNumber: mailData[0].account,
					institutionId: insId,
					InstitutionLogo: insLogo
				},
			});

			if (response && response.data) {
				const jsonParse = JSON.parse(response.data.plaidCreateAccount);

				if (jsonParse.status_code !== 200) {
					toastify(jsonParse.status_code, jsonParse.error);
				} else {
					setNestedModal(!nestedModal);
					toastify(jsonParse.status_code, "Successfully added!");

					mailData = {
						name: mailData[0].accountName,
						institution: mailData[0].institution.name,
						accountNumber: mailData[0].account.slice(-5),
						email: jsonParse.data,
					};

					await plaidMail({
						variables: {
							mailContent: renderToString(<EmailContent {...mailData} />),
							token: accessToken,
						},
					});

					await getBankAccounts();
					setSelectBank(accId);
				}
			}
		} catch (err) {
			toastify(400, err);
		}
	};

	const onSuccess = useCallback(async (token: string, metadata): Promise<
		void
	> => {
		try {
			setLoader(true);
			const response = await plaidAccess({
				variables: {
					plaidToken: token,
				},
			});

			const fetLogo = await plaiInstitutionIcon({
				variables: {
					insId: metadata.institution.institution_id,
				},
			})
			const parseLogo = JSON.parse(fetLogo.data.plaiInstitutionIcon).data.logo

			if (response && response.data) {
				const jsonParse = JSON.parse(response.data.plaidAccess);
				setAccessPlaid(jsonParse.data.accessPlaid);

				if (jsonParse.status_code === 200) {
					const filterAccounts = [];

					metadata.accounts.forEach((metaAcc) => {
						jsonParse.data.accounts.forEach((responseAcc) => {
							if (metaAcc.id === responseAcc.account_id) {
								filterAccounts.push({
									...responseAcc,
									...metaAcc,
									institution: metadata.institution,
									accountName: jsonParse.data.name,
									institutionLogo: parseLogo,
								});
							}
						});
					});
					setAccounts(filterAccounts);

				} else {
					toastify(jsonParse.status_code, jsonParse.error);
				}
			}
		} catch (err) {
			toastify(400, err);
		} finally {
			setLoader(false);
		}
	}, []);

	const onEvent = useCallback((eventName: string): void => {
		if (eventName === "HANDOFF") {
			setNestedModal(!nestedModal);
		}
	}, []);

	useEffect(() => {
		getBankAccounts();
		handleModal(modal);

		if (data) {
			const { status_code, error, data: dataParse } = JSON.parse(
				data.plaidLink
			);

			if (status_code !== 200) {
				toastify(status_code, error);
			} else {
				setPlaidLink(dataParse.link_token);
			}
		}

	}, [modal, data]);

	const config = {
		token: plaidLink,
		onSuccess,
		onEvent,
	};

	const { open } = usePlaidLink(config);

	const propList = {
		navProps: {
			navList,
			toggleTab,
			activeTab,
		},
		addFundsTabProps: {
			selectBank,
			handleSelectBank,
			bankOptions,
		},
		searchBankProps: {
			nestedModal,
			toggleNested,
			closeAll,
			toggle,
			accounts,
			accountHandler,
			loader,
		},
		addFundsProps: {
			modal,
		},
	};

	return <AddFunds {...propList} />;
};

export default AddFundsActions;
