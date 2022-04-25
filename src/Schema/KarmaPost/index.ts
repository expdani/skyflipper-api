import { GraphQLNonNull, GraphQLString } from "graphql";
import { KarmaPosts } from "../../Entities/KarmaPosts";
import { KarmaPostType } from "../../TypeDefs/KarmaPost";
import VoteEnumType from "../../TypeDefs/Vote";

export const CREATE_KARMA_POST = {
  type: KarmaPostType,
  args: {
    user_id: { type: GraphQLNonNull(GraphQLString) },
    server_id: { type: GraphQLNonNull(GraphQLString) },
    message_id: { type: GraphQLNonNull(GraphQLString) },
    author_id: { type: GraphQLNonNull(GraphQLString) },
    vote: { type: GraphQLNonNull(VoteEnumType) },
  },
  async resolve(parent: any, args: any) {
    console.log(parent);
    const { user_id, server_id, message_id, author_id, vote } = args;

    const post = await KarmaPosts.findOne({
      user_id,
      server_id,
      message_id,
      author_id,
    });

    if (post)
      await KarmaPosts.update(
        { user_id, server_id, message_id, author_id },
        { vote }
      );
    else
      await KarmaPosts.insert({
        user_id,
        server_id,
        message_id,
        author_id,
        vote,
      });

    return args;
  },
};

export const DELETE_KARMA_POST = {
  type: KarmaPostType,
  args: {
    user_id: { type: GraphQLNonNull(GraphQLString) },
    server_id: { type: GraphQLNonNull(GraphQLString) },
    message_id: { type: GraphQLNonNull(GraphQLString) },
    author_id: { type: GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: any) {
    const { user_id, server_id, message_id, author_id } = args;
    await KarmaPosts.delete({
      user_id,
      server_id,
      message_id,
      author_id,
    });
    return args;
  },
};
