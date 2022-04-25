import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
} from "graphql";

export const SettingsType = new GraphQLObjectType({
  name: "Settings",
  fields: () => ({
    server_id: { type: GraphQLNonNull(GraphQLString) },
    karma: { type: GraphQLBoolean },
    karma_reactions: { type: GraphQLBoolean },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});
