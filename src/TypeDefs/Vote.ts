import { GraphQLEnumType } from "graphql";

const VoteEnumType = new GraphQLEnumType({
  name: "VoteEnum",
  values: {
    UPVOTE: {
      value: "upvote",
    },
    DOWNVOTE: {
      value: "downvote",
    },
  },
});

export default VoteEnumType;
