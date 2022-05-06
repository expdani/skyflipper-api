import { GraphQLNonNull, GraphQLString } from "graphql";
import isAuthorized, { ROLES } from "../../Authentication";
import { BotSettingsType } from "../../TypeDefs/GlobalSettings";
import { SettingsType } from "../../TypeDefs/Settings";
import {
  getBotSettings,
  getServerSettings,
  updateServerSettings,
} from "./functions";

export const GET_SERVER_SETTINGS = {
  type: SettingsType,
  args: {
    server_id: { type: GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: any, context: any) {
    const { server_id } = args;
    if (!(await isAuthorized(ROLES.USER, context.authorization, { server_id })))
      return new Error("unauthorized");

    return getServerSettings(server_id);
  },
};

export const UPDATE_SERVER_SETTINGS = {
  type: SettingsType,
  args: {
    server_id: { type: GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: any, context: any) {
    const { server_id } = args;
    if (!(await isAuthorized(ROLES.USER, context.authorization, { server_id })))
      return new Error("unauthorized");

    return updateServerSettings(server_id);
  },
};

export const GET_BOT_SETTINGS = {
  type: BotSettingsType,
  args: {},
  async resolve(parent: any, args: any, context: any) {
    if (!(await isAuthorized(ROLES.ADMIN, context.authorization, {})))
      return new Error("unauthorized");

    return getBotSettings();
  },
};
