import { InputType, Field } from "type-graphql";

@InputType()
export class BankAccountInput {
    @Field()
    token: string
}