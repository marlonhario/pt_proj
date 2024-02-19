import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class Users extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("text", { nullable: true })
    email: string;

    @Column("text", { nullable: true })
    password: string;

    @Field(() => Boolean)
    @Column("boolean", { default: false })
    admin: boolean;

    @Column("int", { default: 0 })
    tokenVersion: number;

    @Field({ nullable: true })
    @Column("text", { nullable: true })
    first_name: string;

    @Field({ nullable: true })
    @Column("text", { nullable: true })
    last_name: string;

    @Field({ nullable: true })
    @Column("text", { nullable: true })
    profile_image: string;

    @Field({ nullable: true })
    @Column("text", { nullable: true })
    time_zone: string;
}
