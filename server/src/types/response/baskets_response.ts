import { ObjectType, Field } from "type-graphql"
import { Baskets } from './../../entity/Baskets';
import { FieldError } from "../error/error"

@ObjectType()
export class BasketsResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]

    @Field(() => Baskets, { nullable: true })
    baskets?: Baskets
}