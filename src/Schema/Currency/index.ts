import { GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import isAuthorized, { ROLES } from "../../Authentication";
import { CurrencyEnumType, CurrencyType } from "../../TypeDefs/Currency";
import { addToBank, addToWallet, getUserCurrency } from "./functions";

export enum CURRENCY_TYPE {
  WALLET = "wallet",
  BANK = "bank",
}

export const ADD_CURRENCY = {
  type: CurrencyType,
  args: {
    user_id: { type: GraphQLNonNull(GraphQLString) },
    type: { type: GraphQLNonNull(CurrencyEnumType) },
    amount: { type: GraphQLNonNull(GraphQLInt) },
  },
  async resolve(parent: any, args: any, context: any) {
    const { user_id, type, amount } = args;
    if (!(await isAuthorized(ROLES.ADMIN, context.authorization, { user_id })))
      return new Error("unauthorized");

    if (type === CURRENCY_TYPE.WALLET) return addToWallet(user_id, amount);
    else return addToBank(user_id, amount);
  },
};

export const GET_CURRENCY = {
  type: CurrencyType,
  args: {
    user_id: { type: GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: any, context: any) {
    const { user_id } = args;

    if (!(await isAuthorized(ROLES.USER, context.authorization, { user_id })))
      return new Error("unauthorized");
    return await getUserCurrency(user_id);
  },
};
