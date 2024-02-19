import { useCallback, useEffect, useState } from "react"
import { getAccessToken } from "../../../accessToken"
import { useGetBankAccountListMutation } from "../../../generated/graphql"

const useBankAccount = () => {
    const token = getAccessToken()
    const [getBankAccountList] = useGetBankAccountListMutation()

    const [bankAccountList, setBankAccountList] = useState([])

    const getBankList = useCallback(async () => {
        try {
            const response = await getBankAccountList({
                variables: {
                    data: { token }
                }
            })

            if (response && response.data) {
                const tempData = []
                const dt = response.data.getBankAccountList.bank
                dt.map((item) => {
                    tempData.push({
                        label: item.name,
                        name: item.name
                    })
                })
                setBankAccountList(tempData)
            }
        } catch (err) {
            console.log(err)
        }
    }, [])

    useEffect(() => {
        getBankList()
    }, [getBankList])

    return {
        bankList: bankAccountList
    }
}

export default useBankAccount