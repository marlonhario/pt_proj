import { Entity, PrimaryColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Baskets } from "./Baskets";
import { PaperTrading } from "./PaperTrading";

import GraphQLJSON from "graphql-type-json";

@ObjectType()
@Entity()
export class Strategies extends BaseEntity {
    @Field()
    @PrimaryColumn("uuid")
    id: string;

    @Field()
    @ManyToOne(() => Baskets, (baskets: Baskets) => baskets.strategies, {
        cascade: true,
        eager: true,
    })
    @JoinColumn({ name: "basket_id" })
    baskets: Baskets;

    @Field()
    @Column("int", { nullable: true })
    created_by_user_id: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    original_created_date: Date;

    @Field({ nullable: true })
    @Column("text", { nullable: true })
    trade_list_json: string;

    @Field((type) => GraphQLJSON, { nullable: true })
    @Column("json", { nullable: true })
    editor_json?: JSON;

    @Field({ nullable: true })
    @Column("int", { nullable: true })
    average_hpr: number;

    @Field({ nullable: true })
    @Column("int", { nullable: true })
    average_position_length: number;

    @Field({ nullable: true })
    @Column("int", { nullable: true })
    backtest_quality_percent: number;

    @Field({ nullable: true })
    @Column("int", { nullable: true })
    balance_line_stability: number;

    @Field({ nullable: true })
    @Column("int", { nullable: true })
    bars_in_trade_number: number;

    @Field({ nullable: true })
    @Column("int", { nullable: true })
    bars_in_trade_percent: number;

    @Field({ nullable: true })
    @Column("int", { nullable: true })
    count_of_trades: number;

    @Field({ nullable: true })
    @Column("int", { nullable: true })
    max_consecutive_losses: number;

    @Field({ nullable: true })
    @Column("decimal", { nullable: true })
    max_drawdown_number: number;

    @Field({ nullable: true })
    @Column("int", { nullable: true })
    max_drawdown_percent: number;

    @Field({ nullable: true })
    @Column("int", { nullable: true })
    months_of_profit: number;

    @Field({ nullable: true })
    @Column("int", { nullable: true })
    net_balance: number;

    @Field({ nullable: true })
    @Column("decimal", { nullable: true })
    net_profit: number;

    @Field({ nullable: true })
    @Column("int", { nullable: true })
    profit_factor: number;

    @Field({ nullable: true })
    @Column("decimal", { nullable: true })
    profit_per_day: number;

    @Field({ nullable: true })
    @Column("int", { nullable: true })
    r_squared: number;

    @Field({ nullable: true })
    @Column("decimal", { nullable: true })
    return_drawdown: number;

    @Field({ nullable: true })
    @Column("int", { nullable: true })
    sharpe_ratio: number;

    @Field({ nullable: true })
    @Column("int", { nullable: true })
    max_stagnation_number: number;

    @Field({ nullable: true })
    @Column("int", { nullable: true })
    max_stagnation_percent: number;

    @Field({ nullable: true })
    @Column("int", { nullable: true })
    system_quality_number: number;

    @Field({ nullable: true })
    @Column("int", { nullable: true })
    win_loss: number;

    @Field((type) => PaperTrading)
    @ManyToOne(() => PaperTrading, (paper_trading) => paper_trading.strategies)
    @JoinColumn({ name: "paper_trading_id" })
    paper_trading: PaperTrading;

    @Field(() => Boolean)
    @Column("boolean", { default: false })
    is_deleted: boolean;

    @Field({ nullable: true })
    @Column({ nullable: true })
    deleted_at: Date;

    @Field({ nullable: true })
    @Column("int", { nullable: true })
    source: number;

    @Field({ nullable: true })
    @Column("int", { nullable: true })
    source_parent: number;

    @Field({ nullable: true })
    @Column("int", { nullable: true, default: null })
    order: number;

    @Field({ nullable: true })
    @Column("int", { nullable: true, default: null })
    group: number;

    @Field({ nullable: true })
    @Column("int", { nullable: true, default: null })
    group_order: number;

    @Field({ nullable: true })
    @Column("varchar", { nullable: true, default: null })
    group_name: String;
}
