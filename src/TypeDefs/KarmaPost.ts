import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import VoteEnumType from "./Vote";

export const KarmaPostType = new GraphQLObjectType({
  name: "KarmaPost",
  fields: () => ({
    user_id: { type: GraphQLNonNull(GraphQLString) },
    server_id: { type: GraphQLNonNull(GraphQLString) },
    message_id: { type: GraphQLNonNull(GraphQLString) },
    author_id: { type: GraphQLNonNull(GraphQLString) },
    vote: { type: VoteEnumType },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});
