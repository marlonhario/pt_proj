import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class Broker extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("text")
    exchange: string;

    @Field()
    @Column("text")
    price: string;

    @Field()
    @Column("text")
    size: string;

    @Field()
    @Column("text")
    auth_id: string;

    @Field()
    @Column("text")
    auth_client_id: string;

    @Field()
    @Column("text")
    auth_owner_id: string;

    @Field()
    @Column("text")
    timestamp: string;
}
