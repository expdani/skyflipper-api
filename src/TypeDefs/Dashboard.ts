import { GraphQLObjectType, GraphQLInt } from "graphql";

export const DashboardType = new GraphQLObjectType({
  name: "Dashboard",
  fields: () => ({
    highlights: { type: HighlightsType },
    statistics: { type: StatisticsType },
  }),
});

export const HighlightsType = new GraphQLObjectType({
  name: "Highlights",
  fields: () => ({
    sessions: {
      type: new GraphQLObjectType({
        name: "HighlightSessions",
        fields: () => ({
          total: { type: GraphQLInt },
          week: { type: GraphQLInt },
        }),
      }),
    },
    total_votes: {
      type: new GraphQLObjectType({
        name: "HighlightTotalVotes",
        fields: () => ({
          total: { type: GraphQLInt },
          week: { type: GraphQLInt },
        }),
      }),
    },
    total_messages: {
      type: new GraphQLObjectType({
        name: "HighlightTotalMessages",
        fields: () => ({
          total: { type: GraphQLInt },
          week: { type: GraphQLInt },
        }),
      }),
    },
  }),
});

export const StatisticsType = new GraphQLObjectType({
  name: "Statistics",
  fields: () => ({
    total_votes: {
      type: new GraphQLObjectType({
        name: "StatisticsTotalVotes",
        fields: () => ({
          upvotes: { type: GraphQLInt },
          downvotes: { type: GraphQLInt },
        }),
      }),
    },
  }),
});
