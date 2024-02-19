import { InputType, Field } from "type-graphql";

@InputType()
export class PaperTradingInput {
    @Field()
    token: string
}
