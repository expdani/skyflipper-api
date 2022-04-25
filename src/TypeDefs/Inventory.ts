import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} from "graphql";
import GraphQLJSON from "graphql-type-json";

export const InventoryType = new GraphQLObjectType({
  name: "Inventory",
  fields: () => ({
    user_id: { type: new GraphQLNonNull(GraphQLID) },
    inventory: { type: GraphQLJSON },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});
