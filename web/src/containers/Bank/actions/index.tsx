import React, { useState, useCallback, useEffect } from 'react'
import {
	usePlaidAccessMutation,
	usePlaidCreateAccountMutation,
	usePlaidAccountsMutation,
	usePlaidLinkQuery,
	usePlaidMailMutation,
	usePlaiInstitutionIconMutation,
	usePlaidAccountRemoveMutation,
	usePlaidNicknameUpdateMutation,
} from "../../../generated/graphql";
import { toastify } from "../../../components/Toastify";
import { usePlaidLink } from "react-plaid-link";
import { getAccessToken } from "../../../accessToken";
import { renderToString } from "react-dom/server";
import { EmailContent } from "../../AddFunds/components";
import { Bank } from "../";

export const BankActions: React.FC = () => {
	const [accountId, setAccountId] = useState<null | number>(null);
	const [insEdit, setInsEdit] = useState<null | number>(null);
	const [active, setActive] = useState<null | number>(null);
	const [bankList, setList] = useState([]);
	const [nickname, setNickname] = useState("");
	const [bankModal, setBankModal] = useState(false);
	const [plaidLink, setPlaidLink] = useState("");
	const [loader, setLoader] = useState(false);
	const [accounts, setAccounts] = useState([]);
	const [nestedModal, setNestedModal] = useState(false);
	const [closeAll, setCloseAll] = useState(false);
	const [modal, setModal] = useState(false);

	const { data } = usePlaidLinkQuery();
	const [plaidAccess] = usePlaidAccessMutation();
	const [plaidCreateAccount] = usePlaidCreateAccountMutation();
	const [plaidAccounts] = usePlaidAccountsMutation();
	const [plaiInstitutionIcon] = usePlaiInstitutionIconMutation();
	const [plaidMail] = usePlaidMailMutation();
	const [plaidAccountRemove] = usePlaidAccountRemoveMutation();
	const [plaidNicknameUpdate] = usePlaidNicknameUpdateMutation();
	const accessToken = getAccessToken();

	const toggle = (): void => setModal(!modal);

	const toggleNested = (): void => {
		setNestedModal(!nestedModal);
		setCloseAll(false);
	};

	const toggleBankModal = () => {
		setBankModal(!bankModal);
	};

	const onChangeNickname = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		event.preventDefault();
		setNickname(event.target.value);
	}

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
				}
			}
		} catch (err) {
			toastify(400, err);
		}
	};

	const handleRemove = async () => {
		const fetchList = bankList;
		fetchList[active].active = false;
		setList([...fetchList]);
		setBankModal(!bankModal);

		if (accountId) {
			const result = await plaidAccountRemove({
				variables: {
					id: accountId,
				},
			});

			const resultParse = JSON.parse(result.data.plaidAccountRemove);
			if (resultParse.status_code === 200) {
				toastify(200, "Successfully removed!");
			} else {
				toastify(400, "Encounter err!!");
			}
		}
	}

	const handleUpdate = async (
		event: React.FormEvent<HTMLFormElement>,
		index: number
	) => {
		event.preventDefault();
		const fetchList = bankList;
		fetchList[index].nickname = !!nickname ? nickname : "";
		setList([...fetchList]);
		setInsEdit(null);

		if (insEdit) {
			const result = await plaidNicknameUpdate({
				variables: {
					id: insEdit,
					value: nickname
				},
			});

			const resultParse = JSON.parse(result.data.plaidNicknameUpdate);
			if (resultParse.status_code === 200) {
				toastify(200, "Successfully updated!");
			} else {
				toastify(400, "Encounter err!!");
			}
		}
	}

	const onSuccess = useCallback(async (token: string, metadata): Promise<
		void
	> => {
		try {
			setLoader(true);
			if (token) {
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
					setList(jsonParse.data.reverse());
				}
			}
		} catch (err) {
			toastify(400, err);
		}
	};

	useEffect(() => {
		getBankAccounts();

		if (data) {
			try {
				setLoader(true)
				const { status_code, error, data: dataParse } = JSON.parse(
					data.plaidLink
				);

				if (status_code !== 200) {
					toastify(status_code, error);
				} else {
					setPlaidLink(dataParse.link_token);
				}
			} catch (err) {
				toastify(400, err);
			} finally {
				setLoader(false)
			}
		}

	}, [data]);

	const config = {
		token: plaidLink,
		onSuccess,
		onEvent,
	};

	const { open, ready } = usePlaidLink(config);

	const searchBankProps = {
		nestedModal,
		closeAll,
		toggle,
		toggleNested,
		accounts,
		accountHandler,
		loader,
	}

	const modalProps = {
		bankModal,
		toggleBankModal,
		handleRemove,
		searchBankProps,
	}

	const mainProps = {
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
	}

	return <Bank {...mainProps} />;
}