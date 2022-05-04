import {
  GraphQLEnumType,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import GraphQLJSON from "graphql-type-json";

const EventType = new GraphQLEnumType({
  name: "EventType",
  values: {
    REPLY: {
      value: "reply",
    },
  },
});

export const RandomEventType = new GraphQLObjectType({
  name: "RandomEvent",
  fields: () => ({
    id: { type: GraphQLInt },
    type: { type: GraphQLString },
    name: { type: GraphQLString },
    text: { type: GraphQLString },
    successText: { type: GraphQLString },
    failText: { type: GraphQLString },
    rewards: { type: GraphQLJSON },
    timeLimit: { type: GraphQLInt },
    rarity: { type: GraphQLInt },
  }),
});
