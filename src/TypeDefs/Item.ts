import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLFloat,
} from "graphql";

export const Item = new GraphQLObjectType({
  name: "Item",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    emoji: { type: GraphQLString },
    price: { type: GraphQLFloat },
    shop: { type: GraphQLNonNull(GraphQLBoolean) },
  }),
});
