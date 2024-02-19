import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { getConnection, getRepository } from "typeorm";
import plaid from "plaid";
import { Users } from "../entity/Users";
import { BankAccounts } from "./../entity/BankAccounts";
import { WalletTransactions } from "./../entity/WalletTransactions";
import { verify } from "jsonwebtoken";
import { BankAccountResponse } from "../types/response/bank_account_response";
import { BankAccountInput } from "../types/inputs/bank_account_input";
const { SocketLabsClient } = require("@socketlabs/email");

const {
    PLAID_CLIENT_ID,
    PLAID_SECRET,
    PLAID_ENV,
    PLAID_CLIENT_NAME,
    PLAID_PRODUCTS,
    PLAID_COUNTRY_CODES,
    PLAID_LANGUAGE,
    PLAID_WEBHOOK,
    ACCESS_TOKEN_SECRET,
    SOCKETLABS_SERVER_ID,
    SOCKETLABS_API_KEY,
    EMAIL_FROM,
} = process.env;

let response = {
    data: null,
    error: null,
    status_code: 400,
};

const client = new plaid.Client({
    clientID: PLAID_CLIENT_ID,
    secret: PLAID_SECRET,
    env: plaid.environments[PLAID_ENV],
    options: { version: "2019-05-29" },
});

@Resolver()
export class BankAccountResolver {
    @Query(() => String)
    async plaidLink() {
        try {
            const plaidResponse = await client.createLinkToken({
                user: {
                    client_user_id: PLAID_CLIENT_ID,
                },
                client_name: PLAID_CLIENT_NAME,
                products: [PLAID_PRODUCTS],
                country_codes: [PLAID_COUNTRY_CODES],
                language: PLAID_LANGUAGE,
                webhook: PLAID_WEBHOOK,
            });

            response.data = plaidResponse;
            response.status_code = 200;
        } catch (err) {
            response.status_code = 400;
            response.error = err;
        }

        return JSON.stringify(response);
    }

    @Mutation(() => String)
    async plaidAccounts(@Arg("token") token: string) {
        try {
            const decoded: any = verify(token, ACCESS_TOKEN_SECRET!);
            const accounts = await BankAccounts.find({
                where: { user_id: decoded.userId, active: true },
            });

            response.status_code = 200;
            response.data = accounts;
        } catch (err) {
            response.error = err;
            response.status_code = 400;
        }

        return JSON.stringify(response);
    }

    @Mutation(() => String)
    async plaidCreateAccount(
        @Arg("token") token: string,
        @Arg("accountId") accountId: string,
        @Arg("accountName") accountName: string,
        @Arg("institution") institution: string,
        @Arg("accountNumber") accountNumber: string,
        @Arg("institutionId") institutionId: string,
        @Arg("InstitutionLogo") InstitutionLogo: string
    ) {
        const { userId }: any = verify(token, ACCESS_TOKEN_SECRET!);
        const { email } = await Users.findOne(userId);

        const ifExist = await getRepository(BankAccounts)
            .createQueryBuilder()
            .where("name = :name", { name: accountName })
            .andWhere("institution = :institution", { institution })
            .andWhere("active = :active", { active: false })
            .getOne();

        if (ifExist) {
            await getConnection()
                .createQueryBuilder()
                .update(BankAccounts)
                .set({
                    active: true,
                })
                .andWhere("name = :name", { name: accountName })
                .andWhere("institution = :institution", { institution })
                .execute();

            response.status_code = 200;
            response.data = email;
        } else {
            try {
                await BankAccounts.find({
                    where: {
                        name: accountName,
                        institution,
                        active: true,
                    },
                }).then(
                    async (res: any) => {
                        if (res.length) {
                            response.status_code = 400;
                            response.error = "This account already exist, please select another one.";
                        } else {
                            await BankAccounts.insert({
                                user_id: userId,
                                account_id: accountId,
                                name: accountName,
                                institution,
                                account_number: accountNumber,
                                ins_id: institutionId,
                                ins_logo: InstitutionLogo,
                                date_added: new Date(),
                            })
                                .then((result) => {
                                    if (result) {
                                        response.status_code = 200;
                                        response.data = email;
                                    }
                                })
                                .catch((err) => {
                                    response.error = err;
                                });
                        }
                    },
                    (err: any) => {
                        response.status_code = 400;
                        response.error = err;
                    }
                );
            } catch (err) {
                response.status_code = 400;
                response.error = err;
            }
        }

        return JSON.stringify(response);
    }

