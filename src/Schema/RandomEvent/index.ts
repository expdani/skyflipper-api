import { GraphQLInt, GraphQLNonNull } from "graphql";
import isAuthorized, { ROLES } from "../../Authentication";
import { RandomEventType } from "../../TypeDefs/RandomEvent";
import { getRandomMessageEvent } from "./functions";

export const GET_RANDOM_MESSAGE_EVENT = {
  type: RandomEventType,
  //   args: {},
  async resolve(parent: any, args: any, context: any) {
    if (!(await isAuthorized(ROLES.ADMIN, context.authorization, {})))
      return new Error("unauthorized");

    return getRandomMessageEvent();
  },
};

// export const GET_EVENT_BY_ID = {
//   type: RandomEventType,
//   args: {
//     id: { type: GraphQLNonNull(GraphQLInt) },
//   },
//   async resolve(parent: any, args: any, context: any) {
//     if (!(await isAuthorized(ROLES.ADMIN, context.authorization, {})))
//       return new Error("unauthorized");
//   },
// };
