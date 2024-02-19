import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class BankAccounts extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("int")
    user_id: number;

    @Column("text")
    account_id: string;

    @Field()
    @Column("text")
    name: string;

    @Column("text", { nullable: true })
    institution: string;

    @Column("text", { nullable: true, default: null })
    nickname: string;

    @Column("text", { nullable: true })
    account_number: string;

    @Column("text", { nullable: true })
    ins_id: string;

    @Column("text", { nullable: true })
    ins_logo: string;

    @Column("date", { nullable: true })
    date_added: Date;

    @Column("boolean", { default: true })
    active: boolean;
}
