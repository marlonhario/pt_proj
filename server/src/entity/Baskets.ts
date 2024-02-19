import { Entity, Column, BaseEntity, OneToMany, PrimaryColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Strategies } from "./Strategies";

@ObjectType()
@Entity()
export class Baskets extends BaseEntity {
    @Field()
    @PrimaryColumn("uuid")
    basket_id: string;

    @Field()
    @Column("int", { nullable: true })
    user_id: number;

    @Field((type) => Strategies)
    @OneToMany(() => Strategies, (strategies) => strategies.baskets, {})
    strategies: Strategies[];

    @Field()
    @Column({ nullable: true })
    added_date: Date;

    @Field(() => Boolean)
    @Column("boolean", { nullable: true, default: false })
    read_only: boolean;

    @Field(() => Boolean)
    @Column("boolean", { nullable: true, default: false })
    live: boolean;
}
