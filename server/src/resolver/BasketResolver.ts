import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { v4 as uuidv4 } from 'uuid';
import { Baskets } from "./../entity/Baskets";

@Resolver()
export class BasketResolver {
  @Query(() => String)
  basketTest() {
    return "Basket resolver!";
  }

  @Query(() => [Baskets])
  async baskets() {
    return Baskets.find();
  }

  @Mutation(() => Baskets)
  async saveBaskets(
    @Arg('user_id') user_id: number
  ) {

    const rs = await Baskets.create({
      basket_id: uuidv4(),
      user_id: user_id,
      added_date: new Date(),
      read_only: true,
      live: true
    }).save();

    return rs;
  }
}
