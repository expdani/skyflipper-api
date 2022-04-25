import { GraphQLNonNull, GraphQLString } from "graphql";
import isAuthorized, { ROLES } from "../../Authentication";

import { SettingsType } from "../../TypeDefs/Settings";
import { getServerSettings, updateServerSettings } from "./functions";

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
