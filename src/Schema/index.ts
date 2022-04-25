import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { ADD_CURRENCY, GET_CURRENCY } from "./Currency";
import { DISCORD_API_LOGIN, GET_USER_OWNER_SERVERS } from "./Discord";
import { CREATE_KARMA_POST, DELETE_KARMA_POST } from "./KarmaPost";
import {
  ADD_KARMA,
  GET_SERVER_KARMA_LEADERBOARD,
  GET_USER_KARMA,
} from "./KarmaTotal";
import { GET_SERVER_SETTINGS, UPDATE_SERVER_SETTINGS } from "./Settings";

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    getCurrency: GET_CURRENCY,
    getServerLeaderboard: GET_SERVER_KARMA_LEADERBOARD,
    getUserKarma: GET_USER_KARMA,
    getUserDiscordServers: GET_USER_OWNER_SERVERS,
    getServerSettings: GET_SERVER_SETTINGS,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createKarmaPost: CREATE_KARMA_POST,
    deleteKarmaPost: DELETE_KARMA_POST,
    addCurrency: ADD_CURRENCY,
    addKarma: ADD_KARMA,
    discordLogin: DISCORD_API_LOGIN,
    updateServerSettings: UPDATE_SERVER_SETTINGS,
  },
});

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
