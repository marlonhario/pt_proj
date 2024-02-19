import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class WalletTransactions extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("text")
    account_id: string;

    @Field()
    @Column("date", { nullable: true })
    date: Date;

    @Field()
    @Column("text")
    name: string;

    @Field()
    @Column("text")
    amount: string;

    @Field()
    @Column("text")
    transaction_type: string;

    @Field()
    @Column("text", { nullable: true })
    balance: string;

    @Field()
    @Column("text")
    currency_code: string;
}
