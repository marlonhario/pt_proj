import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class AlpacaTrades extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("text")
    user_id: string;

    @Field()
    @Column("text")
    symbol: string;

    @Field()
    @Column("int")
    qty: number;

    @Field()
    @Column("text")
    side: string;

    @Field()
    @Column("text")
    time_in_force: string;

    @Field()
    @Column("date", { nullable: true })
    date_added: Date;
}
