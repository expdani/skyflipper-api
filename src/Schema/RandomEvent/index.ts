import { GraphQLNonNull, GraphQLString } from "graphql";
import isAuthorized, { ROLES } from "../../Authentication";
import { SettingsType } from "../../TypeDefs/Settings";

export const GET_RANDOM_EVENT = {
  type: SettingsType,
  //   args: {},
  async resolve(parent: any, args: any, context: any) {
    if (!(await isAuthorized(ROLES.ADMIN, context.authorization, {})))
      return new Error("unauthorized");
  },
};
