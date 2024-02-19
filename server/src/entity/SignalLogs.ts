import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

interface Keyable {
  [key: string]: any;
}

@ObjectType()
@Entity()
export class SignalLogs extends BaseEntity {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => [[String]])
  @Column("jsonb", { nullable: true })
  signal_logs: Keyable[];
}
