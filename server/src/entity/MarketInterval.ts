import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Markets } from "./Markets";

@ObjectType()
@Entity()
export class MarketInterval extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne((type) => Markets)
    @JoinColumn()
    market: Markets;

    @Column("int")
    marketId: number;

    @Field()
    @Column("date")
    date_time: Date;

    @Field()
    @Column()
    interval: string;
}
