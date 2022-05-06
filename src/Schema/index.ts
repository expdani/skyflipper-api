import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { ADD_CURRENCY, DEPOSIT, GET_CURRENCY, WITHDRAW } from "./Currency";
import { DISCORD_API_LOGIN, GET_USER_OWNER_SERVERS } from "./Discord";
import { ADD_ITEM_TO_INVENTORY, GET_INVENTORY } from "./Inventory";
import { BUY_ITEM, GET_ITEMS, GET_ITEM_SHOP, SELL_ITEM } from "./Item";
import { CREATE_KARMA_POST, DELETE_KARMA_POST } from "./KarmaPost";
import {
  ADD_KARMA,
  GET_SERVER_KARMA_LEADERBOARD,
  GET_USER_KARMA,
} from "./KarmaTotal";
import { GET_RANDOM_MESSAGE_EVENT } from "./RandomEvent";
import {
  GET_BOT_SETTINGS,
  GET_SERVER_SETTINGS,
  UPDATE_SERVER_SETTINGS,
} from "./Settings";

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    getCurrency: GET_CURRENCY,
    getServerLeaderboard: GET_SERVER_KARMA_LEADERBOARD,
    getUserKarma: GET_USER_KARMA,
    getUserDiscordServers: GET_USER_OWNER_SERVERS,
    getServerSettings: GET_SERVER_SETTINGS,
    getInventory: GET_INVENTORY,
    getItemShop: GET_ITEM_SHOP,
    getItems: GET_ITEMS,
    getRandomMessageEvent: GET_RANDOM_MESSAGE_EVENT,
    getBotSettings: GET_BOT_SETTINGS,
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
    deposit: DEPOSIT,
    withdraw: WITHDRAW,
    addItemToInventory: ADD_ITEM_TO_INVENTORY,
    buyItem: BUY_ITEM,
    sellItem: SELL_ITEM,
  },
});

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
