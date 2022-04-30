import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import isAuthorized, { ROLES } from "../../Authentication";
import { Item } from "../../TypeDefs/Item";
import { buyItem, getItemShop, sellItem } from "./functions";

export const GET_ITEM_SHOP = {
  type: new GraphQLList(Item),
  async resolve() {
    return getItemShop();
  },
};

export const BUY_ITEM = {
  type: Item,
  args: {
    user_id: { type: GraphQLNonNull(GraphQLString) },
    item: { type: GraphQLNonNull(GraphQLString) },
    amount: { type: GraphQLInt },
  },
  async resolve(post: any, args: any, context: any) {
    const { user_id, item, amount } = args;
    if (!(await isAuthorized(ROLES.USER, context.authorization, { user_id })))
      return new Error("unauthorized");

    return buyItem(user_id, item, amount);
  },
};

export const SELL_ITEM = {
  type: Item,
  args: {
    user_id: { type: GraphQLNonNull(GraphQLString) },
    item: { type: GraphQLNonNull(GraphQLString) },
    amount: { type: GraphQLInt },
  },
  async resolve(post: any, args: any, context: any) {
    const { user_id, item, amount } = args;
    if (!(await isAuthorized(ROLES.USER, context.authorization, { user_id })))
      return new Error("unauthorized");

    return sellItem(user_id, item, amount);
  },
};
