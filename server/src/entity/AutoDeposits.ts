import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class AutoDeposits extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("int", { nullable: true })
    user_id: number;

    @Field()
    @Column("float", { nullable: true })
    minimum_wallet_balance: number;

    @Field()
    @Column("float", { nullable: true })
    amount_deposit: number;

    @Field()
    @Column("text", { nullable: true })
    bank_account: string;

    @Field(() => Boolean)
    @Column("boolean", { default: false })
    is_auto: boolean;

    @Field(() => Boolean)
    @Column("boolean", { default: false })
    is_min_automatic: boolean;

    @Field(() => Boolean)
    @Column("boolean", { default: false })
    is_amt_automatic: boolean;

    @Field()
    @Column({ nullable: true })
    created_date: Date;
}
