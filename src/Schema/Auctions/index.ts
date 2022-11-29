import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import isAuthorized, { ROLES } from "../../Authentication";
import { AuctionType } from "../../TypeDefs/Auction";
import { MessageType } from "../../TypeDefs/Messages";
import { bulkAddBins, getAuctions, getBins } from "./functions";

export const GET_BINS = {
  type: new GraphQLList(AuctionType),
  args: {
    amount: { type: GraphQLInt },
  },
  async resolve(parent: any, args: any, context: any) {
    const { amount } = args;

    if (!(await isAuthorized(ROLES.ADMIN, context.authorization, {})))
      return new Error("unauthorized");

    return await getBins(amount);
  },
};

export const GET_AUCTIONS = {
  type: new GraphQLList(AuctionType),
  args: {
    amount: { type: GraphQLInt },
  },
  async resolve(parent: any, args: any, context: any) {
    const { amount } = args;

    if (!(await isAuthorized(ROLES.ADMIN, context.authorization, {})))
      return new Error("unauthorized");

    return await getAuctions(amount);
  },
};

export const BULK_AUCTIONS = {
  type: MessageType,
  args: {
    type: { type: GraphQLNonNull(GraphQLString) },
    auctions: { type: GraphQLNonNull(GraphQLJSON) },
  },
  async resolve(parent: any, args: any) {
    const { type, auctions } = args;

    bulkAddBins(auctions);
  },
};
