import { Resolver, Query, Mutation, Arg, ObjectType, Field } from "type-graphql";
import { AutoDeposits } from "./../entity/AutoDeposits";
import { AutoDepositInput, SaveDepositInput } from "../types/inputs/auto_deposits_input";
import { verify } from "jsonwebtoken";
import { Users } from "../entity/Users";
import { FieldError } from "../types/error/error";
import moment from "moment";

@ObjectType()
class DepositResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => AutoDeposits, { nullable: true })
    deposit?: AutoDeposits;
}

@Resolver()
export class AutoDepositResolver {
    @Query(() => String)
    autoDepositTest() {
        return "Auto Deposit resolver!";
    }

    @Query(() => [AutoDeposits])
    async autoDeposits() {
        return AutoDeposits.find();
    }

    @Mutation(() => DepositResponse)
    async getDepositsById(@Arg("data") data: AutoDepositInput): Promise<DepositResponse> {
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

        const deposit = await AutoDeposits.findOne({ user_id: user.id });

        if (!deposit) {
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
            deposit,
        };
    }

    @Mutation(() => DepositResponse)
    async saveDeposit(@Arg("data") data: SaveDepositInput): Promise<DepositResponse> {
        const { token, minimum_wallet_balance, amount_deposit, bank_account } = data;

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

        let deposit = await AutoDeposits.findOne({ user_id: user.id });

        if (deposit) {
            data.created_date = moment().toDate();
            Object.assign(deposit, data);
        } else {
            deposit = new AutoDeposits();
            deposit.user_id = user.id;
            deposit.minimum_wallet_balance = minimum_wallet_balance;
            deposit.amount_deposit = amount_deposit;
            deposit.bank_account = bank_account;
            deposit.created_date = moment().toDate();
        }

        let response = await deposit.save();

        if (!response) {
            return {
                errors: [
                    {
                        field: "",
                        message: "Error upon saving!",
                    },
                ],
            };
        }

        return {
            deposit,
        };
    }
}
