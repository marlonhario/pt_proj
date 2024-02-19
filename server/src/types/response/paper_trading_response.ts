import { ObjectType, Field } from "type-graphql"
import { PaperTrading } from './../../entity/PaperTrading';
import { FieldError } from "../error/error"

@ObjectType()
export class PaperTradingResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]

    @Field(() => PaperTrading, { nullable: true })
    paper_trading?: PaperTrading[]
}