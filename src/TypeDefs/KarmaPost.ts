import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import VoteEnumType from "./Vote";

export const KarmaPostType = new GraphQLObjectType({
  name: "KarmaPost",
  fields: () => ({
    user_id: { type: GraphQLString },
    server_id: { type: GraphQLString },
    message_id: { type: GraphQLString },
    author_id: { type: GraphQLString },
    vote: { type: VoteEnumType },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});
