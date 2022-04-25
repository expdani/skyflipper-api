import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from "graphql";

export const DiscordServer = new GraphQLObjectType({
  name: "DiscordServer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    icon: { type: GraphQLString },
    owner: { type: GraphQLBoolean },
    permissions: { type: GraphQLString },
    features: { type: GraphQLString },
  }),
});
