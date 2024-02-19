import { useCallback, useState, useEffect } from "react"
import { getAccessToken } from "../../../accessToken"
import { toastify } from "../../../components/Toastify"
import { useGetDepositsByIdMutation, useSaveDepositMutation } from "../../../generated/graphql"

interface DepositDetails {
    minimum_wallet_balance: any;
    amount_deposit: any;
    bank_account: string;
    isMinimum: boolean;
    isAmount: boolean;
    isDeposit: boolean;
}

const useWallet = () => {
    const token = getAccessToken()
    const [getDepositsById] = useGetDepositsByIdMutation()
    const [saveDeposit] = useSaveDepositMutation()

    const [values, setValues] = useState<DepositDetails>(
        {
            minimum_wallet_balance: 0,
            amount_deposit: 0,
            bank_account: '',
            isMinimum: true,
            isAmount: true,
            isDeposit: true
        }
    )

    const getDeposits = useCallback(async () => {
        try {
            const response = await getDepositsById({
                variables: {
                    data: { token }
                }
            })
            if (response && response.data) {
                setValues({
                    minimum_wallet_balance: response.data.getDepositsById.deposit.minimum_wallet_balance,
                    amount_deposit: response.data.getDepositsById.deposit.amount_deposit,
                    bank_account: response.data.getDepositsById.deposit.bank_account,
                    isMinimum: response.data.getDepositsById.deposit.is_min_automatic,
                    isAmount: response.data.getDepositsById.deposit.is_amt_automatic,
                    isDeposit: response.data.getDepositsById.deposit.is_auto,
                })
            }
        } catch (err) {
            console.log(err)
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { minimum_wallet_balance, amount_deposit, bank_account, isMinimum, isAmount, isDeposit } = values

        if (!bank_account) {
            return toastify(100, `Please select bank account!`);
        } else if (minimum_wallet_balance < 19) {
            return toastify(100, `Minimum deposit is $20`);
        } else if (amount_deposit < 19) {
            return toastify(100, `Minimum amount deposit is $20`);
        } else {
            const data = {
                token: token,
                minimum_wallet_balance: parseFloat(minimum_wallet_balance),
                amount_deposit: parseFloat(amount_deposit),
                bank_account: bank_account,
                is_auto: isDeposit,
                is_min_automatic: isMinimum,
                is_amt_automatic: isAmount
            }

            try {
                const response = await saveDeposit({
                    variables: {
                        data: data
                    }
                })

                if (response && response.data) {
                    toastify(100, `Sucessfully saved`);
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };
    const handleDropdown = (event: any) => {
        setValues(values => ({ ...values, bank_account: event.label }));
    }

    useEffect(() => {
        getDeposits()
    }, [getDeposits])

    const handleMin = () => {
        const min = values.isMinimum
        setValues(values => ({ ...values, isMinimum: !min }));
    }

    const handleAmnt = () => {
        const amt = values.isAmount
        setValues(values => ({ ...values, isAmount: !amt }));
    }

    const handleDeposit = () => {
        const dep = values.isDeposit
        setValues(values => ({ ...values, isDeposit: !dep }));
    }

    return {
        handleSubmit,
        handleChange,
        handleDropdown,
        values,
        handleMin,
        handleAmnt,
        handleDeposit
    }
}
export default useWallet