    @Mutation(() => String)
    async plaidAccess(@Arg("plaidToken") plaidToken: string) {
        try {
            const { access_token } = await client.exchangePublicToken(plaidToken);
            const { accounts } = await client.getIdentity(access_token);
            const { numbers } = await client.getAuth(access_token);

            response.data = {
                accessPlaid: access_token,
                accounts: numbers.ach,
                name: accounts[0].owners[0].names[0],
            };

            response.status_code = 200;
        } catch (err) {
            response.status_code = 400;
            response.error = err;
        }

        return JSON.stringify(response);
    }

    @Mutation(() => String)
    async plaidMail(@Arg("mailContent") mailContent: string, @Arg("token") token: string) {
        try {
            const { userId }: any = verify(token, ACCESS_TOKEN_SECRET!);
            const { email } = await Users.findOne(userId);

            const socketLabClient = new SocketLabsClient(Number(SOCKETLABS_SERVER_ID), String(SOCKETLABS_API_KEY));

            const message = {
                to: email,
                from: EMAIL_FROM,
                subject: "Hello from Prosper Together",
                htmlBody: `<html>${mailContent}</html>`,
                messageType: "basic",
            };

            await socketLabClient.send(message).then(
                (res: any) => {
                    response.status_code = 200;
                    response.data = res;
                },
                (err: any) => {
                    response.status_code = 400;
                    response.error = err;
                }
            );
        } catch (err) {
            response.status_code = 400;
            response.error = err;
        }

        return JSON.stringify(response);
    }

    @Mutation(() => BankAccountResponse)
    async getBankAccountList(@Arg("data") data: BankAccountInput): Promise<BankAccountResponse> {
        const { token } = data;
        const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        const user = await Users.findOne(payload.userId);

        if (!user) {
            return {
                errors: [
                    {
                        field: "id",
                        message: "User doesn't exist!",
                    },
                ],
            };
        }

        const banks = await BankAccounts.find({ user_id: user.id, active: true });

        if (!banks) {
            return {
                errors: [
                    {
                        field: "user_id",
                        message: "User doesn't have bank account!",
                    },
                ],
            };
        }

        return {
            bank: banks,
        };
    }

    @Query(() => String)
    async getTransactions() {
        try {
            response.data = await getRepository(WalletTransactions).createQueryBuilder().orderBy("date", "DESC").getMany();

            response.status_code = 200;
        } catch (err) {
            response.error = err;
            response.status_code = 400;
        }

        return JSON.stringify(response);
    }

    @Mutation(() => String)
    async plaiInstitutionIcon(@Arg("insId") insId: string) {
        try {
            const data = await client.getInstitutionById(insId, { include_optional_metadata: true });

            response.data = data.institution;
        } catch (err) {
            response.status_code = 400;
            response.error = err;
        }

        return JSON.stringify(response);
    }

    @Mutation(() => String)
    async plaidAccountRemove(@Arg("id") id: number) {
        try {
            response.data = await getConnection()
                .createQueryBuilder()
                .update(BankAccounts)
                .set({
                    active: false,
                })
                .where("id = :id", { id })
                .execute();

            response.status_code = 200;
        } catch (err) {
            response.status_code = 400;
            response.error = err;
        }

        return JSON.stringify(response);
    }

    @Mutation(() => String)
    async plaidNicknameUpdate(@Arg("id") id: number, @Arg("value") value: string) {
        try {
            response.data = await getConnection()
                .createQueryBuilder()
                .update(BankAccounts)
                .set({
                    nickname: value,
                })
                .where("id = :id", { id })
                .execute();
            response.status_code = 200;
        } catch (err) {
            response.status_code = 400;
            response.error = err;
        }

        return JSON.stringify(response);
    }
}
