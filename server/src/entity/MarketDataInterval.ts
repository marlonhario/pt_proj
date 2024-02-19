import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class MarketDataInterval extends BaseEntity {
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

    @Field({ nullable: true })
    @Column("timestamp", { nullable: true })
    first_data?: Date;

    @Field()
    @Column("timestamp", { nullable: true })
    last_update: Date;

    @Field({ nullable: true })
    @Column("int", { nullable: true })
    number_data_records?: number;
}
