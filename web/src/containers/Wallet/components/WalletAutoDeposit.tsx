import React from "react"
import { Col, Row, Button, Form, Label } from "reactstrap"
import Select from 'react-select'
import { Checkbox } from "./../../../shared/components/Checkbox"
import useWallet from "../../../services/graphQL/Wallet/useWallet"
import useBankAccount from "../../../services/graphQL/BankAccount/useBankAccount"

interface Props {

}

export const WalletAutoDeposit: React.FC<Props> = ({ }) => {
    const { values, handleSubmit, handleChange, handleDropdown, handleMin, handleAmnt, handleDeposit } = useWallet()
    const { bankList } = useBankAccount()

    return (
        <Col md={12} xs={12}>
            <Form onSubmit={handleSubmit}>
                <Col>
                    <Row>
                        <Col>
                            <Checkbox
                                width={40}
                                height={40}
                                view="0 0 18 15"
                                label="Enable Auto Deposit"
                                selected={values.isDeposit}
                                cname="selected-checkbox-tick"
                                boxWidth={36}
                                boxHeight={36}
                                onChange={handleDeposit}
                                fontSize={22}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col style={{ marginTop: 20 }}>
                    <Row>
                        <label className="bold-text" style={{ opacity: 0.7 }}>Auto deposit is currently enabled, We will automatically pull funds
                        from your bank account any time your wallet reaches your minimum balance.
                    </label>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Col md={5}>
                            <Label className="bold-text">Minimum wallet balanace before auto deposit:</Label>
                        </Col>
                        <Col md={2}>
                            <Checkbox
                                width={18}
                                height={12}
                                view="0 0 18 12"
                                selected={values.isMinimum}
                                cname="selected-checkbox-tick-normal"
                                boxWidth={24}
                                boxHeight={24}
                                onChange={handleMin}
                                mTop={-10}
                            />
                        </Col>
                        <Col>
                            <p className="bold-text label-automatic" style={{ color: !values.isMinimum ? '#A0A0A0' : '' }}>Automatic</p>
                        </Col>
                        <Col>
                            {
                                !values.isMinimum ? (
                                    <input
                                        name="minimum_wallet_balance"
                                        className="form-control"
                                        type="text" style={{ width: 120, height: 28 }}
                                        placeholder="Balance"
                                        value={values.minimum_wallet_balance}
                                        onChange={handleChange}
                                    />
                                ) : <p className="bold-text label-deposit-values">{values.minimum_wallet_balance}</p>
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col md={5}>
                            <Label className="bold-text">Amount to auto deposit:</Label>
                        </Col>
                        <Col md={2}>
                            <Checkbox
                                width={18}
                                height={12}
                                view="0 0 18 12"
                                selected={values.isAmount}
                                cname="selected-checkbox-tick-normal"
                                boxWidth={24}
                                boxHeight={24}
                                onChange={handleAmnt}
                                mTop={-10}
                            />
                        </Col>
                        <Col>
                            <p className="bold-text label-automatic" style={{ color: !values.isAmount ? '#A0A0A0' : '' }}>Automatic</p>
                        </Col>
                        <Col>
                            {
                                !values.isAmount ? (
                                    <input
                                        name="amount_deposit"
                                        className="form-control"
                                        type="text"
                                        style={{ width: 120, height: 28 }}
                                        placeholder="Amount"
                                        value={values.amount_deposit}
                                        onChange={handleChange}
                                    />
                                ) : <p className="bold-text label-deposit-values">{values.amount_deposit}</p>
                            }
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Col md={2}>
                            <label className="bold-text" style={{ opacity: 0.7, paddingTop: 6 }}>Bank account to use: </label>
                        </Col>
                        <Col md={10} xs={12}>
                            {
                                bankList.length > 0 ? (
                                    <Select
                                        options={bankList}
                                        defaultValue={{
                                            label: values.bank_account ? values.bank_account : 'Select bank account',
                                            value: values.bank_account ? values.bank_account : ''
                                        }}
                                        onChange={handleDropdown}
                                    />
                                ) : <span className="bold-text span_no_bank_account">No bank account</span>
                            }
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row style={{ paddingTop: 10 }}>
                        <Button type="submit" color="primary" block>Save</Button>
                    </Row>
                </Col>
            </Form>
        </Col>
    )
}