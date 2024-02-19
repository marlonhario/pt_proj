import { InputType, Field } from "type-graphql";

@InputType()
export class AutoDepositInput {
    @Field()
    token: string
}

@InputType()
export class SaveDepositInput {
    @Field()
    token: string

    @Field({ nullable: true })
    minimum_wallet_balance?: number

    @Field({ nullable: true })
    amount_deposit?: number

    @Field({ nullable: true })
    bank_account?: string

    @Field({ nullable: true })
    created_date?: Date

    @Field({ nullable: true })
    is_auto: Boolean

    @Field({ nullable: true })
    is_min_automatic: Boolean

    @Field({ nullable: true })
    is_amt_automatic: Boolean
}