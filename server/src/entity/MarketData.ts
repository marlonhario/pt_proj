import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class MarketData extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("text")
    interval?: String;

    @Field()
    @Column("int")
    marketId: number;

    @Field()
    @Column("text")
    symbol: String;

    @Field()
    @CreateDateColumn({
        type: "timestamp",
    })
    date_created: Date;

    @Field()
    @Column("timestamp")
    last_update: Date;

    @Field()
    @Column("float")
    open: number;

    @Field()
    @Column("float")
    high: number;

    @Field()
    @Column("float")
    low: number;

    @Field()
    @Column("float")
    close: number;

    @Field()
    @Column("float")
    volume: number;
}
