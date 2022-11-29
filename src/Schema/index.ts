import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { BULK_AUCTIONS, GET_AUCTIONS, GET_BINS } from "./Auctions";
import { ADD_CURRENCY, GET_CURRENCY } from "./Currency";
import {
  DISCORD_API_LOGIN,
  GET_USER_DISCORD_DATA,
  GET_USER_OWNER_SERVERS,
  USER_LOGOUT,
} from "./Discord";

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    getActiveBins: GET_BINS,
    getActiveAuctions: GET_AUCTIONS,
    getCurrency: GET_CURRENCY,
    getUserDiscordServers: GET_USER_OWNER_SERVERS,
    getUserDiscordData: GET_USER_DISCORD_DATA,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCurrency: ADD_CURRENCY,
    discordLogin: DISCORD_API_LOGIN,
    userLogout: USER_LOGOUT,
    bulkAuctions: BULK_AUCTIONS,
  },
});

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
