import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class Markets extends BaseEntity {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  name: string;

  @Field({ nullable: true })
  @Column("text")
  symbol: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  equity?: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  timezone: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  type: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  region: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  exchange?: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  marketOpen: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  marketClose: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  matchScore: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  currency?: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  period: string;

  @Field({ nullable: true })
  @Column("timestamp", { nullable: true })
  first_data?: Date;

  @Field({ nullable: true })
  @Column("timestamp", { nullable: true })
  last_data?: Date;

  @Field({ nullable: true })
  @Column("int", { nullable: true })
  number_data_records?: number;

  @Field({ nullable: true })
  @Column("date", { nullable: true })
  data_last_downloaded?: Date;

  @Field(() => Boolean, { nullable: true })
  @Column({ nullable: true })
  have_data: Boolean;
}
