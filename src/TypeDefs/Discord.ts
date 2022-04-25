import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";

export const DiscordType = new GraphQLObjectType({
  name: "Discord",
  fields: () => ({
    code: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
