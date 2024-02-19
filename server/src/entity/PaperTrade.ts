import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class PaperTrade extends BaseEntity {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column("int")
  strategy_id: Number;

  @Field(() => Int)
  @Column("int")
  market_id: Number;

  @Field(() => String)
  @Column("text")
  symbol: String;

  @Field(() => Number)
  @Column("float8")
  price: Number;

  @Field(() => Number)
  @Column("float8")
  trade_amount: Number;

  @Field(() => Number)
  @Column("float8")
  stop_loss: Number;

  @Field(() => Number)
  @Column("float8")
  take_profit: Number;

  @Field(() => Number)
  @Column("float8")
  profit: Number;

  @Field(() => Number)
  @Column("float8")
  balance: Number;

  @Field()
  @Column("date")
  date_time: Date;

  @Field()
  @Column("int")
  open: Number;

  @Field()
  @Column("int")
  high: Number;

  @Field()
  @Column("int")
  low: Number;

  @Field()
  @Column("int")
  close: Number;

  @Field()
  @Column("int")
  volume: Number;

  @Field()
  @Column("text")
  trade_type: string;
}
