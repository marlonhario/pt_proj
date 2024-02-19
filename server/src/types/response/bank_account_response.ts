import { ObjectType, Field } from "type-graphql"
import { BankAccounts } from './../../entity/BankAccounts';
import { FieldError } from "../error/error"

@ObjectType()
export class BankAccountResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]

    @Field(() => BankAccounts, { nullable: true })
    bank?: BankAccounts[]
}