import { Entity, PrimaryColumn, Column, BaseEntity, CreateDateColumn, OneToMany } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Strategies } from "./Strategies";

@ObjectType()
@Entity()
export class PaperTrading extends BaseEntity {
    @Field()
    @PrimaryColumn("uuid")
    id: string;

    @Field()
    @Column("int", { nullable: true })
    user_id: number;

    @Field({ nullable: true })
    @Column("float", { nullable: true })
    cumul_return: number;

    @Field((type) => Strategies)
    @OneToMany(() => Strategies, (strategies) => strategies.paper_trading, {})
    strategies: Strategies[];

    @Field(() => String)
    @CreateDateColumn()
    created_at: Date;

    @Field(() => Boolean)
    @Column("boolean", { nullable: true, default: false })
    read_only: boolean;

    @Field(() => Boolean)
    @Column("boolean", { nullable: true, default: false })
    live: boolean;
}
