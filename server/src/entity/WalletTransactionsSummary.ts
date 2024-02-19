import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class WalletTransactionsSummary extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("date", { nullable: true })
    date: Date;

    @Field()
    @Column("text")
    debit: string;

    @Field()
    @Column("text")
    credit: string;

    @Field()
    @Column("text", { nullable: true })
    balance: string;

    @Field()
    @Column("text")
    currency_code: string;
}
