import { GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import isAuthorized, { ROLES } from "../../Authentication";
import { InventoryType } from "../../TypeDefs/Inventory";
import { addItemToInventory, getInventory } from "./functions";

export const GET_INVENTORY = {
  type: InventoryType,
  args: {
    user_id: { type: GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: any, context: any) {
    const { user_id } = args;
    if (!(await isAuthorized(ROLES.USER, context.authorization, { user_id })))
      return new Error("unauthorized");

    return getInventory(user_id);
  },
};

export const ADD_ITEM_TO_INVENTORY = {
  type: InventoryType,
  args: {
    user_id: { type: GraphQLNonNull(GraphQLString) },
    item: { type: GraphQLNonNull(GraphQLString) },
    amount: { type: GraphQLInt },
  },
  async resolve(parent: any, args: any, context: any) {
    const { user_id, item, amount } = args;
    if (!(await isAuthorized(ROLES.ADMIN, context.authorization, {})))
      return new Error("unauthorized");

    return addItemToInventory(user_id, item, amount);
  },
};
